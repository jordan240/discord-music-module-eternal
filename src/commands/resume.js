'use strict'

const ErrorEmbed = require('../embeds/error-embed');
const ResumeMusicEmbed = require('../embeds/resume-music-embed');

const resume = {
	name: 'resume',
    description: 'Rsume music if it was paused.',
    execute(message, arg, musicBot) {
        const serverQueue = musicBot.queue.get(message.guild.id);
            if (serverQueue && !serverQueue.playing) {
                serverQueue.playing = true;
                serverQueue.connection.dispatcher.resume();
                return message.channel.send(
                    new ResumeMusicEmbed('Resumed the music for you!')
                    );
            }
            return message.channel.send(
                new ErrorEmbed('There is nothing playing.')
                );
    }
}

module.exports = resume