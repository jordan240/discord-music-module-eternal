'use strict';

const Discord = require('discord.js');
/**
* Default embed.
*
* @class
* @extends Discord.MessageEmbed
*/
class DefaultEmbed extends Discord.MessageEmbed {
	constructor() {
		super({
			timestamp: Date.now(),
			color: "BLUE"
		});
	}
}

module.exports = DefaultEmbed;