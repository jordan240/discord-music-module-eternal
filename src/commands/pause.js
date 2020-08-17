'use strict'

const ErrorEmbed = require('../embeds/error-embed');
const PauseMusicEmbed = require("../embeds/pause-music-embed")

const pause = {
	name: 'pause',
    description: 'Pause the current song.',
    execute(message, arg, musicBot) {
        const serverQueue = musicBot.queue.get(message.guild.id);
            if (serverQueue && serverQueue.playing) {
                serverQueue.playing = false;
                serverQueue.connection.dispatcher.pause();
                return message.channel.send(
                    new PauseMusicEmbed('Paused the music for you!')
                    );
            }
            return message.channel.send(
                new ErrorEmbed('There is nothing playing.')
                );
    }
}

module.exports = pause