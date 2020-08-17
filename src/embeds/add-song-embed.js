'use strict';

const DefaultEmbed = require('./default-embed');

/**
 * Add song embed.
 *
 * @class
 * @extends DefaultEmbed
 */
class AddSongEmbed extends DefaultEmbed {
	constructor(song) {
		super();
		this.setTitle('🎶 Added to queue');
		this.setDescription(`\`${song.title}\` has been added to the queue.`);
		this.setColor("ORANGE");
	}
}
module.exports = AddSongEmbed;