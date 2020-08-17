'use strict';

const DefaultEmbed = require('./default-embed');

/**
 * Skip song embed.
 *
 * @class
 * @extends DefaultEmbed
 */
class SkipSongEmbed extends DefaultEmbed {
	constructor(song) {
		super(song);
		this.setColor("YELLOW")
		this.setTitle(`:track_next: \`${song.title}\` has been skipped`);
	}
}

module.exports = SkipSongEmbed;