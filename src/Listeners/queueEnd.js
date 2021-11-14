const { Listener } = require('discord-akairo');
const { CreateEmbed } = require('../Extended/CreateEmbed');

module.exports = class queueEnd extends Listener {
  constructor() {
    super('queueEnd', {
      event: 'queueEnd',
      emitter: 'erela',
    });
  }

  exec(player) {
    const QueueChannel = this.client.channels.cache.get(player.textChannel);
    QueueChannel.send(CreateEmbed('info', '<:warning2:853590255903047721> | Silahkan tambah lagu untuk melanjutkan'));
    player.destroy();
  }
};