"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manage = manage;
const StudySessionController_1 = require("./controllers/StudySessionController");
const RankingController_1 = require("./controllers/RankingController");
const HelpController_1 = require("./controllers/HelpController");
const ChallengeController_1 = require("./controllers/ChallengeController");
const actions = {
    "!ranking": RankingController_1.getRanking,
    "!ranking_detallado": RankingController_1.getDetailedRanking,
    "!estudiar": StudySessionController_1.startStudySession,
    "!terminar": StudySessionController_1.finishStudySession,
    "!sesiones": StudySessionController_1.getLastSessions,
    "!estudio_general": StudySessionController_1.startGeneralStudySession,
    "!help": HelpController_1.sendHelp,
    "!cambiar_asignatura": StudySessionController_1.changeSubjectOfSession,
    "!reto_personalizado": ChallengeController_1.createCustomChallenge,
};
function manage(message) {
    const instructions = message.content.split(" ");
    const command = instructions[0];
    const args = [...instructions.slice(1)];
    if (command == null || !Object.keys(actions).includes(command))
        return;
    actions[command](message, args);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZE1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJlc2VudGF0aW9uL0NvbW1hbmRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBNkJBLHdCQU9DO0FBbENELGlGQU04QztBQUM5Qyx1RUFHeUM7QUFDekMsaUVBQXdEO0FBQ3hELDJFQUEwRTtBQUcxRSxNQUFNLE9BQU8sR0FBb0I7SUFDL0IsVUFBVSxFQUFFLDhCQUFVO0lBQ3RCLG9CQUFvQixFQUFFLHNDQUFrQjtJQUN4QyxXQUFXLEVBQUUsMENBQWlCO0lBQzlCLFdBQVcsRUFBRSwyQ0FBa0I7SUFDL0IsV0FBVyxFQUFFLHdDQUFlO0lBQzVCLGtCQUFrQixFQUFFLGlEQUF3QjtJQUM1QyxPQUFPLEVBQUUseUJBQVE7SUFDakIscUJBQXFCLEVBQUUsK0NBQXNCO0lBQzdDLHFCQUFxQixFQUFFLDJDQUFxQjtDQUM3QyxDQUFDO0FBRUYsU0FBZ0IsTUFBTSxDQUFDLE9BQW9EO0lBQ3pFLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hELE1BQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQVksQ0FBQztJQUMzQyxNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXhDLElBQUksT0FBTyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUFFLE9BQU87SUFDdkUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNsQyxDQUFDIn0=