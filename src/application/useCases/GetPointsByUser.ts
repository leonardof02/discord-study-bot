import * as ArchivedSessionsRepository from "../../infrastructure/repositories/ArchivedSessionsRepository";

export function GetPointsByUser(userId: string) {
  const pointsBySubject =
    ArchivedSessionsRepository.getPointsSumsWithSubjectFromUser(userId);
  return pointsBySubject;
}
