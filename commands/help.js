const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Prints all available commands'),
  async execute(interaction) {
    try {
      let output = '';
      const { prefix } = require('../config.json');
      const commandFiles = fs
        .readdirSync('./commands')
        .filter((file) => file.endsWith('.js'));
      for (const file of commandFiles) {
        const command = require(`./${file}`);
        output += `**${prefix}${command.data.name}**: ${command.data.description}\n`;
      }
      interaction.reply(output);
    } catch (err) {
      interaction.reply('An error occurred while trying to print the help command.');
      console.error(err);
    }
  },
};
