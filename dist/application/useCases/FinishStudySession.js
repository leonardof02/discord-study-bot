"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinishStudySession = FinishStudySession;
const StudySessionRepository = __importStar(require("../../infrastructure/repositories/StudySessionRepository"));
const ArchivedSessionsRepository = __importStar(require("../../infrastructure/repositories/ArchivedSessionsRepository"));
const ChallengeRepository = __importStar(require("../../infrastructure/repositories/ChallengeRepository"));
const TimeUtils_1 = require("../utils/TimeUtils");
function FinishStudySession(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existentStudySession = StudySessionRepository.getStudySession(userId);
        if (!existentStudySession) {
            throw new Error(`<@${userId}> no has iniciado ninguna sesión de estudio`);
        }
        const totalTime = Date.now() - existentStudySession.startTime;
        const finishedStudySessionData = {
            totalTime,
            subjectName: existentStudySession.subjectName,
            startTime: existentStudySession.startTime,
            points: calculatePoints(existentStudySession.startTime, existentStudySession.challenge),
            humanReadableTotalTime: (0, TimeUtils_1.msToTime)(totalTime),
            challenge: existentStudySession.challenge,
            userId,
        };
        const sessionId = yield ArchivedSessionsRepository.archiveStudySession(finishedStudySessionData);
        StudySessionRepository.removeStudySession(userId);
        ChallengeRepository.removeChallenge(userId);
        return Object.assign(Object.assign({}, finishedStudySessionData), { id: sessionId });
    });
}
function calculatePoints(startTime, challenge) {
    const passedTime = Date.now() - startTime;
    if (challenge && passedTime < (challenge === null || challenge === void 0 ? void 0 : challenge.time) * 1000)
        return 0;
    const pointsGained = Math.round((passedTime / (1000 * 60)) * 100) / 100;
    const challengePoints = (challenge === null || challenge === void 0 ? void 0 : challenge.isActive) ? pointsGained * 0.1 : 0;
    return Number.parseFloat((challengePoints + pointsGained).toFixed(2));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmluaXNoU3R1ZHlTZXNzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcGxpY2F0aW9uL3VzZUNhc2VzL0ZpbmlzaFN0dWR5U2Vzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUUEsZ0RBNkJDO0FBbkNELGlIQUFtRztBQUNuRyx5SEFBMkc7QUFDM0csMkdBQTZGO0FBRTdGLGtEQUE4QztBQUU5QyxTQUFzQixrQkFBa0IsQ0FDdEMsTUFBYzs7UUFFZCxNQUFNLG9CQUFvQixHQUFHLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU1RSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLEtBQUssTUFBTSw2Q0FBNkMsQ0FBQyxDQUFDO1FBQzVFLENBQUM7UUFFRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsb0JBQW9CLENBQUMsU0FBUyxDQUFDO1FBQzlELE1BQU0sd0JBQXdCLEdBQXFCO1lBQ2pELFNBQVM7WUFDVCxXQUFXLEVBQUUsb0JBQW9CLENBQUMsV0FBVztZQUM3QyxTQUFTLEVBQUUsb0JBQW9CLENBQUMsU0FBUztZQUN6QyxNQUFNLEVBQUUsZUFBZSxDQUNyQixvQkFBb0IsQ0FBQyxTQUFTLEVBQzlCLG9CQUFvQixDQUFDLFNBQVMsQ0FDL0I7WUFDRCxzQkFBc0IsRUFBRSxJQUFBLG9CQUFRLEVBQUMsU0FBUyxDQUFDO1lBQzNDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQyxTQUFTO1lBQ3pDLE1BQU07U0FDUCxDQUFDO1FBRUYsTUFBTSxTQUFTLEdBQUcsTUFBTSwwQkFBMEIsQ0FBQyxtQkFBbUIsQ0FDcEUsd0JBQXdCLENBQ3pCLENBQUM7UUFDRixzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRCxtQkFBbUIsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsdUNBQVksd0JBQXdCLEtBQUUsRUFBRSxFQUFFLFNBQVMsSUFBRztJQUN4RCxDQUFDO0NBQUE7QUFFRCxTQUFTLGVBQWUsQ0FBQyxTQUFpQixFQUFFLFNBQXFCO0lBQy9ELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUM7SUFDMUMsSUFBSSxTQUFTLElBQUksVUFBVSxHQUFHLENBQUEsU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLElBQUksSUFBRyxJQUFJO1FBQUUsT0FBTyxDQUFDLENBQUM7SUFDL0QsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUN4RSxNQUFNLGVBQWUsR0FBRyxDQUFBLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRSxPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxlQUFlLEdBQUcsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEUsQ0FBQyJ9