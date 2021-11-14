const { Listener } = require('discord-akairo');
const { CreateEmbed } = require('../Extended/CreateEmbed');

module.exports = class trackStart extends Listener {
  constructor() {
    super('trackStart', {
      event: 'trackStart',
      emitter: 'erela',
    });
  }

  exec(player, track) {
    const QueueChannel = this.client.channels.cache.get(player.textChannel);
    QueueChannel.send(CreateEmbed('info', `:notes: | Memutar \`${track.title}\``));
  }
};
