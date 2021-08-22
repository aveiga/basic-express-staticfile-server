import { WebSocketServer } from "ws";

export function setupWSServer(server, onConnection, onMessage, onClose, onError) {
  const wss = new WebSocketServer({
    server: server,
    path: "/wss"
  });

  wss.on('connection', (ws) => {
    if(onConnection) {
      onConnection(ws);
    }

    ws.on('message', (message) => {
      if(onMessage) {
        onMessage(ws, message);
      }
    });

    ws.on('close', (e) => {
      if(onClose) {
        onClose(ws, e);
      }
    });

    ws.on('error', (e) => {
      if(onError) {
        onError(ws, e);
      }
    })
  });

  return wss;
}
