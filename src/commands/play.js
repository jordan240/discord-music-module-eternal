'use strict';

const ytdl = require('ytdl-core');
const { YouTube } = require('popyt');

const AddSongEmbed = require('../embeds/add-song-embed');
const ErrorEmbed = require('../embeds/error-embed');
const PlaySongEmbed = require('../embeds/play-song-embed');

const play = {
	name: 'play',
	description: 'Play a song or add it to the queue',
	async execute(message, args, musicBot) {
		if (!message.member.voice.channel) {
			return message.channel.send(
				new ErrorEmbed('You need to be in a voice channel to play music!')
			);
		};

		const { channel } = message.member.voice;
		const permissions = channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send(
			new ErrorEmbed('I cannot connect to your voice channel, make sure I have the proper permissions!')
		);
		if (!permissions.has('SPEAK')) return message.channel.send(
			new ErrorEmbed('I cannot speak in this voice channel, make sure I have the proper permissions!')
		);

		if (!args[0]) {
			return message.channel.send(
				new ErrorEmbed('You have to enter a search term.')
			);
		};

		const youtube = new YouTube(musicBot.ytApiKey);

		const infos = await youtube.searchVideos(args, 1);
		if (infos.results.length === 0) {
			return message.channel.send(
				new ErrorEmbed('This song couldn\'t be found!')
			);
		};

		const serverQueue = musicBot.queue.get(message.guild.id);
		const songInfo = await ytdl.getInfo(infos.results[0].url);
		if (!songInfo) {
			return message.channel.send(
				new ErrorEmbed('This song is restricted or couldn\'t be found!')
			);
		}

		const song = {
			id: songInfo.video_id,
			title: songInfo.title,
			url: songInfo.video_url,
			author: songInfo.author.name,
			authorUrl: songInfo.author.user_url,
			duration: new Date(songInfo.length_seconds * 1000).toISOString().slice(11, 19),
			thumbnailUrl: songInfo.player_response.videoDetails.thumbnail.thumbnails.pop().url
		};

		if (serverQueue) {
			serverQueue.songs.push(song);
			return message.channel.send(new AddSongEmbed(song));
		};

		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: channel,
			connection: null,
			songs: [],
			volume: 2,
			playing: true
		};
		musicBot.queue.set(message.guild.id, queueConstruct);
		queueConstruct.songs.push(song);

		const play = async song => {
			const queue = musicBot.queue.get(message.guild.id);
			if (!song) {
				queue.voiceChannel.leave();
				musicBot.queue.delete(message.guild.id);
				return;
			}
			message.guild.me.voice.setDeaf(true);
			const dispatcher = queue.connection.play(ytdl(song.url))
				.on('finish', () => {
					queue.songs.shift();
					play(queue.songs[0]);
				})
				.on('error', error => console.error(error));
			dispatcher.setVolumeLogarithmic(queue.volume / 5);
			if (!serverQueue) {
				queue.textChannel.send(new PlaySongEmbed(song));
			};
		};

		try {
			const connection = await channel.join();
			queueConstruct.connection = connection;
			play(queueConstruct.songs[0]);
		} catch (error) {
			musicBot.queue.delete(message.guild.id);
			await channel.leave();
			return message.channel.send(new ErrorEmbed(`I could not join the voice channel: \`${error}\``));
		}
	}
};

module.exports = play;