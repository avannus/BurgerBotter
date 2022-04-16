const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Prints all available commands'),
  async execute(interaction) {
    try {
      let output = '';
      const commandFiles = fs
        .readdirSync('./commands')
        .filter((file) => file.endsWith('.js'));
      for (const file of commandFiles) {
        if (file === 'help.js') {
          output += '**help**: Prints all available commands\n';
          continue;
        }
        const command = require(`./${file}`);
        output += `**${command.data.name}**: ${command.data.description}\n`;
      }
      interaction.reply(output);
    } catch (err) {
      interaction.reply('An error occurred while trying to print the help command.');
      console.error(err);
    }
  },
};
