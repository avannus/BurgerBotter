module.exports = {
  name: 'messageCreate',
  execute(message, client) {
    console.log('messageCreate');
    if (message.author.bot) return;
    console.log(
      `${message.author.tag} in #${message.channel.name} said: ${message.content}`);
    if (message.content.startsWith(client.config.prefix)) {
      const commandName = message.content.slice(client.config.prefix.length).split(' ')[0];
      if (commandName === 'server' || commandName === 'user') {
        return;
      }
      const command = client.commands.get(commandName);
      if (!command) return;
      try {
        command.execute(message, client);
      } catch (error) {
        console.error(error);
        message.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }
  },
};
