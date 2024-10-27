"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manage = manage;
const StudySessionController_1 = require("./controllers/StudySessionController");
const HelpController_1 = require("./controllers/HelpController");
const actions = {
    "!ranking": StudySessionController_1.getRanking,
    "!ranking_detallado": StudySessionController_1.getDetailedRanking,
    "!estudiar": StudySessionController_1.startStudySession,
    "!terminar": StudySessionController_1.finishStudySession,
    "!sesiones": StudySessionController_1.getLastSessions,
    "!estudio_general": StudySessionController_1.startGeneralStudySession,
    "!help": HelpController_1.sendHelp,
};
function manage(message) {
    const instructions = message.content.split(" ");
    const command = instructions[0];
    const args = [...instructions.slice(1)];
    if (command == null || !Object.keys(actions).includes(command))
        return;
    actions[command](message, args);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZE1hbmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcmVzZW50YXRpb24vQ29tbWFuZE1hbmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQStCQSx3QkFPQztBQXBDRCxpRkFPOEM7QUFDOUMsaUVBQXdEO0FBV3hELE1BQU0sT0FBTyxHQUFvQjtJQUMvQixVQUFVLEVBQUUsbUNBQVU7SUFDdEIsb0JBQW9CLEVBQUUsMkNBQWtCO0lBQ3hDLFdBQVcsRUFBRSwwQ0FBaUI7SUFDOUIsV0FBVyxFQUFFLDJDQUFrQjtJQUMvQixXQUFXLEVBQUUsd0NBQWU7SUFDNUIsa0JBQWtCLEVBQUUsaURBQXdCO0lBQzVDLE9BQU8sRUFBRSx5QkFBUTtDQUNsQixDQUFDO0FBRUYsU0FBZ0IsTUFBTSxDQUFDLE9BQW9EO0lBQ3pFLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hELE1BQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQVksQ0FBQztJQUMzQyxNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXhDLElBQUksT0FBTyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUFFLE9BQU87SUFDdkUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNsQyxDQUFDIn0=