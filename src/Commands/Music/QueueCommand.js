const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Extended/CreateEmbed');
const Pagination = require('../../Extended/Pagination');
const { chunk } = require('../../Extended/Chunk');

module.exports = class QueueCommand extends Command {
  constructor() {
    super('queue', {
      aliases: ['queue', 'q'],
      description: {
        content: 'get current guild queue',
      },
      category: 'Music',
      cooldown: 3000,
    });
  }

  async exec(msg) {
    try {
      const SayaPlayers = this.client.erela.players.get(msg.guild.id);
      if (!SayaPlayers) return msg.channel.send({ embeds: [CreateEmbed('info', '⛔ | There no music playing in this guild')] });
      if (SayaPlayers.queue.size < 1) {
        return msg.reply({
          embeds: [CreateEmbed('info', `
            NowPlaying:
            \`\`\`js
            ${SayaPlayers?.queue.current?.title} | [${SayaPlayers?.queue.current?.requester.username}]
            \`\`\`
            Next Track:
            \`\`\`js
            ${SayaPlayers?.queue.values().next().value ? `${SayaPlayers.queue.values().next().value.title} | [${SayaPlayers.queue.values().next().value.requester.username}]` : 'None.'}
            \`\`\`
            `)],
        });
      }
      const pages = chunk(SayaPlayers?.queue.map((x, i) => `\`${i + 1}\` ${x.title} [${x.requester}]`), 7);
      const embed = CreateEmbed('info').setAuthor(`${msg.guild?.name} queue list`, msg.guild.iconURL());
      await new Pagination(msg, {
        pages,
        embed,
        edit: (index, emb, page) => emb.setDescription(Array.isArray(page) ? page.join('\n') : page)
          .setFooter(`Page ${index + 1} of ${pages.length}`),
      }).start();
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | An error occured')] });
    }
  }
};
