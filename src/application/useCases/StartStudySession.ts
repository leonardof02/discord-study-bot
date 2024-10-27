import { StudySessionData } from "../../infrastructure/models/ArchivedStudySession";
import * as StudySessionRepository from "../../infrastructure/repositories/StudySessionRepository";

export function StartStudySession(userId: string, subjectName?: string) {
  const studySession: StudySessionData = {
    userId,
    totalTime: 0,
    startTime: Date.now(),
    subjectName: subjectName || "de forma general",
    points: 0,
    humanReadableTotalTime: "0:00:00",
  };

  const existentStudySession = StudySessionRepository.getStudySession(userId);
  if (existentStudySession)
    throw new Error(
      `Lo siento <@${userId}> ya estás estudiando ${existentStudySession.subjectName}`
    );

  StudySessionRepository.addStudySession(studySession);
}
