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
const CommandManager_1 = require("./presentation/CommandManager");
const DbConnection_1 = require("./infrastructure/DbConnection");
const InteractionManager_1 = require("./presentation/InteractionManager");
const DotenvVars_1 = require("./config/DotenvVars");
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
    if (!interaction.isButton() && !interaction.isModalSubmit())
        return;
    (0, InteractionManager_1.manageInteraction)(interaction);
}));
(0, DbConnection_1.syncDatabase)();
const token = DotenvVars_1.env.DISCORD_TOKEN;
client.login(token);
client.on("ready", () => {
    console.log("El bot está skibidi toilet! 🗣️🚽");
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0JvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDJDQUF1RDtBQUV2RCxrRUFBd0U7QUFDeEUsZ0VBQTZEO0FBQzdELDBFQUFzRTtBQUN0RSxvREFBMEM7QUFFMUMsTUFBTSxNQUFNLEdBQUcsSUFBSSxtQkFBTSxDQUFDO0lBQ3hCLE9BQU8sRUFBRTtRQUNQLDhCQUFpQixDQUFDLGNBQWM7UUFDaEMsOEJBQWlCLENBQUMsTUFBTTtRQUN4Qiw4QkFBaUIsQ0FBQyxhQUFhO1FBQy9CLDhCQUFpQixDQUFDLGNBQWM7UUFDaEMsOEJBQWlCLENBQUMscUJBQXFCO1FBQ3ZDLDhCQUFpQixDQUFDLFlBQVk7UUFDOUIsOEJBQWlCLENBQUMsa0JBQWtCO1FBQ3BDLDhCQUFpQixDQUFDLHNCQUFzQjtRQUN4Qyw4QkFBaUIsQ0FBQyxtQkFBbUI7S0FDdEM7Q0FDRixDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFPLE9BQU8sRUFBRSxFQUFFO0lBQzNDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHO1FBQUUsT0FBTztJQUMvQixJQUFBLHVCQUFhLEVBQUMsT0FBTyxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBTyxXQUFXLEVBQUUsRUFBRTtJQUNuRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRTtRQUFFLE9BQU87SUFDcEUsSUFBQSxzQ0FBaUIsRUFBQyxXQUFXLENBQUMsQ0FBQztBQUNqQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBRUgsSUFBQSwyQkFBWSxHQUFFLENBQUM7QUFDZixNQUFNLEtBQUssR0FBRyxnQkFBRyxDQUFDLGFBQWEsQ0FBQztBQUNoQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BCLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7QUFDbkQsQ0FBQyxDQUFDLENBQUMifQ==