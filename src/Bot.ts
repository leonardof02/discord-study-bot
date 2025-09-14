import { Client, GatewayIntentBits } from "discord.js";
import { env } from "./shared/infrastructure/config/DotenvVars";
import { syncDatabase } from "./shared/infrastructure/DbConnection";
import { manageCommand } from "./shared/presentation/CommandManager";
import { manageInteraction } from "./shared/presentation/InteractionManager";

console.log("Starting bot...");
console.log("Env loaded!", env);

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
  if (
    !interaction.isButton() &&
    !interaction.isModalSubmit() &&
    !interaction.isStringSelectMenu()
  )
    return;
  manageInteraction(interaction);
});

syncDatabase();
const token = env.DISCORD_TOKEN;
client.login(token);
client.on("ready", () => {
  console.log("El bot está skibidi toilet! 🗣️🚽");
});
