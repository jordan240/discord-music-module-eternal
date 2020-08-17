'use strict';

const DefaultEmbed = require('./default-embed');

/**
 * Error embed.
 *
 * @class
 * @extends DefaultEmbed
 */
class ErrorEmbed extends DefaultEmbed {
	constructor(errMsg) {
		super();
		this.setColor('RED');
		this.setAuthor('Error');
        this.setDescription(":x: " + errMsg);
	}
}

module.exports = ErrorEmbed;