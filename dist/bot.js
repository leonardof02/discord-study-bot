"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
const CommandManage_1 = require("./CommandManage");
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
client.on("messageCreate", (message) => {
    if (message.author.bot)
        return;
    (0, CommandManage_1.manage)(message);
});
const token = process.env.DISCORD_TOKEN;
console.log(token, "!!!!!");
client.login(token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0JvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUFxRTtBQUNyRSxtQ0FBc0M7QUFDdEMsbURBQWtEO0FBRWxELElBQUEscUJBQVksR0FBRSxDQUFDO0FBRWYsTUFBTSxNQUFNLEdBQUcsSUFBSSxtQkFBTSxDQUFDO0lBQ3hCLE9BQU8sRUFBRTtRQUNQLDhCQUFpQixDQUFDLGNBQWM7UUFDaEMsOEJBQWlCLENBQUMsTUFBTTtRQUN4Qiw4QkFBaUIsQ0FBQyxhQUFhO1FBQy9CLDhCQUFpQixDQUFDLGNBQWM7UUFDaEMsOEJBQWlCLENBQUMscUJBQXFCO1FBQ3ZDLDhCQUFpQixDQUFDLFlBQVk7UUFDOUIsOEJBQWlCLENBQUMsa0JBQWtCO1FBQ3BDLDhCQUFpQixDQUFDLHNCQUFzQjtRQUN4Qyw4QkFBaUIsQ0FBQyxtQkFBbUI7S0FDdEM7Q0FDRixDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFO0lBQ3JDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHO1FBQUUsT0FBTztJQUMvQixJQUFBLHNCQUFNLEVBQUMsT0FBTyxDQUFDLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztBQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDIn0=