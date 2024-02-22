if ('WebSocket' in window) {
    const websocket = new WebSocket("ws://127.0.0.1:88", "taki-hmr")
    let aliveTimer = null
    const keepAlive = () => {
        aliveTimer = setInterval(() => websocket.send('ping'), 30000)
    }
    const fastConnect = async () => {
        while(true) {
            try {
                await fetch('http://127.0.0.1:88/hmr-client.js')
                break
            } catch(err) {
                await new Promise(resolve => setTimeout(resolve, 1000))
            }
        }
    }
    websocket.addEventListener("message", async ({ data }) => {
        data = JSON.parse(data)
        if (data.type === 'connected') {
            console.log('与服务器连接成功')
            // 开始放上心跳保活
            keepAlive()
        }
        if (data.type === 'reload') {
            document.write('有新版本啦<br>')
        }
    })

    websocket.addEventListener('close', async () => {
        // 清空心跳保活
        aliveTimer && clearImmediate(aliveTimer)
        // 设置上线快连
        await fastConnect()
        // 刷新
        window.location.reload()
    })
}