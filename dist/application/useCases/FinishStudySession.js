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
        const points = calculatePoints(existentStudySession.startTime, existentStudySession.challenge);
        const challengeCompleted = isChallengeCompleted(existentStudySession.startTime, existentStudySession.challenge);
        const finishedStudySessionData = {
            totalTime,
            subjectName: existentStudySession.subjectName,
            startTime: existentStudySession.startTime,
            points,
            challengeCompleted,
            humanReadableTotalTime: (0, TimeUtils_1.msToTime)(totalTime),
            challenge: existentStudySession.challenge,
            userId,
        };
        if (challengeCompleted) {
            ChallengeRepository.removeChallenge(userId);
        }
        const sessionId = yield ArchivedSessionsRepository.archiveStudySession(finishedStudySessionData);
        StudySessionRepository.removeStudySession(userId);
        return Object.assign(Object.assign({}, finishedStudySessionData), { id: sessionId });
    });
}
function isChallengeCompleted(startTime, challenge) {
    if (!challenge)
        return false;
    return Date.now() - startTime > (challenge === null || challenge === void 0 ? void 0 : challenge.time) * 1000;
}
function calculatePoints(startTime, challenge) {
    const passedTime = Date.now() - startTime;
    const pointsGained = Math.round((passedTime / (1000 * 60)) * 100) / 100;
    if (!isChallengeCompleted(startTime, challenge))
        return pointsGained;
    const challengePoints = (challenge === null || challenge === void 0 ? void 0 : challenge.isActive) ? pointsGained * 0.1 : 0;
    return (challenge === null || challenge === void 0 ? void 0 : challenge.isRandom)
        ? Number.parseFloat((pointsGained * 2).toFixed(2))
        : Number.parseFloat((pointsGained + challengePoints).toFixed(2));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmluaXNoU3R1ZHlTZXNzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcGxpY2F0aW9uL3VzZUNhc2VzL0ZpbmlzaFN0dWR5U2Vzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUUEsZ0RBeUNDO0FBL0NELGlIQUFtRztBQUNuRyx5SEFBMkc7QUFDM0csMkdBQTZGO0FBRTdGLGtEQUE4QztBQUU5QyxTQUFzQixrQkFBa0IsQ0FDdEMsTUFBYzs7UUFHZCxNQUFNLG9CQUFvQixHQUFHLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU1RSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLEtBQUssTUFBTSw2Q0FBNkMsQ0FBQyxDQUFDO1FBQzVFLENBQUM7UUFFRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsb0JBQW9CLENBQUMsU0FBUyxDQUFDO1FBRTlELE1BQU0sTUFBTSxHQUFHLGVBQWUsQ0FDNUIsb0JBQW9CLENBQUMsU0FBUyxFQUM5QixvQkFBb0IsQ0FBQyxTQUFTLENBQy9CLENBQUM7UUFFRixNQUFNLGtCQUFrQixHQUFHLG9CQUFvQixDQUM3QyxvQkFBb0IsQ0FBQyxTQUFTLEVBQzlCLG9CQUFvQixDQUFDLFNBQVMsQ0FDL0IsQ0FBQztRQUVGLE1BQU0sd0JBQXdCLEdBQXFCO1lBQ2pELFNBQVM7WUFDVCxXQUFXLEVBQUUsb0JBQW9CLENBQUMsV0FBVztZQUM3QyxTQUFTLEVBQUUsb0JBQW9CLENBQUMsU0FBUztZQUN6QyxNQUFNO1lBQ04sa0JBQWtCO1lBQ2xCLHNCQUFzQixFQUFFLElBQUEsb0JBQVEsRUFBQyxTQUFTLENBQUM7WUFDM0MsU0FBUyxFQUFFLG9CQUFvQixDQUFDLFNBQVM7WUFDekMsTUFBTTtTQUNQLENBQUM7UUFFRixJQUFJLGtCQUFrQixFQUFFLENBQUM7WUFDdkIsbUJBQW1CLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFDRCxNQUFNLFNBQVMsR0FBRyxNQUFNLDBCQUEwQixDQUFDLG1CQUFtQixDQUNwRSx3QkFBd0IsQ0FDekIsQ0FBQztRQUNGLHNCQUFzQixDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELHVDQUFZLHdCQUF3QixLQUFFLEVBQUUsRUFBRSxTQUFTLElBQUc7SUFDeEQsQ0FBQztDQUFBO0FBRUQsU0FBUyxvQkFBb0IsQ0FBQyxTQUFpQixFQUFFLFNBQXFCO0lBQ3BFLElBQUksQ0FBQyxTQUFTO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDN0IsT0FBTyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUyxHQUFHLENBQUEsU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLElBQUksSUFBRyxJQUFJLENBQUM7QUFDekQsQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLFNBQWlCLEVBQUUsU0FBcUI7SUFFL0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQztJQUMxQyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBRXhFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDO1FBQUUsT0FBTyxZQUFZLENBQUM7SUFFckUsTUFBTSxlQUFlLEdBQUcsQ0FBQSxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckUsT0FBTyxDQUFBLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxRQUFRO1FBQ3hCLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVksR0FBRyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyRSxDQUFDIn0=