"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manage = manage;
const StudySessionController_1 = require("./controllers/StudySessionController");
const RankingController_1 = require("./controllers/RankingController");
const HelpController_1 = require("./controllers/HelpController");
const actions = {
    "!ranking": RankingController_1.getRanking,
    "!ranking_detallado": RankingController_1.getDetailedRanking,
    "!estudiar": StudySessionController_1.startStudySession,
    "!terminar": StudySessionController_1.finishStudySession,
    "!sesiones": StudySessionController_1.getLastSessions,
    "!estudio_general": StudySessionController_1.startGeneralStudySession,
    "!help": HelpController_1.sendHelp,
    "!cambiar_asignatura": changeSubjectOfSession,
};
function manage(message) {
    const instructions = message.content.split(" ");
    const command = instructions[0];
    const args = [...instructions.slice(1)];
    if (command == null || !Object.keys(actions).includes(command))
        return;
    actions[command](message, args);
}
function changeSubjectOfSession(message, args) {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZE1hbmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcmVzZW50YXRpb24vQ29tbWFuZE1hbmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQW1DQSx3QkFPQztBQXhDRCxpRkFLOEM7QUFDOUMsdUVBR3lDO0FBQ3pDLGlFQUF3RDtBQVl4RCxNQUFNLE9BQU8sR0FBb0I7SUFDL0IsVUFBVSxFQUFFLDhCQUFVO0lBQ3RCLG9CQUFvQixFQUFFLHNDQUFrQjtJQUN4QyxXQUFXLEVBQUUsMENBQWlCO0lBQzlCLFdBQVcsRUFBRSwyQ0FBa0I7SUFDL0IsV0FBVyxFQUFFLHdDQUFlO0lBQzVCLGtCQUFrQixFQUFFLGlEQUF3QjtJQUM1QyxPQUFPLEVBQUUseUJBQVE7SUFDakIscUJBQXFCLEVBQUUsc0JBQXNCO0NBQzlDLENBQUM7QUFFRixTQUFnQixNQUFNLENBQUMsT0FBb0Q7SUFDekUsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEQsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBWSxDQUFDO0lBQzNDLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFeEMsSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQUUsT0FBTztJQUN2RSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFDRCxTQUFTLHNCQUFzQixDQUM3QixPQUFvRCxFQUNwRCxJQUFjO0lBRWQsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBQy9DLENBQUMifQ==