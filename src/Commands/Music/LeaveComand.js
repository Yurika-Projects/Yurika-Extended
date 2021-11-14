const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Extended/CreateEmbed');

module.exports = class JoinCommand extends Command {
  constructor() {
    super('leave', {
      aliases: ['leave','dc','disconnect'],
      description: {
        content: 'Leave voice',
      },
      category: 'Music',
      cooldown: 3000,
    });
  }

  async exec(msg) {
if (msg.member.voice.channel) {
      const connection = await msg.member.voice.channel.leave();
    } else {
      msg.reply('You need to join a voice channel first!');
    }
  }}