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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhcnRTdHVkeVNlc3Npb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwbGljYXRpb24vdXNlQ2FzZXMvU3RhcnRTdHVkeVNlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLDhDQTBCQztBQTdCRCxpSEFBbUc7QUFDbkcsMkdBQTZGO0FBRTdGLFNBQWdCLGlCQUFpQixDQUMvQixNQUFjLEVBQ2QsV0FBb0IsRUFDcEIsZUFBMkI7SUFFM0IsTUFBTSxZQUFZLEdBQXFCO1FBQ3JDLE1BQU07UUFDTixTQUFTLEVBQUUsQ0FBQztRQUNaLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ3JCLFdBQVcsRUFBRSxXQUFXLElBQUksa0JBQWtCO1FBQzlDLE1BQU0sRUFBRSxDQUFDO1FBQ1Qsc0JBQXNCLEVBQUUsU0FBUztLQUNsQyxDQUFDO0lBRUYsTUFBTSxvQkFBb0IsR0FBRyxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUUsSUFBSSxvQkFBb0I7UUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FDYixlQUFlLE1BQU0seUJBQXlCLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUNqRixDQUFDO0lBRUosSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUNwQixlQUFlLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ3hFLENBQUMifQ==