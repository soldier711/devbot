module.exports = function (bot, message) {
  if (message.content === '-mycustomcommand') message.channel.send('I saw your custom command!')
  if (message.content === '-messageembed') message.channel.send({embed : {
  "title": "Welcome to *server name*!",
  "description": "As you may see you only see few channels and can only write in one, this channel. This is because we have implemented a verification system to prevent userbots spamming the server. It's easy to verify, all you have to do is type `?getcode`, Dyno bot will DM you a secret code. Use the code to instantly get full access to to the server. ```TLDR, ?getcode```",
  "color": 4886754,
  "footer": {
    "icon_url": "https://images.discordapp.net/avatars/411538973664608257/76b469f42b63792cfb05ca6c05ab612f.png?size=512",
    "text": "I like cookies"
  }}});
};
