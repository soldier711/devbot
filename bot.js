const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === 'ping') {
    	message.reply('pong');
  	}
});

client.login(process.env.NDkwNDg3MjQ5NDc4MzUyODk3.Dn6Blw.W2JIEBMOKyOTEyyI9R-bW7B7m0M);
