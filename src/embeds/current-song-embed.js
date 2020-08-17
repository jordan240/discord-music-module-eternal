'use strict';

const PlaySongEmbed = require('./play-song-embed');

/**
 * Current song embed.
 *
 * @class
 * @extends PlaySongEmbed
 */
class CurrentSongEmbed extends PlaySongEmbed {
	constructor(song) {
		super(song);
		this.setTitle('🎶 Currently playing');
	}
}

module.exports = CurrentSongEmbed;