const channelTracker = require('../util/channelTracker.js')
const currentGuilds = require('../util/storage.js').currentGuilds
const log = require('../util/logger.js')
const dbOps = require('../util/dbOps.js')

module.exports = channel => {
  const guildRss = currentGuilds.get(channel.guild.id)
  if (!guildRss) return
  const rssList = guildRss.sources

  for (var channelId in channelTracker.activeCollectors) if (channelId === channel.id) delete channelTracker.activeCollectors[channelId]

  let removed = false
  for (var rssName in rssList) {
    if (rssList[rssName].channel !== channel.id) continue
    removed = true
    dbOps.guildRss.removeFeed(guildRss, rssName, (err, link) => {
      if (err) return log.guild.warning(`Unable to remove feed ${link} triggered by channel deletion`, channel.guild, err)
      log.guild.info(`Removed feed ${link}`, channel.guild)
    })
  }

  if (removed) log.guild.info(`Channel deleted`, channel.guild, channel)
}
