const { Manager } = require('erela.js');
const Spotify = require('./Plugin/Erela/Spotify');
const Deezer = require('./Plugin/Erela/Deezer');
const SayaClient = require('./Struct/SayaClient');
const Extended = require('./extended')

const Client = new SayaClient();
if (Client.config.enablePlugin) {
  Client.erela = new Manager({
    autoPlay: true,
    nodes: Client.config.nodes,
    plugins: [
      new Deezer(),
      new Spotify({
        clientID: Client.config.spotifyClientID || null,
        clientSecret: Client.config.spotifySecret || null,
      }),
    ],
    send(id, payload) {
      const guild = Client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    },
  });
} else {
  Client.erela = new Manager({
    autoPlay: true,
    nodes: Client.config.nodes,
    send(id, payload) {
      const guild = Client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    },
  });
}

Client.initialize();
