## 前端发版探测服务
> 思路启发自webpack-dev-server，需求来自于用户

项目packages包含`client端` 和 `server端` 代码， `client`用于通过script标签引入到目标项目，如果你想改造成基于npm引入的，那就自己改造吧，反正我懒得改
`server端` 代码用于服务端启动，用于监听websocket连接，其中的 `/deploy` 可以改造成webhook, 结合公司的流水线, 比如jenkins，新建一个stage，用于hook。

在deploy中会主动通知客户端服务已更新，监测hash变化什么的感觉太呆了，不如监听发版的行为，你说呢？

## 步骤
1. download sourcecode
2. `pnpm install`
3. 我己经构建过了，你就不用构建了
4. `pnpm -F @xmetaki/userer run prod` 启动server端
5. 启动你一个用于测试的web前端服务
    - 启动之前需要在index.html中加入 `<script src="http://127.0.0.1:88/hmr-client.js" async></script>`
    - 假设你新这个前端服务的启动端口为 `8888`
6. 浏览器开 127.0.0.1:8888
7. 在另一个窗口输入127.0.0.1:88/deploy 看看 8888窗口有什么变化

## others
1. 代码里添加了服务端上线重连,重连后会自动刷新，这个需要注意一下，可以改成自己的应用场景
2. 代码并不复杂，但是bff端解耦的意义重大，业务无关的代码就不应该出现在业务系统，你说呢？
