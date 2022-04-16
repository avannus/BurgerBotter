const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Registers for Burger Burner'),
  async execute(interaction) {
    const userDB = JSON.parse(fs.readFileSync('./data/userDB.json'));
    const userData = userDB.users.find((user) => user.id === interaction.user.id);
    if (userData && userData.registered) {
      await interaction.reply('You are already registered!');
    } else {
      userDB.users.push({
        id: interaction.user.id,
        name: interaction.user.username,
        registered: true,
      });
      fs.writeFileSync('./data/userDB.json', JSON.stringify(userDB));
      await interaction.reply('Registered!');
    }
  },
};
