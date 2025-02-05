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
  
  const points = calculatePoints(
    existentStudySession.startTime,
    existentStudySession.challenge
  );

  const challengeCompleted = isChallengeCompleted(
    existentStudySession.startTime,
    existentStudySession.challenge
  );

  const finishedStudySessionData: StudySessionData = {
    totalTime,
    subjectName: existentStudySession.subjectName,
    startTime: existentStudySession.startTime,
    points,
    challengeCompleted,
    humanReadableTotalTime: msToTime(totalTime),
    challenge: existentStudySession.challenge,
    userId,
  };

  if (challengeCompleted) {
    ChallengeRepository.removeChallenge(userId);
  }
  const sessionId = await ArchivedSessionsRepository.archiveStudySession(
    finishedStudySessionData
  );
  StudySessionRepository.removeStudySession(userId);
  return { ...finishedStudySessionData, id: sessionId };
}

function isChallengeCompleted(startTime: number, challenge?: Challenge) {
  if (!challenge) return false;
  return Date.now() - startTime > challenge?.time * 1000;
}

function calculatePoints(startTime: number, challenge?: Challenge) {
  
  const passedTime = Date.now() - startTime;
  const pointsGained = Math.round((passedTime / (1000 * 60)) * 100) / 100;

  if (!isChallengeCompleted(startTime, challenge)) return pointsGained;

  const challengePoints = challenge?.isActive ? pointsGained * 0.1 : 0;
  return challenge?.isRandom
    ? Number.parseFloat((pointsGained * 2).toFixed(2))
    : Number.parseFloat((pointsGained + challengePoints).toFixed(2));
}
