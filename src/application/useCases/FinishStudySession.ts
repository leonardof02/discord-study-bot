import { StudySessionData } from "../../domain/StudySessionData";

import * as StudySessionRepository from "../../infrastructure/repositories/StudySessionRepository";
import * as ArchivedSessionsRepository from "../../infrastructure/repositories/ArchivedSessionsRepository";
import * as ChallengeRepository from "../../infrastructure/repositories/ChallengeRepository";

import { msToTime } from "../utils/TimeUtils";

export async function FinishStudySession(
  userId: string
): Promise<StudySessionData> {
  const existentStudySession = StudySessionRepository.getStudySession(userId);

  if (!existentStudySession) {
    throw new Error(`<@${userId}> no has iniciado ninguna sesión de estudio`);
  }

  const totalTime = Date.now() - existentStudySession.startTime;
  const finishedStudySessionData: StudySessionData = {
    totalTime,
    subjectName: existentStudySession.subjectName,
    startTime: existentStudySession.startTime,
    points: calculatePoints(
      existentStudySession.startTime,
      existentStudySession.challenge
    ),
    humanReadableTotalTime: msToTime(totalTime),
    challenge: existentStudySession.challenge,
    userId,
  };

  const sessionId = await ArchivedSessionsRepository.archiveStudySession(
    finishedStudySessionData
  );
  StudySessionRepository.removeStudySession(userId);
  ChallengeRepository.removeChallenge(userId);
  return { ...finishedStudySessionData, id: sessionId };
}

function calculatePoints(startTime: number, challenge?: Challenge) {
  const passedTime = Date.now() - startTime;
  if (challenge && passedTime < challenge?.time * 1000) return 0;
  const pointsGained = Math.round((passedTime / (1000 * 60)) * 100) / 100;
  const challengePoints = challenge?.isActive ? pointsGained * 0.1 : 0;
  return Number.parseFloat((challengePoints + pointsGained).toFixed(2));
}