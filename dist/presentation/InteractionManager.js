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
            (0, ChallengeController_1.stopCustomChallenge)(interaction);
            break;
        case ButtonActions_1.default.StartStudySessionWithChallenge:
            (0, StudySessionController_1.acceptSessionWithChallenge)(interaction);
            break;
        case ButtonActions_1.default.StartStudySessionWithoutChallenge:
            (0, StudySessionController_1.acceptSessionWithoutChallenge)(interaction);
            break;
        default:
            break;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3Rpb25NYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ByZXNlbnRhdGlvbi9JbnRlcmFjdGlvbk1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFRQSw4Q0FnQkM7QUF2QkQsMkVBQXdFO0FBQ3hFLDhFQUFzRDtBQUN0RCxpRkFHOEM7QUFFOUMsU0FBZ0IsaUJBQWlCLENBQUMsV0FBOEI7SUFDOUQsOEJBQThCO0lBQzlCLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsRCxRQUFRLE9BQU8sRUFBRSxDQUFDO1FBQ2hCLEtBQUssdUJBQWEsQ0FBQyxlQUFlO1lBQ2hDLElBQUEseUNBQW1CLEVBQUMsV0FBVyxDQUFDLENBQUM7WUFDakMsTUFBTTtRQUNSLEtBQUssdUJBQWEsQ0FBQyw4QkFBOEI7WUFDL0MsSUFBQSxtREFBMEIsRUFBQyxXQUFXLENBQUMsQ0FBQztZQUN4QyxNQUFNO1FBQ1IsS0FBSyx1QkFBYSxDQUFDLGlDQUFpQztZQUNsRCxJQUFBLHNEQUE2QixFQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzNDLE1BQU07UUFDUjtZQUNFLE1BQU07SUFDVixDQUFDO0FBQ0gsQ0FBQyJ9