// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import WebSocket from 'ws';
import { WebSocketServer } from "ws";
import { decodeResponse } from './webSocket/webSocketServer';
let wss: WebSocket.Server | null = null;
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "playlivecode" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('playlivecode.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from playlivecode!');
	});

	context.subscriptions.push(disposable);
	const startSession = () => {
		vscode.window.showInformationMessage('Starting session from PlayLiveCodeLocal!');
		// console.log("hello")
		startWebSocketServer(9182, context);
	};

	// Controlla se l'avvio automatico è abilitato
	const config = vscode.workspace.getConfiguration('playlivecode');
	if (config.get('autoStartSession')) {
		startSession();
	}


	const startCommand = vscode.commands.registerCommand('playlivecode.startsession', startSession);
	context.subscriptions.push(startCommand);

	context.subscriptions.push({
		dispose: () => stopWebSocketServer(),
	});
	// Assicura che il server venga chiuso quando l'estensione viene disattivata


	const sendMessage = vscode.commands.registerCommand('playlivecode.sendTestMessage', () => {
		const message = { type: 'test', message: 'Hello from PlayLiveCode!' };
		if (wss) {
			wss.clients.forEach((client) => {
				if (client.readyState === WebSocket.OPEN) {
					client.send(JSON.stringify(message));
				}
			});
		}
	}
	);
	context.subscriptions.push(sendMessage);

	const stopWSServer = vscode.commands.registerCommand('playlivecode.stopWebSocketServer', () => {
		stopWebSocketServer();
		vscode.window.showInformationMessage('Session stopped.');
	});
	context.subscriptions.push(stopWSServer);


	// Registra un comando per abilitare/disabilitare l'avvio automatico
	const toggleAutoStart = vscode.commands.registerCommand('playlivecode.toggleAutoStart', async () => {
		const currentValue = config.get('autoStartSession', false);
		const newValue = !currentValue;
		await config.update('autoStartSession', newValue, vscode.ConfigurationTarget.Global);
		vscode.window.showInformationMessage(
			`Auto start session is now ${newValue ? 'enabled' : 'disabled'}.`
		);
	});
	context.subscriptions.push(toggleAutoStart);
}

// This method is called when your extension is deactivated
export function deactivate() {
	stopWebSocketServer();
}
// Funzione per avviare il server WebSocket
function startWebSocketServer(port: number, context: vscode.ExtensionContext) {
	if (wss) {
		console.log('WebSocket server is already running');
		return;
	}
    const workspaceFolders = vscode.workspace.workspaceFolders;
	// console.log(vscode.workspace);
    if (!workspaceFolders) {
        vscode.window.showErrorMessage(
            "PlayLiveCode: No workspace is opened."
        );
        return;
    }

	const currentDir = workspaceFolders[0].uri.fsPath;

	wss = new WebSocketServer( { port });

	wss.on('connection', (ws : any, req: any) => {
		console.log('Browser connected to WebSocket server!');

		const origin = req.headers.origin;

		console.log(`Origin: ${origin}`);
		
		if (origin !== "https://teachflow.app" && origin !== "http://localhost:3000" && origin !== "https://www.youtube.com") {
			console.log(`Connection rejected from origin: ${origin}`);
			ws.close(); // Chiude immediatamente la connessione
			return;
		}
	

		ws.on('message', async (message : any) => {
			console.log(`Received: ${message}`);
			var res = await decodeResponse(message, currentDir);
			console.log(`Sending: ${JSON.stringify(res)}`);
			ws.send(JSON.stringify(res));
		});

		ws.on('close', () => {
			console.log('Browser disconnected');
		});
	});

	console.log(`WebSocket server running on ws://localhost:${port}`);
}

// Funzione per fermare il server WebSocket
function stopWebSocketServer() {
	if (wss) {
		wss.clients.forEach((client) => {
			client.close();
		});
		wss.close((err) => {
			if (err) {
				console.error('Error closing WebSocket server:', err);
			} else {
				console.log('WebSocket server stopped');
			}
		});
		wss = null;
	}
}