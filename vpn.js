var net = require("net");
var crypto = require("crypto");

const sharedSecret = crypto.randomBytes(32);
const initializationVector = crypto.randomBytes(16);

net
  .createServer(function (stream) {
    stream
      .pipe(
        crypto.createDecipheriv(
          "aes-256-cbc",
          sharedSecret,
          initializationVector
        )
      )
      .pipe(net.connect(5000, "localhost"))
      .pipe(
        crypto.createCipheriv("aes-256-cbc", sharedSecret, initializationVector)
      )
      .pipe(stream);
  })
  .listen(5005);
