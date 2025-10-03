import { createDIToken } from "@fioc/core";
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

export const GetDetailedStudyRankingQueryHandlerToken =
  createDIToken<GetDetailedStudyRankingQueryHandler>().as(
    "GetDetailedStudyRankingQueryHandler"
  );
