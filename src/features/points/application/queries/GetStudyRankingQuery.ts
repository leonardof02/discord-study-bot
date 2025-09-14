import { IFinishedStudySessionRepository } from "../../../sessions/domain/interfaces/IFinishedStudySessionRepository";

type GetStudyRankingQuery = {};

export class GetStudyRankingQueryHandler {
  constructor(
    private readonly finishedStudySessionsRepository: IFinishedStudySessionRepository
  ) {}

  handle(command: GetStudyRankingQuery) {
    return this.finishedStudySessionsRepository.getPointsSumsPerUser();
  }
}
