import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import { configDotenv } from "dotenv";
import { manage } from "./CommandManage";
import { syncDatabase } from "./db/DbConnection";

configDotenv();

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
  ],
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  manage(message);
});

syncDatabase();
const token = process.env.DISCORD_TOKEN;
client.login(token);
