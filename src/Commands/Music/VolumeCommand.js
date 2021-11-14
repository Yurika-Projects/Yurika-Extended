const { Command, Argument } = require('discord-akairo');
const { CreateEmbed } = require('../../Extended/CreateEmbed');
const { CreatePrompt } = require('../../Extended/CreatePrompt');

module.exports = class VolumeCommand extends Command {
  constructor() {
    super('Volume', {
      aliases: ['Volume'],
      description: {
        content: 'Change music volume',
      },
      category: 'Music',
      cooldown: 3000,
      args: [
        {
          id: 'volume',
          type: Argument.range('number', 1, 101),
          match: 'rest',
          prompt: {
            start: () => {
              const embed = CreateEmbed('info').setDescription(CreatePrompt('How much do you want to change the volume?'));
              return { embed };
            },
            retry: () => {
              const embed = CreateEmbed('info').setDescription(CreatePrompt('Input valid number between 1-100.'));
              return { embed };
            },
          },
        },
      ],
    });
  }

  async exec(msg, { volume }) {
    try {
      const GuildPlayers = this.client.erela.players.get(msg.guild.id);
      if (!GuildPlayers) return msg.channel.send(CreateEmbed('info', 'There no music playing in this guild.'));
      if (!msg.member.voice.channelID) return msg.channel.send(CreateEmbed('warn', 'You must join voice channel to do this.'));
      if (msg.member.voice.channelID !== GuildPlayers.voiceChannel) return msg.channel.send(CreateEmbed('warn', 'You must join voice channel same as me to do this.'));
      GuildPlayers.setVolume(volume);
      return msg.channel.send(CreateEmbed('info', `Set guild volume to \`${volume}\`.`));
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send(CreateEmbed('warn', 'An error occured.'));
    }
  }
};
