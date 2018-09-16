module.exports = function (bot, message) {
  if (message.content === '-mycustomcommand') message.channel.send('I saw your custom command!')
}
  if (message.content === '-messageembed') message.channel.send('I want to send a embed message!')
}
