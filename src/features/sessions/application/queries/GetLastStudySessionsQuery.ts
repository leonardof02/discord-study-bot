import { createDIToken } from "@fioc/core";
import { IFinishedStudySessionRepository } from "../../domain/interfaces/IFinishedStudySessionRepository";
import * as ArchivedSessionsRepository from "../../infrastructure/persistence/repositories/SequelizeFinishedSessionsRepository";

type GetLastStudySessionsQuery = {
  numberOfSessions: number;
};

export class GetLastStudySessionsQueryHandler {
  constructor(
    private readonly finishedStudySessionsRepository: IFinishedStudySessionRepository
  ) {}

  handle(query: GetLastStudySessionsQuery) {
    const { numberOfSessions } = query;
    return this.finishedStudySessionsRepository.getLast(numberOfSessions);
  }
}

export const GetLastStudySessionsQueryHandlerToken =
  createDIToken<GetLastStudySessionsQueryHandler>().as(
    "GetLastStudySessionsQueryHandler"
  );