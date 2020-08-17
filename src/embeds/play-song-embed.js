'use strict';

const DefaultEmbed = require('./default-embed');

/**
 * Play song embed.
 *
 * @class
 * @extends DefaultEmbed
 */
class PlaySongEmbed extends DefaultEmbed {
	constructor(song) {
		super();
		this.setTitle('🎵 Now playing');
		this.addField('Title', `\`${song.title}\``);
		this.addField('Author', `[${song.author}](${song.authorUrl})`);
		this.addField('Duration', `\`${song.duration}\``);
		this.addField('Link', `[Video link](${song.url})`);
		this.setThumbnail(song.thumbnailUrl);
	}
}

module.exports = PlaySongEmbed;