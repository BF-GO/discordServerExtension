// popup.js

document.addEventListener('DOMContentLoaded', () => {
	const resetButton = document.getElementById('reset-button');
	const serverList = document.getElementById('server-list');

	function loadServers() {
		chrome.storage.local.get(null, (result) => {
			if (chrome.runtime.lastError) {
				console.error(
					'Ошибка при получении данных из хранилища:',
					chrome.runtime.lastError
				);
				return;
			}

			serverList.innerHTML = '';

			for (const serverId in result) {
				if (result.hasOwnProperty(serverId)) {
					const serverData = result[serverId];
					const { count, name, link } = serverData;

					const listItem = document.createElement('li');
					listItem.className = 'server-item';

					const nameSpan = document.createElement('span');
					nameSpan.className = 'server-name';
					nameSpan.textContent = name || 'Неизвестный сервер';

					const countSpan = document.createElement('span');
					countSpan.textContent = `Нажатий: ${count}`;

					const linkElement = document.createElement('a');
					linkElement.className = 'server-link';
					linkElement.textContent = 'Перейти';
					linkElement.href = `https://server-discord.com/${serverId}`;
					linkElement.target = '_blank';

					listItem.appendChild(nameSpan);
					listItem.appendChild(countSpan);
					listItem.appendChild(linkElement);

					serverList.appendChild(listItem);
				}
			}

			if (serverList.innerHTML === '') {
				serverList.innerHTML = '<li>Нет отслеживаемых серверов.</li>';
			}
		});
	}

	function resetCounters() {
		if (confirm('Вы уверены, что хотите сбросить все счетчики?')) {
			chrome.storage.local.clear(() => {
				if (chrome.runtime.lastError) {
					console.error(
						'Ошибка при очистке хранилища:',
						chrome.runtime.lastError
					);
					return;
				}
				loadServers();
			});
		}
	}

	resetButton.addEventListener('click', resetCounters);

	loadServers();
});
