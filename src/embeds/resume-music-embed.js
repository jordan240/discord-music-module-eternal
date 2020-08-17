'use strict';

const DefaultEmbed = require('./default-embed');

/**
 * Resume music embed.
 *
 * @class
 * @extends DefaultEmbed
 */
class ResumeMusicEmbed extends DefaultEmbed {
	constructor(resumeMsg) {
		super();
		this.setTitle('▶ ' + resumeMsg);
	}
}

module.exports = ResumeMusicEmbed;