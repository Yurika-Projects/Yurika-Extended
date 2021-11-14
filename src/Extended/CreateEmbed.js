const { MessageEmbed } = require('discord.js');

const Color = {
  info: 'BLUE',
  warn: 'YELLOW',
  error: 'RED',
};
function CreateEmbed(color, message) {
  const embed = new MessageEmbed()
    .setColor(Color[color])
  if (message) embed.setDescription(message);
  return embed;
}
module.exports = { CreateEmbed };
