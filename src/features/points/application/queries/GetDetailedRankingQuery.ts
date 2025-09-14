import { IFinishedStudySessionRepository } from "../../../sessions/domain/interfaces/IFinishedStudySessionRepository";

type GetDetailedStudyRankingQuery = {};

export class GetDetailedStudyRankingQueryHandler {
  constructor(
    private readonly finishedStudySessionsRepository: IFinishedStudySessionRepository
  ) {}

  handle(command: GetDetailedStudyRankingQuery) {
    return this.finishedStudySessionsRepository.getPointsSumsPerUserWithSubject();
  }
}
