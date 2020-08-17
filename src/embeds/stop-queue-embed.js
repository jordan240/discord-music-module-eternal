'use strict';

const DefaultEmbed = require('./default-embed');

/**
 * Stop queue embed.
 *
 * @class
 * @extends DefaultEmbed
 */
class StopQueueEmbed extends DefaultEmbed {
	constructor() {
		super();
		this.setTitle('🌀 I have been stopped playing and leave the voice channel');
		this.setColor("PURPLE");
	}
}

module.exports = StopQueueEmbed;