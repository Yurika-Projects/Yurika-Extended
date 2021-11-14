const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Extended/CreateEmbed');

module.exports = class PauseCommand extends Command {
  constructor() {
    super('pause', {
      aliases: ['pause'],
      description: {
        content: 'Pause current track',
      },
      category: 'Music',
      cooldown: 3000,
    });
  }

  async exec(msg) {
    try {
      const GuildPlayers = this.client.erela.players.get(msg.guild.id);
      if (!GuildPlayers) return msg.channel.send(CreateEmbed('info', 'There no music playing in this guild'));
      if (!msg.member.voice.channelID) return msg.channel.send(CreateEmbed('warn', 'you must join voice channel to do this.'));
      if (msg.member.voice.channelID !== GuildPlayers.voiceChannel) return msg.channel.send(CreateEmbed('warn', 'you must join voice channel same as me to do this.'));
      GuildPlayers.pause(true);
      return msg.channel.send(CreateEmbed('info', 'Paused guild queue'));
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send(CreateEmbed('warn', 'An error occured'));
    }
  }
};
