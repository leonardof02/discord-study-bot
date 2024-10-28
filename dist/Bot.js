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
const dotenv_1 = require("dotenv");
const CommandManager_1 = require("./presentation/CommandManager");
const DbConnection_1 = require("./infrastructure/DbConnection");
const InteractionManager_1 = require("./presentation/InteractionManager");
(0, dotenv_1.configDotenv)();
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
    (0, CommandManager_1.manage)(message);
}));
client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isButton())
        return;
    (0, InteractionManager_1.manageInteraction)(interaction);
}));
(0, DbConnection_1.syncDatabase)();
const token = process.env.DISCORD_TOKEN;
client.login(token);
client.on("ready", () => {
    console.log("El bot está skibidi toilet! 🗣️🚽");
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0JvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDJDQUF1RDtBQUN2RCxtQ0FBc0M7QUFDdEMsa0VBQXdFO0FBQ3hFLGdFQUE2RDtBQUM3RCwwRUFBc0U7QUFFdEUsSUFBQSxxQkFBWSxHQUFFLENBQUM7QUFFZixNQUFNLE1BQU0sR0FBRyxJQUFJLG1CQUFNLENBQUM7SUFDeEIsT0FBTyxFQUFFO1FBQ1AsOEJBQWlCLENBQUMsY0FBYztRQUNoQyw4QkFBaUIsQ0FBQyxNQUFNO1FBQ3hCLDhCQUFpQixDQUFDLGFBQWE7UUFDL0IsOEJBQWlCLENBQUMsY0FBYztRQUNoQyw4QkFBaUIsQ0FBQyxxQkFBcUI7UUFDdkMsOEJBQWlCLENBQUMsWUFBWTtRQUM5Qiw4QkFBaUIsQ0FBQyxrQkFBa0I7UUFDcEMsOEJBQWlCLENBQUMsc0JBQXNCO1FBQ3hDLDhCQUFpQixDQUFDLG1CQUFtQjtLQUN0QztDQUNGLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQU8sT0FBTyxFQUFFLEVBQUU7SUFDM0MsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUc7UUFBRSxPQUFPO0lBQy9CLElBQUEsdUJBQWEsRUFBQyxPQUFPLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFPLFdBQVcsRUFBRSxFQUFFO0lBQ25ELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFO1FBQUUsT0FBTztJQUNwQyxJQUFBLHNDQUFpQixFQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2pDLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFFSCxJQUFBLDJCQUFZLEdBQUUsQ0FBQztBQUNmLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO0FBQ3hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO0lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQztBQUNuRCxDQUFDLENBQUMsQ0FBQyJ9