'use strict';

const ErrorEmbed = require('../embeds/error-embed');
const ListQueueEmbed = require('../embeds/list-queue-embed');

const queue = {
	name: 'queue',
	description: 'Display each song title in queue',
	execute(message, arg, musicBot) {
		const serverQueue = musicBot.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send(
			new ErrorEmbed('There is nothing playing.')
			);
		message.channel.send(new ListQueueEmbed(serverQueue));
	}
};

module.exports = queue;