'use strict';

const SkipSongEmbed = require('../embeds/skip-song-embed');
const ErrorEmbed = require('../embeds/error-embed');

const skip = {
	name: 'skip',
	description: 'Skip the currently played song',
	execute(message, arg, musicBot) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send(
			new ErrorEmbed('I\'m sorry but you need to be in a voice channel to play music!')
			);
		const serverQueue = musicBot.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send(
			new ErrorEmbed('There is nothing playing that I could skip for you.')
			);
		message.channel.send(new SkipSongEmbed(serverQueue.songs[0]));
		serverQueue.connection.dispatcher.end();
	}
};

module.exports = skip;