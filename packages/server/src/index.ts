import express from 'express'
import { createServer } from 'http'
import { DEFAULT_PORT, DEFAULT_HOST } from './constant'
import { createWebSocketServer } from './createWSS'
import path from 'path'
import cors from 'cors'
const app = express()
app.use(cors())
app.use('/hmr-client.js', express.static(path.resolve(__dirname, '../../client/lib/index.js')))
app.get('/deploy', (req, res) => {
    sendMsg('reload')
    // 在此处调用你的发版脚本
    res.json({ data: 'success' })
})
const server = createServer(app)
const wsUtil = createWebSocketServer(server)
const sendMsg = (type: string, data?:any ) => {
    wsUtil.broadcast({ type, data })
}


server.listen(DEFAULT_PORT, () => {
    console.log(`App listening at http://${DEFAULT_HOST}:${DEFAULT_PORT}`)
})

