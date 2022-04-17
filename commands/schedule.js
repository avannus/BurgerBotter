const momentTimezone = require('moment-timezone');
const { MessageCollector } = require('discord.js');

module.exports = {
  requiredPermissions: ['ADMINISTRATOR'],
  expectedArgs: '<Channel tag> <YYYY/MM/DD> <HHMM> <"AM" or "PM">, <TIMEZONE>',
  minArgs: 5,
  maxArgs: 5,
  init : () => {

  },
  callback: async ({ message, args }) => {
    const { mentions, guild, channel } = message;
    const targetChannel = mentions.channels.first();
    if (!targetChannel) {
      await message.reply('You must mention a channel!');
      return;
    }
    // remove the channel mention
    args.shift();

    const [date, time, clockType, timezone] = args;
    if (clockType !== 'AM' && clockType !== 'PM') {
      await message.reply(`You must specify AM or PM! You provided ${clockType}`);
      return;
    }

    const validTimeZones = momentTimezone.tz.names();
    if (!validTimeZones.includes(timezone)) {
      await message.reply(`You must specify a valid timezone! You provided ${timezone}. <https://gist.github.com/AlexzanderFlores/d511a7c7e97b4c3ae60cb6e562f78300>`);
      return;
    }

    const targetDate = momentTimezone.tz(
      `${date} ${time} ${clockType}`,
      'YYY-MM-DD HH:mm',
      timezone,
    );

    message.reply('Please send the message you want to schedule!');

    const filter = (newMessage) => {
      return newMessage.author.id === message.author.id;
    };
    const collector = new MessageCollector(channel, filter, {
      max: 1,
      time: 30000,
    });

    collector.on('end', async (collected) => {
      const collectedMessage = collected.first();
      if (!collectedMessage) {
        await message.reply('You did not send a message!');
        return;
      }
      message.reply('Your message has been scheduled!');

      //TODO save to database
    });
  },
};
