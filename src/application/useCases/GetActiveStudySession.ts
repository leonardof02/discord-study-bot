import * as StudySessionRepository from "../../infrastructure/repositories/StudySessionRepository";

export default function GetActiveStudySession(userId: string) {
  const activeSession = StudySessionRepository.getStudySession(userId);
  return activeSession;
}
