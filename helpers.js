const commando = require('discord.js-commando');

class oddsCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'odds',
            group: 'random',
            memberName: 'roll',
            description: 'playing odds',
        });
    }

    async run(message, args) {
        var num1, num2;
        var i = 0;
        var j = 1;
        while (i < args.length) {
            if (args[i] != ' ') {
                if (j == 1) {
                    if (num1 != undefined) {
                        num1 += args[i];
                    } else {
                        num1 = args[i];
                    }
                } else if (j == 2) {
                    if (num2 != undefined) {
                        num2 += args[i];
                    } else {
                        num2 = args[i];
                    }
                }
            }
            else {
                j++;
                if (num2 == undefined) {
                    j = 2;
                }
            }
            i++;
        }
        if (num1 > num2 && num1.length >= num2.length) {
            message.reply("Invalid numbers. You can't guess " + num1 + " out of " + num2 + " numbers.");
            return;
        }
        var guess = Math.floor(Math.random() * num2) + 1;
        message.reply("You guessed " + num1 + ". The number was " + guess + ".");
        if (guess == num1) {
            message.reply("Congrats! You guessed the right number in 1 out of " + num2 + " chances.");
        } else {
            message.reply("You guessed the wrong number. Unlucky");
        }  
    }
}

module.exports = oddsCommand;