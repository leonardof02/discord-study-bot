"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manage = manage;
const StudySessionManager_1 = require("./presentation/services/StudySessionManager");
const HelpService_1 = require("./presentation/services/HelpService");
const actions = {
    "!ranking": StudySessionManager_1.getRanking,
    "!estudiar": StudySessionManager_1.startStudySession,
    "!terminar": StudySessionManager_1.endStudySession,
    "!sesiones": StudySessionManager_1.getLastSessions,
    "!estudio_general": StudySessionManager_1.startGeneralStudySession,
    "!help": HelpService_1.sendHelp,
};
function manage(message) {
    const instructions = message.content.split(" ");
    const command = instructions[0];
    const args = [...instructions.slice(1)];
    if (command == null || !Object.keys(actions).includes(command))
        return;
    actions[command](message, args);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZE1hbmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Db21tYW5kTWFuYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBNEJBLHdCQU9DO0FBakNELHFGQU1xRDtBQUNyRCxxRUFBK0Q7QUFVL0QsTUFBTSxPQUFPLEdBQW9CO0lBQy9CLFVBQVUsRUFBRSxnQ0FBVTtJQUN0QixXQUFXLEVBQUUsdUNBQWlCO0lBQzlCLFdBQVcsRUFBRSxxQ0FBZTtJQUM1QixXQUFXLEVBQUUscUNBQWU7SUFDNUIsa0JBQWtCLEVBQUUsOENBQXdCO0lBQzVDLE9BQU8sRUFBRSxzQkFBUTtDQUNsQixDQUFDO0FBRUYsU0FBZ0IsTUFBTSxDQUFDLE9BQW9EO0lBQ3pFLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hELE1BQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQVksQ0FBQztJQUMzQyxNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXhDLElBQUksT0FBTyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUFFLE9BQU87SUFDdkUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNsQyxDQUFDIn0=