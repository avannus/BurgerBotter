const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bntyc')
    .setDescription(
      'Creates a bounty in the format "!bntyc <interval_days> <qty_per_interval> "<bounty>" "<title>"'),
  async execute(interaction) {
    const db = JSON.parse(fs.readFileSync('./data/db.json'));
    const userData = db.users.find((user) => user.id === interaction.user.id);
    // if user isn't registered, let them know and return
    if (!userData || !userData.registered) {
      await interaction.reply('You must register first!');
      return;
    }
    const input = interaction.message.content;
    console.log(input);
  },
};
