'use strict';

const CurrentSongEmbed = require('../embeds/current-song-embed');
const ErrorEmbed = require('../embeds/error-embed');

const np = {
	name: 'np',
	description: 'Display the currently played song',
	async execute(message, arg, musicBot) {
		const serverQueue = musicBot.queue.get(message.guild.id);
	
		if (!serverQueue) {
			return message.channel.send(new ErrorEmbed('There is no song currently playing!'));
		}
		
		const serverQueueClient = musicBot.client.voice.connections.get(message.guild.id);
		const getStreamTime = serverQueueClient.dispatcher.streamTime;

		message.channel.send(new CurrentSongEmbed(serverQueue.songs[0], progressMusicBar()));

		function progressMusicBar() {
			if (getStreamTime <= 19000) {
				return "🔘▬▬▬▬▬▬▬▬▬▬▬";
			} else if (getStreamTime <= 38000) {
				return "▬🔘▬▬▬▬▬▬▬▬▬▬";
			} else if (getStreamTime <= 57000) {
				return "▬▬🔘▬▬▬▬▬▬▬▬▬";
			} else if (getStreamTime <= 76000) {
				return "▬▬▬🔘▬▬▬▬▬▬▬▬";
			} else if (getStreamTime <= 95000) {
				return "▬▬▬▬🔘▬▬▬▬▬▬▬";
			} else if (getStreamTime <= 114000) {
				return "▬▬▬▬▬🔘▬▬▬▬▬▬";
			} else if (getStreamTime <= 133000) {
				return "▬▬▬▬▬▬🔘▬▬▬▬▬";
			} else if (getStreamTime <= 152000) {
				return "▬▬▬▬▬▬▬🔘▬▬▬▬";
			} else if (getStreamTime <= 171000) {
				return "▬▬▬▬▬▬▬▬🔘▬▬▬";
			} else if (getStreamTime <= 190000) {
				return "▬▬▬▬▬▬▬▬▬🔘▬▬";
			} else if (getStreamTime <= 209000) {
				return "▬▬▬▬▬▬▬▬▬▬🔘▬";
			} else if (getStreamTime <= 228000) {
				return "▬▬▬▬▬▬▬▬▬▬▬🔘";
			} else {
				return "▬▬▬▬▬▬▬▬▬▬▬▬▬";
			}
		}
	}
};

module.exports = np;