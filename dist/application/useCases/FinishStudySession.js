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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmluaXNoU3R1ZHlTZXNzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcGxpY2F0aW9uL3VzZUNhc2VzL0ZpbmlzaFN0dWR5U2Vzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFBLGdEQXFDQztBQTNDRCxpSEFBbUc7QUFDbkcseUhBQTJHO0FBQzNHLDJHQUE2RjtBQUU3RixrREFBOEM7QUFFOUMsU0FBc0Isa0JBQWtCLENBQ3RDLE1BQWM7O1FBRWQsTUFBTSxvQkFBb0IsR0FBRyxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFNUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLE1BQU0sNkNBQTZDLENBQUMsQ0FBQztRQUM1RSxDQUFDO1FBRUQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLG9CQUFvQixDQUFDLFNBQVMsQ0FBQztRQUM5RCxNQUFNLE1BQU0sR0FBRyxlQUFlLENBQzVCLG9CQUFvQixDQUFDLFNBQVMsRUFDOUIsb0JBQW9CLENBQUMsU0FBUyxDQUMvQixDQUFDO1FBQ0YsTUFBTSxrQkFBa0IsR0FBRyxvQkFBb0IsQ0FDN0Msb0JBQW9CLENBQUMsU0FBUyxFQUM5QixvQkFBb0IsQ0FBQyxTQUFTLENBQy9CLENBQUM7UUFDRixNQUFNLHdCQUF3QixHQUFxQjtZQUNqRCxTQUFTO1lBQ1QsV0FBVyxFQUFFLG9CQUFvQixDQUFDLFdBQVc7WUFDN0MsU0FBUyxFQUFFLG9CQUFvQixDQUFDLFNBQVM7WUFDekMsTUFBTTtZQUNOLGtCQUFrQjtZQUNsQixzQkFBc0IsRUFBRSxJQUFBLG9CQUFRLEVBQUMsU0FBUyxDQUFDO1lBQzNDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQyxTQUFTO1lBQ3pDLE1BQU07U0FDUCxDQUFDO1FBRUYsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1lBQ3ZCLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBQ0QsTUFBTSxTQUFTLEdBQUcsTUFBTSwwQkFBMEIsQ0FBQyxtQkFBbUIsQ0FDcEUsd0JBQXdCLENBQ3pCLENBQUM7UUFDRixzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRCx1Q0FBWSx3QkFBd0IsS0FBRSxFQUFFLEVBQUUsU0FBUyxJQUFHO0lBQ3hELENBQUM7Q0FBQTtBQUVELFNBQVMsb0JBQW9CLENBQUMsU0FBaUIsRUFBRSxTQUFxQjtJQUNwRSxJQUFJLENBQUMsU0FBUztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzdCLE9BQU8sSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVMsR0FBRyxDQUFBLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxJQUFJLElBQUcsSUFBSSxDQUFDO0FBQ3pELENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxTQUFpQixFQUFFLFNBQXFCO0lBQy9ELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUM7SUFDMUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUV4RSxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQztRQUFFLE9BQU8sWUFBWSxDQUFDO0lBRXJFLE1BQU0sZUFBZSxHQUFHLENBQUEsU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLFFBQVEsRUFBQyxDQUFDLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLE9BQU8sQ0FBQSxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsUUFBUTtRQUN4QixDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckUsQ0FBQyJ9