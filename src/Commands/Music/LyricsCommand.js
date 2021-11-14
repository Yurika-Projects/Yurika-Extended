const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Extended/CreateEmbed');
const got = require('got')
const fetch = require("node-fetch")
const sendError = require("../../Extended/Error");

module.exports = class LyricsCommand extends Command {
  constructor() {
    super('lyrics', {
      aliases: ['ly','lirik','lyrics'],
      description: {
        content: 'search lyrics [<prefix>ly (name music)]',
      },
      category: 'Music',
      cooldown: 3000,
    });
  }

  async exec(message) {
    const GuildPlayers = this.client.erela.players.get(message.guild.id);
      if (!GuildPlayers) return message.channel.send(CreateEmbed('info', 'There no music playing in this guild.'));
    let song = `${GuildPlayers.queue.current.title}`
  // if i do !lyrics hello
// it will fetch https://some-random-api.ml/lyrics?title=hello
// always encodeURICompontent your string if it's going into a link
// you'll need node-fetch for this script to work
const response = await fetch("https://some-random-api.ml/lyrics?title=" + encodeURIComponent(args.join(" "))).then(response => response.json());
      
      // check if anything went wrong
      
      // this is a function we'll use later, users and bots can't send more than 2k characters in one message, so we just trim the message!      
      const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...\n\n _Want the full lyrics? Click [here!](${response.links.genius})_`.trim() : str.trim();
      
      // you can just use response.[json propriety here] to get anything ranging from the title to the lyrics
      try {
      const songEmbed = new Discord.MessageEmbed()
        .setColor("0xfeb637")
        .setTitle(response.title + " by " + response.author) // [song title] by [author]
        .setURL(response.links.genius) // [Genius link]
        .setThumbnail(response.thumbnail.genius) // [Song album art]
        .setDescription(trim(response.lyrics, 1950)) // [lyrics]
      message.channel.send(songEmbed);
      } catch (error) {sendError("Something went wrong with fetching the lyrics.", message.channel);}
  }}