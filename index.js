const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.DIRECT_MESSAGES,
] });
client.config = require('./config.json');

// Register commands
client.commands = new Collection();
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// Register events
const eventFiles = fs
  .readdirSync('./events')
  .filter((file) => file.endsWith('.js'));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

fs.access('./data', function(err) {
  if (err) {
    fs.mkdirSync('./data');
  } else {
    console.log('data directory already exists');
  }
  ensuredb();
});

function ensuredb() {
  fs.access('./data/db.json', function(err) {
    if (err) {
      const initData = {
        'users': [],
      };
      fs.writeFileSync('./data/db.json', JSON.stringify(initData));
    } else {
      console.log('db already exists');
    }
    const data = JSON.parse(fs.readFileSync('./data/db.json'));
    fs.writeFileSync('./data/db.json', JSON.stringify(data));
  });
}

client.login(token);
