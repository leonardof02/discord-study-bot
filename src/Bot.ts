import { Client, GatewayIntentBits } from "discord.js";
import { configDotenv } from "dotenv";
import { manage as manageCommand } from "./presentation/CommandManager";
import { syncDatabase } from "./infrastructure/DbConnection";
import { manageInteraction } from "./presentation/InteractionManager";
import { env } from "./config/DotenvVars";

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

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  manageCommand(message);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton() && !interaction.isModalSubmit()) return;
  manageInteraction(interaction);
});

syncDatabase();
const token = env.DISCORD_TOKEN;
client.login(token);
client.on("ready", () => {
  console.log("El bot está skibidi toilet! 🗣️🚽");
});
