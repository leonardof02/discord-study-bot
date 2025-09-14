"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const DotenvVars_1 = require("./shared/infrastructure/config/DotenvVars");
const DbConnection_1 = require("./shared/infrastructure/DbConnection");
const CommandManager_1 = require("./shared/presentation/CommandManager");
const InteractionManager_1 = require("./shared/presentation/InteractionManager");
console.log("Starting bot...");
console.log("Env loaded!", DotenvVars_1.env);
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessageTyping,
        discord_js_1.GatewayIntentBits.DirectMessageReactions,
        discord_js_1.GatewayIntentBits.DirectMessageTyping,
    ],
});
client.on("messageCreate", (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.author.bot)
        return;
    (0, CommandManager_1.manageCommand)(message);
}));
client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isButton() &&
        !interaction.isModalSubmit() &&
        !interaction.isStringSelectMenu())
        return;
    (0, InteractionManager_1.manageInteraction)(interaction);
}));
(0, DbConnection_1.syncDatabase)();
const token = DotenvVars_1.env.DISCORD_TOKEN;
client.login(token);
client.on("ready", () => {
    console.log("El bot está skibidi toilet! 🗣️🚽");
});
//# sourceMappingURL=Bot.js.map