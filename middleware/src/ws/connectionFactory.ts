import WebSocket from "ws";

export function setupWSServer(onOpen?: Function) {
  const ws = new WebSocket("/api/common/websocket");

  if (onOpen) {
    ws.on("open", onOpen);
  }

  return ws;
}
