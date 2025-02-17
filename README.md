# Play Live Code

**Play Live Code** is a Visual Studio Code extension designed to help you kickstart live coding sessions effortlessly. With built-in commands to start sessions, send messages, and manage session settings, this extension aims to streamline your interactive coding experience.

## Features

- **Live Session Management:**  
  Easily start and stop live coding sessions via simple commands.

- **Messaging:**  
  Send test messages during a live session to verify connectivity and functionality.

- **Auto Start Toggle:**  
  Enable or disable auto-start for your live sessions as needed.

- **Quick Testing:**  
  Use the "Hello World" command to quickly check that the extension is working properly.

## Installation

### From the VS Code Marketplace

1. Open Visual Studio Code.
2. Navigate to the **Extensions** view by pressing <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd>.
3. Search for **Play Live Code**.
4. Click **Install**.

### From a VSIX File

1. Download the latest `playlivecode-0.0.1.vsix` from the repository.
2. In VS Code, press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> to open the Command Palette.
3. Type `Extensions: Install from VSIX...` and select the command.
4. Browse to and select the downloaded VSIX file.

## Usage

After installation, access the extension's features using the Command Palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on Windows/Linux or <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on macOS). The following commands are available:

- **Hello World:**  
  Executes a simple test command to confirm the extension is active.
  - Command: `playlivecode.helloWorld`

- **Start Session:**  
  Initiates a live coding session.
  - Command: `playlivecode.startsession`

- **Send Message:**  
  Sends a test message within an active session.
  - Command: `playlivecode.sendTestMessage`

- **Stop Session:**  
  Terminates the active live coding session.
  - Command: `playlivecode.stopWebSocketServer`

- **Toggle Auto Start:**  
  Switches the auto-start functionality on or off.
  - Command: `playlivecode.toggleAutoStart`

## Commands Overview

| Command Identifier                   | Command Title    | Description                                   |
| ------------------------------------ | ---------------- | --------------------------------------------- |
| `playlivecode.helloWorld`            | Hello World      | Test the extension with a simple greeting.    |
| `playlivecode.startsession`          | Start Session    | Begin a new live coding session.              |
| `playlivecode.sendTestMessage`       | Send Message     | Send a test message during a live session.    |
| `playlivecode.stopWebSocketServer`   | Stop Session     | End the current live coding session.          |
| `playlivecode.toggleAutoStart`       | Toggle Auto Start| Enable or disable automatic session start.    |

## Requirements

- Visual Studio Code version **1.97.0** or later.
- Node.js environment for development and testing (if you plan to contribute).

## Development

To set up the development environment:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/pkalyankumar1010/playlivecode-vscode-ext.git
   cd playlivecode-vscode-ext
   ```
2. **Install Dependencies:**

   ```bash
   npm install
   ```
3. **Compile the Extension:**

   ```bash
   npm run compile  
   ```
4. **Run and Debug:**
   
- Press <kbd>F5</kbd> to launch a new VS Code window with the extension loaded.
- Use the Command Palette to test the commands.
- Set breakpoints in src/extension.ts for debugging.
  
## **Enjoy live coding with Play Live Code and happy coding!**
