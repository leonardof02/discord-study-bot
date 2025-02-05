"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manageInteraction = manageInteraction;
const ChallengeController_1 = require("./controllers/ChallengeController");
const ButtonActions_1 = __importDefault(require("./constants/ButtonActions"));
const StudySessionController_1 = require("./controllers/StudySessionController");
function manageInteraction(interaction) {
    // Respond to dynamic commands
    const [command] = interaction.customId.split("@");
    switch (command) {
        case ButtonActions_1.default.DeleteChallenge:
            (0, ChallengeController_1.stopChallenge)(interaction);
            break;
        case ButtonActions_1.default.StartStudySessionWithChallenge:
            (0, StudySessionController_1.acceptSessionWithChallenge)(interaction);
            break;
        case ButtonActions_1.default.StartStudySessionWithoutChallenge:
            (0, StudySessionController_1.acceptSessionWithoutChallenge)(interaction);
            break;
        case ButtonActions_1.default.ConfirmFinishStudySession:
            (0, StudySessionController_1.finishStudySession)(interaction);
            break;
        case ButtonActions_1.default.CancelFinishStudySession:
            (0, StudySessionController_1.cancelFinishStudySession)(interaction);
            break;
        default:
            break;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3Rpb25NYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ByZXNlbnRhdGlvbi9JbnRlcmFjdGlvbk1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFVQSw4Q0F3QkM7QUFqQ0QsMkVBQWtFO0FBQ2xFLDhFQUFzRDtBQUN0RCxpRkFLOEM7QUFFOUMsU0FBZ0IsaUJBQWlCLENBQy9CLFdBQXVEO0lBRXZELDhCQUE4QjtJQUM5QixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEQsUUFBUSxPQUFPLEVBQUUsQ0FBQztRQUNoQixLQUFLLHVCQUFhLENBQUMsZUFBZTtZQUNoQyxJQUFBLG1DQUFhLEVBQUMsV0FBZ0MsQ0FBQyxDQUFDO1lBQ2hELE1BQU07UUFDUixLQUFLLHVCQUFhLENBQUMsOEJBQThCO1lBQy9DLElBQUEsbURBQTBCLEVBQUMsV0FBZ0MsQ0FBQyxDQUFDO1lBQzdELE1BQU07UUFDUixLQUFLLHVCQUFhLENBQUMsaUNBQWlDO1lBQ2xELElBQUEsc0RBQTZCLEVBQUMsV0FBZ0MsQ0FBQyxDQUFDO1lBQ2hFLE1BQU07UUFDUixLQUFLLHVCQUFhLENBQUMseUJBQXlCO1lBQzFDLElBQUEsMkNBQWtCLEVBQUMsV0FBZ0MsQ0FBQyxDQUFDO1lBQ3JELE1BQU07UUFDUixLQUFLLHVCQUFhLENBQUMsd0JBQXdCO1lBQ3pDLElBQUEsaURBQXdCLEVBQUMsV0FBZ0MsQ0FBQyxDQUFDO1lBQzNELE1BQU07UUFDUjtZQUNFLE1BQU07SUFDVixDQUFDO0FBQ0gsQ0FBQyJ9