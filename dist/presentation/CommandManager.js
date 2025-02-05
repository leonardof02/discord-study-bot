"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manage = manage;
const StudySessionController_1 = require("./controllers/StudySessionController");
const RankingController_1 = require("./controllers/RankingController");
const HelpController_1 = require("./controllers/HelpController");
const ChallengeController_1 = require("./controllers/ChallengeController");
const UserInfoController_1 = require("./controllers/UserInfoController");
const actions = {
    "!ranking": RankingController_1.getRanking,
    "!ranking_detallado": RankingController_1.getDetailedRanking,
    "!estudiar": StudySessionController_1.startStudySession,
    "!terminar": StudySessionController_1.confirmFinishStudySession,
    "!sesiones": StudySessionController_1.getLastSessions,
    "!estudio_general": StudySessionController_1.startGeneralStudySession,
    "!help": HelpController_1.sendHelp,
    "!cambiar_asignatura": StudySessionController_1.changeSubjectOfSession,
    "!reto_personalizado": ChallengeController_1.createCustomChallenge,
    "!reto": ChallengeController_1.createRandomChallenge,
    "!info": UserInfoController_1.getUserInfo,
    "!borrar_reto": ChallengeController_1.deleteChallenge,
};
function manage(message) {
    const instructions = message.content.split(" ");
    const command = instructions[0];
    const args = [...instructions.slice(1)];
    if (command == null || !Object.keys(actions).includes(command))
        return;
    actions[command](message, args);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZE1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJlc2VudGF0aW9uL0NvbW1hbmRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBc0NBLHdCQU9DO0FBM0NELGlGQU84QztBQUM5Qyx1RUFHeUM7QUFDekMsaUVBQXdEO0FBQ3hELDJFQUkyQztBQUUzQyx5RUFBK0Q7QUFFL0QsTUFBTSxPQUFPLEdBQW9CO0lBQy9CLFVBQVUsRUFBRSw4QkFBVTtJQUN0QixvQkFBb0IsRUFBRSxzQ0FBa0I7SUFDeEMsV0FBVyxFQUFFLDBDQUFpQjtJQUM5QixXQUFXLEVBQUUsa0RBQXlCO0lBQ3RDLFdBQVcsRUFBRSx3Q0FBZTtJQUM1QixrQkFBa0IsRUFBRSxpREFBd0I7SUFDNUMsT0FBTyxFQUFFLHlCQUFRO0lBQ2pCLHFCQUFxQixFQUFFLCtDQUFzQjtJQUM3QyxxQkFBcUIsRUFBRSwyQ0FBcUI7SUFDNUMsT0FBTyxFQUFFLDJDQUFxQjtJQUM5QixPQUFPLEVBQUUsZ0NBQVc7SUFDcEIsY0FBYyxFQUFFLHFDQUFlO0NBQ2hDLENBQUM7QUFFRixTQUFnQixNQUFNLENBQUMsT0FBb0Q7SUFDekUsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEQsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBWSxDQUFDO0lBQzNDLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFeEMsSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQUUsT0FBTztJQUN2RSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2xDLENBQUMifQ==