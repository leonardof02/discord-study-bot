import { StudySessionData } from "../../infrastructure/models/ArchivedStudySession";
import * as StudySessionRepository from "../../infrastructure/repositories/StudySessionRepository";
import * as ChallengeRepository from "../../infrastructure/repositories/ChallengeRepository";

export function StartStudySession(
  userId: string,
  subjectName?: string,
  activeChallenge?: Challenge
) {
  
  const studySession: StudySessionData = {
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
    throw new Error(
      `Lo siento <@${userId}> ya estás estudiando ${existentStudySession.subjectName}`
    );

  if (activeChallenge) {
    activeChallenge.isActive = true;
    ChallengeRepository.setChallenge(userId, activeChallenge);
  }

  StudySessionRepository.addStudySession(studySession, activeChallenge);
}
