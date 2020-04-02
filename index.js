const fs = require("fs");
const Discord = require("discord.js");
const { discordToken } = require("./token.json");
const { prefix } = require("./config.json");

// Create a discord client and a collection for the commands
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Find all command files
const commandFiles = fs
  .readdirSync("./src/commands")
  .filter(file => file.endsWith(".js"));

// Store each command in the client command collections
for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("I'm Ready, I'm Ready, I'm Ready!");
});

client.on("message", message => {
  // Return if the message does not start with the prefix or comes from the bot
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // Grab all args, eliminate multi whitespace, and use the first arg as the command name
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);

  if (!command) return;

  // Check if the command is meant to be in a specific server only
  if (command.guildOnly && message.channel.type !== "text") {
    return message.reply("I can't execute that command inside DMs!");
  }

  // Check if the command requires arguments and if there are any
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.auther}!`;

    if (command.usage) {
      reply += `\nThe proper usage is: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  try {
    console.log(`Command: ${command.name}`);
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was an error trying to execute that command!");
  }
});

client.login(discordToken);
