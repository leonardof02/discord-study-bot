"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
const CommandManage_1 = require("./CommandManage");
const DbConnection_1 = require("./db/DbConnection");
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
(0, DbConnection_1.syncDatabase)();
const token = process.env.DISCORD_TOKEN;
client.login(token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0JvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUFxRTtBQUNyRSxtQ0FBc0M7QUFDdEMsbURBQXlDO0FBQ3pDLG9EQUFpRDtBQUVqRCxJQUFBLHFCQUFZLEdBQUUsQ0FBQztBQUVmLE1BQU0sTUFBTSxHQUFHLElBQUksbUJBQU0sQ0FBQztJQUN4QixPQUFPLEVBQUU7UUFDUCw4QkFBaUIsQ0FBQyxjQUFjO1FBQ2hDLDhCQUFpQixDQUFDLE1BQU07UUFDeEIsOEJBQWlCLENBQUMsYUFBYTtRQUMvQiw4QkFBaUIsQ0FBQyxjQUFjO1FBQ2hDLDhCQUFpQixDQUFDLHFCQUFxQjtRQUN2Qyw4QkFBaUIsQ0FBQyxZQUFZO1FBQzlCLDhCQUFpQixDQUFDLGtCQUFrQjtRQUNwQyw4QkFBaUIsQ0FBQyxzQkFBc0I7UUFDeEMsOEJBQWlCLENBQUMsbUJBQW1CO0tBQ3RDO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtJQUNyQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRztRQUFFLE9BQU87SUFDL0IsSUFBQSxzQkFBTSxFQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBQSwyQkFBWSxHQUFFLENBQUM7QUFDZixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztBQUN4QyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDIn0=