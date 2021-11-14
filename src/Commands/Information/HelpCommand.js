/* eslint no-restricted-syntax: "off" */
const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Extended/CreateEmbed');

module.exports = class PingCommand extends Command {
  constructor() {
    super('help', {
      aliases: ['help'],
      description: {
        content: 'Gets the bot\'s help command',
      },
      category: 'Information',
      cooldown: 3000,
      args: [
        {
          id: 'command',
          type: 'commandAlias',
        },
      ],
    });
  }

  async exec(msg, { command }) {
    try {
      if (!command) {
        const embed = CreateEmbed('info')
          .setTitle(`Help Pannel`)
          .setDescription(`
          \`${this.client.config.prefix}help + [command]\`
\`\`\`js
❯ Information

help | ping | stats

❯ Music

loop | nowplaying | pause | play | resume | skip | stop | Volume | lyrics | join | leave
\`\`\`
          `)
        return msg.channel.send(embed);
      }
      const embed = CreateEmbed('info')
        .addField('Description', `${command.description.content ? command.description.content : ''} ${command.description.ownerOnly ? '\n**[Owner Only]**' : ''}`)
        .addField('Alias', command.aliases.length > 1 ? `\`${command.aliases.join('` `')}\`` : 'None.', true)
        .addField('Examples', command.description.examples && command.description.examples.length ? `\`${command.aliases[0]} ${command.description.examples.join(`\`\n\`${command.aliases[0]} `)}\`` : 'None.');
      return msg.channel.send(embed);
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send(CreateEmbed('warn', '⛔ | Mohon maaf terjadi kesalahan'));
    }
  }
};
