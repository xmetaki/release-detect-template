import { Server as HttpServer } from 'http'
import { WebSocketServer } from 'ws'

export function createWebSocketServer (server: HttpServer ) {
    const wss = new WebSocketServer({
        noServer: true
    })

    server.on('upgrade', (req, socket, head) => {
        if (req.headers['sec-websocket-protocol'] === 'taki-hmr') {
            wss.handleUpgrade(req, socket, head, (ws) => {
                wss.emit("connection", ws, req)
            })
        }
    })

    wss.on("connection", (socket) => {
        socket.send(JSON.stringify({
            type: 'connected'
        }))
    })

    wss.on("error", (error: Error & { code: string }) => {
        if (error.code !== 'EADDRINUSE') {
            console.error(`[Error] there was an error happends in server side, ${error.stack || error.message} `)
        }
    })

    return {
        server,
        broadcast(msg) {
            wss.clients.forEach(client => {
               if (client.readyState === 1) {
                client.send(JSON.stringify(msg))
               }
            })
        },
        wss,
        close() {
            wss.close()
        }
    }
}