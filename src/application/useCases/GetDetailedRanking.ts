import * as ArchivedSessionsRepository from "../../infrastructure/repositories/ArchivedSessionsRepository";

export async function GetDetailedStudyRanking() {
  const result =
    await ArchivedSessionsRepository.getPointsSumsPerUserWithSubject();
  return result;
}
