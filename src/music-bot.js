'use strict';

const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');

let MusicBot = class MusicBot {
	/**
	 * Token and ytApiKey are required.
	 *
	 * @param {Object} options
	 */
	constructor(options) {
		if (!options.token) {
			throw new Error('\x1b[32m[Music Bot Error], \x1b[37mno token inserted.');
		}
        if(!options.ytApiKey) {
            throw new Error('\x1b[32m[Music Bot Error], \x1b[37mno YouTube API Key inserted.');
        }
        if(!options.prefix) {
            throw new Error('\x1b[32m[Music Bot Error], \x1b[37mno prefix inserted.');
		}
		if(!options.game) {
			throw new Error('\x1b[32m[Music Bot Error], \x1b[37mno game inserted.');
        }

		this.token = options.token;
		this.ytApiKey = options.ytApiKey;
		this.prefix = options.prefix;
		this.game = options.game;

		this.queue = new Map();
		
		this.setup();
	}

	/**
	 * Run bot
	 *
	 * @api public
	 */
	run() {
		this.client.login(this.token);
	}

	/**
	 * Setup the bot.
	 *
	 * @api private
	 */
	setup() {
		this.client = new Discord.Client({
            disableMentions: "everyone"
        });
		this.client.commands = new Discord.Collection();

		const commandFiles = fs.readdirSync(path.join(__dirname, '/commands')).filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(`./commands/${file}`);
			this.client.commands.set(command.name, command);
		}

		this.client.on('ready', () => {
			this.client.user.setActivity(`${this.game}`, {type: "LISTENING"});
		});

		this.client.on('error', error => {
			console.error("\x1b[32m[Music Bot Error], \x1b[37m" + error);
		});

		this.client.on('warn', warn => {
			console.warn("\x1b[36m[Music Bot Warning], \x1b[37m" + warn);
		});

		this.client.on('message', message => {
			if (message.author.bot || !message.guild || !message.content.startsWith(this.prefix)) {
				return;
			}
			
			const arg = message.content.slice(this.prefix.length).split(/ +/);
			const command = arg.shift().toLowerCase();

			const args = arg.join(' ');

			if (!this.client.commands.has(command)) {
				return;
			}

			try {
				this.client.commands.get(command).execute(message, args, this);
			} catch (error) {
				console.error(error);
			}
		});
	}
}

module.exports = MusicBot;