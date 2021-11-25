var net = require("net");

net
  .createServer(function (stream) { //'hello'
    stream.pipe(stream);
  })
  .listen(5000);
