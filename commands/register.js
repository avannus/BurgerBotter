const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Registers for Burger Burner'),
  async execute(interaction) {
    console.log(interaction);
    const db = JSON.parse(fs.readFileSync('./data/db.json'));
    const userData = db.users.find((user) => user.id === interaction.user.id);
    if (userData && userData.registered) {
      await interaction.reply('You are already registered!');
    } else {
      db.users.push({
        id: interaction.user.id,
        name: interaction.user.username,
        registered: true,
      });
      fs.writeFileSync('./data/db.json', JSON.stringify(db));
      await interaction.reply('Registered!');
    }
  },
};
