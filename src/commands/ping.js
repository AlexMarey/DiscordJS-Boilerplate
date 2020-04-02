module.exports = {
  name: "ping",
  description: "Ping - Pong!",
  args: false,
  usage: "!ping",
  execute(message) {
    console.log(`Command: Ping \nReplying to ${message} with 'Pong'\n`);
    message.channel.send("Pong!");
  }
};
