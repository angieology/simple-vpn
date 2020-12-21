var net = require('net')
net.createServer(function (stream) {
  // input and output streams are functioning completely separately and
  // doesn't create infinte loop.
  stream.pipe(stream)
}).listen(5000)
