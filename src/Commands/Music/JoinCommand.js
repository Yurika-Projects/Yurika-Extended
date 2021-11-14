const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Extended/CreateEmbed');

module.exports = class JoinCommand extends Command {
  constructor() {
    super('join', {
      aliases: ['join'],
      description: {
        content: 'Join to voice',
      },
      category: 'Music',
      cooldown: 3000,
    });
  }

  async exec(msg) {
if (msg.member.voice.channel) {
      const connection = await msg.member.voice.channel.join();
    } else {
      msg.reply('You need to join a voice channel first!');
    }
  }}