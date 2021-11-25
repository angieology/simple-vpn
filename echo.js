var net = require("net");

net
  .createServer(function (stream) { // 'hello world'
    stream.pipe(stream);
  })
  .listen(5000);
