import * as StudySessionRepository from "../../infrastructure/repositories/StudySessionRepository";
import * as ArchivedSessionsRepository from "../../infrastructure/repositories/ArchivedSessionsRepository";
import { StudySessionData } from "../../domain/StudySessionData";

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
    points: parseInt(
      (
        Math.round(
          ((Date.now() - existentStudySession.startTime) / (1000 * 60)) * 100
        ) / 100
      ).toFixed(2)
    ),
    humanReadableTotalTime: msToTime(totalTime),
    userId,
  };

  ArchivedSessionsRepository.archiveStudySession(finishedStudySessionData);
  StudySessionRepository.removeStudySession(userId);
  return finishedStudySessionData;
}
