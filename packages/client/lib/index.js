(() => {
  // src/index.ts
  if ("WebSocket" in window) {
    const websocket = new WebSocket("ws://127.0.0.1:88", "taki-hmr");
    let aliveTimer = null;
    const keepAlive = () => {
      aliveTimer = setInterval(() => websocket.send("ping"), 3e4);
    };
    const fastConnect = async () => {
      while (true) {
        try {
          await fetch("http://127.0.0.1:88/hmr-client.js");
          break;
        } catch (err) {
          await new Promise((resolve) => setTimeout(resolve, 1e3));
        }
      }
    };
    websocket.addEventListener("message", async ({ data }) => {
      data = JSON.parse(data);
      if (data.type === "connected") {
        console.log("\u4E0E\u670D\u52A1\u5668\u8FDE\u63A5\u6210\u529F");
        keepAlive();
      }
      if (data.type === "reload") {
        document.write("\u6709\u65B0\u7248\u672C\u5566<br>");
      }
    });
    websocket.addEventListener("close", async () => {
      aliveTimer && clearImmediate(aliveTimer);
      await fastConnect();
      window.location.reload();
    });
  }
})();
