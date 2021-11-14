const { stripIndent } = require('common-tags');
const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Extended/CreateEmbed');

module.exports = class NowPlayCommand extends Command {
  constructor() {
    super('nowplaying', {
      aliases: ['nowplaying', 'np'],
      description: {
        content: 'Get the current playing',
      },
      category: 'Music',
      cooldown: 3000,
    });
  }

  async exec(msg) {
    try {
      const GuildPlayers = this.client.erela.players.get(msg.guild.id);
      if (!GuildPlayers) return msg.channel.send(CreateEmbed('info', 'There no music playing in this guild.'));
      return msg.channel.send(CreateEmbed('info', stripIndent`
      Playing :notes:  
      \`
      ${GuildPlayers.queue.current.title}\`
      \`

      Next Track:
      \`\`\`js
      ${GuildPlayers.queue.values().next().value ? `${GuildPlayers.queue.values().next().value.title} | [${GuildPlayers.queue.values().next().value.requester.username}]` : 'None.'}
      \`\`\`
      `));
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send(CreateEmbed('warn', 'An error occured.'));
    }
  }
};
