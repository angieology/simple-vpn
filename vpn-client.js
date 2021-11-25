var net = require("net");
var crypto = require("crypto");
const sharedSecret = crypto.randomBytes(32);
const initializationVector = crypto.randomBytes(16);

var stream = net.connect(5005, "localhost");

process.stdin
  .pipe(
    crypto.createCipheriv("aes-256-cbc", sharedSecret, initializationVector)
  )
  .pipe(stream)
  .pipe(
    crypto.createDecipheriv("aes-256-cbc", sharedSecret, initializationVector)
  )
  .pipe(process.stdout);

