const config = require('../config.json')
const storage = require('../util/storage.js')
const dbOps = require('../util/dbOps.js')
const MenuUtils = require('../structs/MenuUtils.js')
const FeedSelector = require('../structs/FeedSelector.js')
const log = require('../util/logger.js')

function feedSelectorFn (m, data, callback) {
  const { guildRss, rssName } = data
  const source = guildRss.sources[rssName]
  let currentCookies = ''
  const cookieObj = (source.advanced && source.advanced.cookies && Object.keys(source.advanced.cookies).length > 0) ? source.advanced.cookies : undefined
  if (cookieObj) {
    for (var cookieKey in cookieObj) {
      currentCookies += `\n${cookieKey} = ${cookieObj[cookieKey]}`
    }
  }
  const msg = (currentCookies) ? `The current cookie(s) set for <${source.link}> is shown below.\`\`\`\n${currentCookies}\n\`\`\`` : `The current cookie(s) set for <${source.link}> is shown below.\`\`\`No cookies set.\`\`\``

  callback(null, { guildRss: guildRss,
    rssName: rssName,
    next: {
      text: msg + `\nType your new cookie(s) now with each one separated by a new line. Each cookie must have \`=\` between the key and its value. For example, \`cookieKey=myValue\`. Your current cookie(s) will be overwritten. To remove all cookies, type \`reset\`. To cancel, type \`exit\`.`,
      embed: null }
  })
}

function setNewCookies (m, data, callback) {
  const input = m.content

  if (input.toLowerCase() === 'reset') return callback(null, { ...data, setting: 'reset' })

  const cookieArray = input.split('\n')
  if (cookieArray.length === 0) return callback(new SyntaxError(`No valid cookies found. Please try again.`))

  callback(null, { ...data, setting: cookieArray })
}

module.exports = (bot, message, command) => {
  if (config.advanced && config.advanced._restrictCookies === true && storage.vipServers[message.guild.id] && storage.vipServers[message.guild.id].allowCookies) return message.channel.send('Only patrons have access to cookie control.').then(m => m.delete(3500)).catch(err => log.command.warning(`Unable to send restricted access to rsscookies command:`, message.guild, err))
  const feedSelector = new FeedSelector(message, feedSelectorFn, { command: command })
  const cookiePrompt = new MenuUtils.Menu(message, setNewCookies)

  new MenuUtils.MenuSeries(message, [feedSelector, cookiePrompt]).start(async (err, data) => {
    try {
      if (err) return err.code === 50013 ? null : await message.channel.send(err.message)
      const { guildRss, rssName, setting } = data
      const source = guildRss.sources[rssName]

      if (setting === 'reset') {
        delete source.advanced.cookies
        dbOps.guildRss.update(guildRss)
        log.command.info(`Cookies have been reset for ${source.link}`, message.guild)
        return await message.channel.send(`Successfully removed all cookies for feed ${source.link}`)
      }
      if (!source.advanced) source.advanced = {cookies: {}}
      else source.advanced.cookies = {}

      let newCookies = ''
      setting.forEach(item => { // Array
        const pair = item.split('=')
        if (pair.length === 2) source.advanced.cookies[pair[0].trim()] = pair[1].trim()
        newCookies += `\n${pair[0].trim()} = ${pair[1].trim()}`
      })

      dbOps.guildRss.update(guildRss)

      log.command.info(`Cookies for ${source.link} have been set to ${newCookies.split('\n').join(',')}`, message.guild)
      await message.channel.send(`Your new cookie(s) for <${source.link}> is now\n\`\`\`\n${newCookies}\`\`\``)
    } catch (err) {
      log.command.warning(`rsscookies:`, message.guild, err)
    }
  })
}
