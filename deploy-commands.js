const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

// add help command to the list of commands
const commands = [
  require('./commands/help.js').data.toJSON(),
];

/*
adds all commands to '/' Discord menu
*/
// for (const file of helpFile) {
//   if (file === 'help.js') {
//     const command = require(`./commands/${file}`);
//     commands.push(command.data.toJSON());
//   }
// }

console.log(`${commands.length} commands found`);

const rest = new REST({ version: '9' }).setToken(token);
rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
