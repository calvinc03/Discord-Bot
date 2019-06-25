const Discord = require('discord.js');
const bot = new Discord.Client();
var PREFIX = "!"
const memeURL = 'https://api.imgflip.com/get_memes';
var users = {};

const ytdl = require('ytdl-core');
const streamOptions = {seek: 0, volume: 1};

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
  });  

bot.on('message', async msg => {
    if (msg.author.bot) return;

    var name = msg.author.username;
    if(!users.hasOwnProperty(name)) {
        users[name] = 0;
    }
    users[name]++;
    if (users[name] % 10 === 0) {
        msg.reply("" + name + "is now level " + users[name]/10 + "");
    }

    if(!msg.content.startsWith(PREFIX)) return;

    var args = msg.content.toLowerCase().substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case "odds":
            odds(msg, args);
            break;

        case "play":
            playMusic(msg, args);
            break;
        
        case "prefix":
            changePrefix(msg, args);
            break;

        case "meme":
            sendMeme(msg,args);
            break;

        default:
            msg.reply("Invalid Command");
    }
});

function odds(message, args) {

    if (args.length != 3 || isNaN(args[1]) || isNaN(args[2])) {
        message.reply("Use only 2 numbers!");
        return;
    }
    if (args[1] > args[2]) {
        message.reply("Invalid numbers. You can't guess " + args[1] + " out of " + args[2] + " numbers.");
        return;
    }
    var guess = Math.floor(Math.random() * args[2]) + 1;
    message.reply("You guessed " + args[1] + ". The number was " + guess + ".");
    if (guess == args[1]) {
        message.reply("Congrats! You guessed the right number in 1 out of " + args[2] + " chances.");
    } else {
        message.reply("You guessed the wrong number. Unlucky");
    }  
};

function changePrefix(message, args) {
    PREFIX = args[1];
    message.channel.sendMessage("Command Prefix has been set to " + PREFIX);
};

function playMusic(message, args) {
    let VoiceChannel = message.guild.channels.find(channel => channel.id === '516228667685470218');
    if (VoiceChanel != null) {
        VoiceChannel.join()
        .then(connection => {
            const stream = ytdl(arg[1], {filter: 'audioonly'});
            const dispatcher = connection.playStream(stream, streamOptions);
        })
        .catch();
    }
}

function sendMeme(message, args) {
    fetch(memeURL)
    .then(function(response) {
        message.channel.send("Here is your meme!", {files: response})
    })
    .catch(function() {
        message.reply("Cannot get the image :(")
    });
}

bot.login('NDcyNTA5NDE5MTc2MDY3MDk0.Dj0rAA.ipf2D4AiwuIUwakLzcZHqQXj188');