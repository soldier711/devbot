module.exports = function (bot, message) {
  if (message.content === '-mycustomcommand') message.channel.send('I saw your custom command!')
  if (message.content === '-messageembed') message.channel.send({embed : {
  "title": "title ~~(did you know you can have markdown here too?)~~",
  "description": "this supports [named links](https://discordapp.com) on top of the previously shown subset of markdown. ```\nyes, even code blocks```",
  "url": "https://discordapp.com",
  "color": 7159546,
  "timestamp": "2018-09-16T09:40:37.473Z",
  "footer": {
    "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
    "text": "footer text"
  },
  "thumbnail": {
    "url": "https://cdn.discordapp.com/embed/avatars/0.png"
  },
  "image": {
    "url": "https://cdn.discordapp.com/embed/avatars/0.png"
  },
  "author": {
    "name": "author name",
    "url": "https://discordapp.com",
    "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
  },
  "fields": [
    {
      "name": "🤔",
      "value": "some of these properties have certain limits..."
    },
    {
      "name": "😱",
      "value": "try exceeding some of them!"
    },
    {
      "name": "🙄",
      "value": "an informative error should show up, and this view will remain as-is until all issues are fixed"
    },
    {
      "name": "<:thonkang:219069250692841473>",
      "value": "these last two",
      "inline": true
    },
    {
      "name": "<:thonkang:219069250692841473>",
      "value": "are inline fields",
      "inline": true
    }
  ]
  }});
channel.send("this `supports` __a__ **subset** *of* ~~markdown~~ 😃 ```js\nfunction foo(bar) {\n  console.log(bar);\n}\n\nfoo(1);```", { embed });
};
