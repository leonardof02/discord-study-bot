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
const StudySessionRepository = __importStar(require("../infrastructure/repositories/StudySessionRepository"));
function StartStudySession(userId, subjectName) {
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
    StudySessionRepository.addStudySession(studySession);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhcnRTdHVkeVNlc3Npb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwbGljYXRpb24vU3RhcnRTdHVkeVNlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLDhDQWlCQztBQW5CRCw4R0FBZ0c7QUFFaEcsU0FBZ0IsaUJBQWlCLENBQUMsTUFBYyxFQUFFLFdBQW9CO0lBQ3BFLE1BQU0sWUFBWSxHQUFxQjtRQUNyQyxNQUFNO1FBQ04sU0FBUyxFQUFFLENBQUM7UUFDWixTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNyQixXQUFXLEVBQUUsV0FBVyxJQUFJLGtCQUFrQjtRQUM5QyxNQUFNLEVBQUUsQ0FBQztRQUNULHNCQUFzQixFQUFFLFNBQVM7S0FDbEMsQ0FBQztJQUVGLE1BQU0sb0JBQW9CLEdBQUcsc0JBQXNCLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVFLElBQUksb0JBQW9CO1FBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQ2IsZUFBZSxNQUFNLHlCQUF5QixvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FDakYsQ0FBQztJQUVKLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN2RCxDQUFDIn0=