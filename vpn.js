var net = require("net");
var crypto = require("crypto");
const { PassThrough } = require("stream");

const tunnel = new PassThrough();

tunnel.on("data", (chunk) => {
  console.log("bytes:", chunk);
});

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
      .pipe(tunnel)
      .pipe(
        crypto.createCipheriv("aes-256-cbc", sharedSecret, initializationVector)
      )
      .pipe(stream);
  })
  .listen(5005, () => console.log("vpn server listening on port 5005"));
