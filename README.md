[Читать на русском](README.ru.md)

# Discord Server Tracker

Discord Server Tracker is a browser extension designed to monitor and track user interactions with Discord server join buttons. This extension provides an efficient way to log clicks, maintain a history of visited servers, and display the information in a user-friendly popup interface.

---

## Features

- **Server Tracking**: Tracks the number of clicks on a server's join button.
- **Server History**: Maintains a record of visited servers, including their names, join links, and timestamps of the last visit.
- **Popup Interface**: Offers a clean, paginated interface for viewing tracked servers, with options to search, navigate, and reset the data.
- **Periodic Updates**: Automatically updates data as new servers are added or interacted with.
- **Persistent Storage**: Saves all data locally using the browser's storage API.

> **Note**: This extension is designed to work exclusively on the website [https://server-discord.com](https://server-discord.com).

---

## Known Issues

### "Extension context invalidated" Error

This error might appear under certain conditions when the extension's background service worker becomes inactive or unexpectedly terminates. Despite this issue, the extension remains functional, and its core tracking and data retrieval capabilities are not affected. Debugging efforts are ongoing to fully resolve this problem.

---

## Installation

### Installing the Extension Locally

1. **Clone or Download the Repository**  
   Clone this repository to your local machine, or download it as a ZIP file and extract it.

2. **Navigate to the Extensions Page**  
   Open Chrome or any Chromium-based browser and go to the extensions management page:

   ```
   chrome://extensions/
   ```

3. **Enable Developer Mode**  
   Toggle the "Developer mode" switch located in the top-right corner of the page.

4. **Load the Extension**  
   Click the "Load unpacked" button and select the folder containing the extension's files.

5. **Verify Installation**  
   The extension should now appear in your browser's extensions bar. Click on it to open the popup interface.

---

## Usage

1. Visit [https://server-discord.com](https://server-discord.com).
2. Interact with Discord server join buttons on the website.
3. Open the extension's popup interface to view tracked server data, including the number of clicks and history of visited servers.

---

## Contributing

Contributions are welcome! If you'd like to report issues, suggest features, or contribute code, please submit an issue or pull request in the repository.

You can also contact me directly on Discord: **@BF_GO**.
