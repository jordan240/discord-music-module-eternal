'use strict';

const DefaultEmbed = require('./default-embed');

/**
 * Pause music embed.
 *
 * @class
 * @extends DefaultEmbed
 */
class PauseMusicEmbed extends DefaultEmbed {
	constructor(pauseMsg) {
		super();
		this.setTitle('⏸ ' + pauseMsg);
	}
}

module.exports = PauseMusicEmbed;