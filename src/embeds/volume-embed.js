
'use strict';

const DefaultEmbed = require('./default-embed');

/**
 * Volume embed.
 *
 * @class
 * @extends DefaultEmbed
 */
class VolumeEmbed extends DefaultEmbed {
	constructor(previousVolume, newVolume) {
		super();
		this.setTitle('🔊 Volume');
		this.setDescription(`Changed from \`${previousVolume}\` to \`${newVolume}\``);
	}
}

module.exports = VolumeEmbed;