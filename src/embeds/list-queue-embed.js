'use strict';

const DefaultEmbed = require('./default-embed');

/**
 * Lits queue embed.
 *
 * @class
 * @extends DefaultEmbed
 */
class ListQueueEmbed extends DefaultEmbed {
	constructor(serverQueue) {
		super();
			for (let i = 1; i < serverQueue.songs.length && i < 26; i++) {
				this.addField(`#${i}`, `\`${serverQueue.songs[i].title}\``);
			}
	}
}

module.exports = ListQueueEmbed;