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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartStudySession = StartStudySession;
const StudySessionRepository = __importStar(require("../../infrastructure/repositories/StudySessionRepository"));
const ChallengeRepository = __importStar(require("../../infrastructure/repositories/ChallengeRepository"));
function StartStudySession(userId, subjectName, activeChallenge) {
    const studySession = {
        userId,
        totalTime: 0,
        startTime: Date.now(),
        subjectName: subjectName || "de forma general",
        points: 0,
        humanReadableTotalTime: "0:00:00",
        challengeCompleted: false,
    };
    const existentStudySession = StudySessionRepository.getStudySession(userId);
    if (existentStudySession)
        throw new Error(`Lo siento <@${userId}> ya estás estudiando ${existentStudySession.subjectName}`);
    if (activeChallenge) {
        activeChallenge.isActive = true;
        ChallengeRepository.setChallenge(userId, activeChallenge);
    }
    StudySessionRepository.addStudySession(studySession, activeChallenge);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhcnRTdHVkeVNlc3Npb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwbGljYXRpb24vdXNlQ2FzZXMvU3RhcnRTdHVkeVNlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSw4Q0EyQkM7QUE5QkQsaUhBQW1HO0FBQ25HLDJHQUE2RjtBQUU3RixTQUFnQixpQkFBaUIsQ0FDL0IsTUFBYyxFQUNkLFdBQW9CLEVBQ3BCLGVBQTJCO0lBRTNCLE1BQU0sWUFBWSxHQUFxQjtRQUNyQyxNQUFNO1FBQ04sU0FBUyxFQUFFLENBQUM7UUFDWixTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNyQixXQUFXLEVBQUUsV0FBVyxJQUFJLGtCQUFrQjtRQUM5QyxNQUFNLEVBQUUsQ0FBQztRQUNULHNCQUFzQixFQUFFLFNBQVM7UUFDakMsa0JBQWtCLEVBQUUsS0FBSztLQUMxQixDQUFDO0lBRUYsTUFBTSxvQkFBb0IsR0FBRyxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUUsSUFBSSxvQkFBb0I7UUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FDYixlQUFlLE1BQU0seUJBQXlCLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUNqRixDQUFDO0lBRUosSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUNwQixlQUFlLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ3hFLENBQUMifQ==