"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomChallenge = createCustomChallenge;
const TimeUtils_1 = require("../utils/TimeUtils");
function createCustomChallenge(message, args) {
    const userId = message.author.id;
    if (!args[0]) {
        message.channel.send(`No se han especificado suficientes datos de tiempo del reto`);
        return;
    }
    const timeString = args.join(" ");
    const timeInSeconds = (0, TimeUtils_1.parseTimeStringToSeconds)(timeString);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhbGxlbmdlc0NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJlc2VudGF0aW9uL2NvbnRyb2xsZXJzL0NoYWxsZW5nZXNDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0Esc0RBaUJDO0FBbkJELGtEQUE4RDtBQUU5RCxTQUFnQixxQkFBcUIsQ0FDbkMsT0FBb0QsRUFDcEQsSUFBYztJQUVkLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0lBRWpDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNiLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNsQiw2REFBNkQsQ0FDOUQsQ0FBQztRQUNGLE9BQU87SUFDVCxDQUFDO0lBRUQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQyxNQUFNLGFBQWEsR0FBRyxJQUFBLG9DQUF3QixFQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRzdELENBQUMifQ==