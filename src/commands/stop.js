'use strict';

const StopQueueEmbed = require('../embeds/stop-queue-embed');
const ErrorEmbed = require('../embeds/error-embed');

const stop = {
	name: 'stop',
	description: 'Stop the currently played song and clear the queue',
	execute(message, arg, musicBot) {
		const serverQueue = musicBot.queue.get(message.guild.id);

		if (!serverQueue) {
			return message.channel.send(new ErrorEmbed('There\'s no song currently played or in queue'));
		}

		if (!message.member.voice.channel) {
			return message.channel.send(new ErrorEmbed('You have to be in a voice channel to stop the music!'));
		}

		serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
        message.member.voice.channel.leave()
		message.channel.send(new StopQueueEmbed());
	}
};

module.exports = stop;