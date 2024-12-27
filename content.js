// content.js

(function () {
	console.log('Discord Server Tracker: Content script loaded.');

	function getServerId(block) {
		const link = block.querySelector('a[href^="/"]');
		if (link) {
			const href = link.getAttribute('href');
			const id = href.substring(1);
			console.log(`Found server ID: ${id}`);
			return id;
		}
		console.log('No server ID found.');
		return null;
	}

	function getServerName(block) {
		const nameElement = block.querySelector(
			'.server__header__label-info__name'
		);
		if (nameElement) {
			const name = nameElement.textContent.trim();
			console.log(`Found server name: ${name}`);
			return name;
		}
		console.log('No server name found.');
		return 'Неизвестный сервер';
	}

	function updateButton(button, count) {
		if (count > 0) {
			button.classList.add('tracked-join-button');
			let countSpan = button.querySelector('.click-count');
			if (!countSpan) {
				countSpan = document.createElement('span');
				countSpan.className = 'click-count';
				button.appendChild(countSpan);
				console.log('Added count span to button.');
			}
			countSpan.textContent = ` (${count})`;
			console.log(`Button updated with count: ${count}`);
		} else {
			button.classList.remove('tracked-join-button');
			const countSpan = button.querySelector('.click-count');
			if (countSpan) {
				button.removeChild(countSpan);
				console.log('Removed count span from button.');
			}
		}
	}

	function refreshButtons() {
		console.log('Discord Server Tracker: Refreshing buttons...');
		const serverBlocks = document.querySelectorAll('.guildApp__guild');
		console.log(`Refreshing ${serverBlocks.length} server blocks.`);

		serverBlocks.forEach((block) => {
			const joinButton = block.querySelector(
				'.server__header__label-join__button'
			);
			if (joinButton) {
				const serverId = getServerId(block);
				if (!serverId) return;

				chrome.storage.local.get([serverId], (result) => {
					if (chrome.runtime.lastError) {
						console.error(
							`Error retrieving data for server ID ${serverId}:`,
							chrome.runtime.lastError
						);
						return;
					}
					const serverData = result[serverId];
					if (serverData) {
						const { count, name, link } = serverData;
						console.log(
							`Server ID: ${serverId}, Count: ${count}, Name: ${name}, Link: ${link}`
						);
						updateButton(joinButton, count);
					}
				});
			}
		});
	}

	function setupEventDelegation() {
		document.body.addEventListener('click', function (event) {
			const target = event.target;
			const joinButton = target.closest('.server__header__label-join__button');

			if (joinButton) {
				const serverBlock = joinButton.closest('.guildApp__guild');
				if (!serverBlock) {
					console.log('Server block not found for the clicked join button.');
					return;
				}

				const serverId = getServerId(serverBlock);
				if (!serverId) return;

				const serverName = getServerName(serverBlock);
				const serverLink = `https://server-discord.com/${serverId}`;

				chrome.storage.local.get([serverId], (result) => {
					if (chrome.runtime.lastError) {
						console.error(
							`Error retrieving data for server ID ${serverId}:`,
							chrome.runtime.lastError
						);
						return;
					}
					let serverData = result[serverId] || {
						count: 0,
						name: serverName,
						link: serverLink,
					};
					serverData.count += 1;
					console.log(
						`Incrementing count for server ID ${serverId} to ${serverData.count}`
					);

					let data = {};
					data[serverId] = serverData;
					chrome.storage.local.set(data, () => {
						if (chrome.runtime.lastError) {
							console.error(
								`Error setting data for server ID ${serverId}:`,
								chrome.runtime.lastError
							);
							return;
						}
						console.log(
							`Count for server ID ${serverId} set to ${serverData.count}`
						);
						updateButton(joinButton, serverData.count);
					});
				});
			}
		});
		console.log('Discord Server Tracker: Event delegation set up.');
	}

	function observeDOM() {
		const observer = new MutationObserver((mutations) => {
			let needsRefresh = false;
			mutations.forEach((mutation) => {
				if (mutation.type === 'childList') {
					mutation.addedNodes.forEach((node) => {
						if (node.nodeType === 1) {
							if (node.matches('.guildApp__guild')) {
								console.log('New server block added.');
								needsRefresh = true;
							} else {
								const nestedBlocks = node.querySelectorAll('.guildApp__guild');
								if (nestedBlocks.length > 0) {
									console.log('New nested server block(s) added.');
									needsRefresh = true;
								}
							}
						}
					});
				}
			});

			if (needsRefresh) {
				refreshButtons();
			}
		});

		observer.observe(document.body, { childList: true, subtree: true });
		console.log('Discord Server Tracker: MutationObserver initialized.');
	}

	function periodicRefresh() {
		setInterval(() => {
			console.log('Discord Server Tracker: Periodic refresh of buttons.');
			refreshButtons();
		}, 5000);
	}

	function logAllStorageData() {
		chrome.storage.local.get(null, (result) => {
			if (chrome.runtime.lastError) {
				console.error(
					'Error getting all storage data:',
					chrome.runtime.lastError
				);
				return;
			}
			console.log('All stored data:', result);
		});
	}

	function run() {
		setupEventDelegation();
		refreshButtons();
		observeDOM();
		periodicRefresh();
		logAllStorageData();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', run);
	} else {
		run();
	}
})();
