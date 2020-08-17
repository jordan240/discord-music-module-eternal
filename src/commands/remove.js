'use strict';

const RemoveSongEmbed = require('../embeds/remove-song-embed');
const ErrorEmbed = require('../embeds/error-embed');

const remove = {
	name: 'remove',
	description: 'Remove from the queue the song at position index',
	execute(message, arg, musicBot) {
		const serverQueue = musicBot.queue.get(message.guild.id);

		if (!serverQueue) {
			return message.channel.send(new ErrorEmbed('There is no song that I could remove!'));
		}

		const index = parseInt(arg, 10);
		if (!isNaN(index) && index >= 1 && serverQueue.songs.length > index) {
			message.channel.send(new RemoveSongEmbed(serverQueue.songs[index]));
			serverQueue.songs.splice(index, 1);
		} else {
			message.channel.send(new ErrorEmbed('Index must be a number greater than zero!'));
		}
	}
};

module.exports = remove;