module.exports = function (bot, message) {
  if (message.content === '-mycustomcommand') message.channel.send('I saw your custom command!')
  if (message.content === '-messageembed') 
	const embed = new Discord.RichEmbed()
	.setColor(0x954D23)
	.setTitle("Command List:")
	.addField("!help", "Will give the current command list")
	.addField("!ping", "WIll show the ping time for the bot")
	.addField("!say [text]", "Will make the bot say something")
	.addField("!announcement [text]", "Will make the bot say an announcement and tag everyone")
	.addField("!cat", "Will send a random cat image");
	message.channel.send({embed})
}
