import * as StudySessionRepository from "../../infrastructure/repositories/StudySessionRepository";

export async function ChangeSessionSubject(
  userId: string,
  newSubjectName: string
) {
  const session = StudySessionRepository.getStudySession(userId);
  if (!session) throw new Error(`<@${userId}> no ha comenzado a estudiar`);
  session.subjectName = newSubjectName;
  StudySessionRepository.setStudySession(userId, session);
}
