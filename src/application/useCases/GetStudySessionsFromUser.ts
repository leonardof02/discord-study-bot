import * as ArchivedStudySessionRepository from "../../infrastructure/repositories/ArchivedSessionsRepository";

export async function GetStudySessionsFromUser(userId: string) {
  const studySessions = await ArchivedStudySessionRepository.getStudySessionsFromUser(
    userId
  );
  return studySessions;
}
