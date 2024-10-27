import * as ArchivedSessionsRepository from "../../infrastructure/repositories/ArchivedSessionsRepository";

export async function GetStudyRankingByUser() {
  const result = await ArchivedSessionsRepository.getPointsSumsPerUser();
  return result;
}

export async function GetDetailedStudyRanking() {
  const result =
    await ArchivedSessionsRepository.getPointsSumsPerUserWithSubject();
  return result;
}
