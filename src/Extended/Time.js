const { formatTime } = require('./functions');
const { MessageEmbed } = require('discord.js');

module.exports = {
	sm: require('./CreateEmbed'),
	formatTime,
	embed: MessageEmbed
};