const { stripIndent } = require('common-tags');
const { Command } = require('discord-akairo');
const ms = require('ms');
const { CreateEmbed } = require('../../Extended/CreateEmbed');
const { version } = require('../../../package.json');
const { MessageEmbed, version: djsversion } = require('discord.js')
const { utc } = require('moment')
const os = require('os')
module.exports = class StatsCommand extends Command {
  constructor() {
    super('stats', {
      aliases: ['stats'],
      description: {
        content: 'Gets the bot\'s statistic',
      },
      category: 'Information',
      cooldown: 3000,
    });
  }

  async exec(msg) {
    const core = os.cpus()[0];
    try {
      msg.channel.send(CreateEmbed('info', stripIndent`
System Statistics:
\`\`\`js
Name: Yurika Extended
CPU: AMD A6-9225
Ram: 4 GB
Operating System: Windows 11 (AMD Plartform)
Node.js: ${process.version}
Version: ${version}
Uptime: ${ms(this.client.uptime, { long: true })}
Discord.js: v${djsversion}
\`\`\`
`));
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed('warn', 'An error occured'));
    }
  }
};
