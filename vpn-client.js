var net = require('net')
var crypto = require('crypto')
var pw = 'password123'

var stream = net.connect(5005, 'localhost')
process.stdin
      .pipe(crypto.createCipher('aes192',  pw))
      .pipe(stream)
      .pipe(crypto.createDecipher('aes192', pw))
      .pipe(process.stdout)
