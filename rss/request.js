const needle = require('needle')
const cloudscraper = require('cloudscraper') // For cloudflare

module.exports = (link, cookies, feedparser, callback) => {
  const options = {
    timeout: 20000,
    read_timeout: 17000,
    follow_max: 5,
    follow_set_cookies: true,
    rejectUnauthorized: true,
    // GoogleBot to access explicit Tumblr feeds
    headers: {'user-agent': `Mozilla/5.0 ${link.includes('.tumblr.com') ? 'GoogleBot' : ''} (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36`},
    decode: false
  }

  if (cookies) options.cookies = cookies

  ;(function connectToLink () {
    const request = needle.get(link, options)

    request.on('header', (statusCode, headers) => {
      if (statusCode === 200) {
        callback(null)
        if (feedparser) request.pipe(feedparser)
      } else if (headers.server && headers.server.includes('cloudflare')) {
        cloudscraper.get(link, (err, res, body) => { // For cloudflare
          if (err || res.statusCode !== 200) return callback(err || new Error(`Bad status code (${res.statusCode})` + `${cookies ? ' (cookies detected)' : ''}`))
          callback(null)
          if (!feedparser) return
          let Readable = require('stream').Readable
          let feedStream = new Readable()
          feedStream.push(body)
          feedStream.push(null)
          feedStream.pipe(feedparser)
        })
      } else request.emit('err', new Error(`Bad status code (${statusCode})`))
    })

    request.on('err', err => callback(new Error(err.message || err + `${cookies ? ' (cookies detected)' : ''}`)))
  })()
}
