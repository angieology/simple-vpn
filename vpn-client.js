var net = require("net");
var crypto = require("crypto");
const sharedSecret = crypto.randomBytes(32);
const initializationVector = crypto.randomBytes(16);

var stream = net.connect(5000, "localhost");

process.stdin
  .pipe(
    crypto.createCipheriv("aes-256-cbc", sharedSecret, initializationVector)
  )
  .pipe(stream)
  .pipe(
    crypto.createDecipheriv("aes-256-cbc", sharedSecret, initializationVector)
  )
  .pipe(process.stdout);

// //https://blog.logrocket.com/node-js-crypto-module-a-tutorial/

// //https://stackoverflow.com/questions/39637388/encryption-decryption-doesnt-work-well-between-two-different-openssl-versions/39641378#39641378

// //https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93/

//https://blog.insiderattack.net/nodejs-streams-in-practice-980b3cdf4511
