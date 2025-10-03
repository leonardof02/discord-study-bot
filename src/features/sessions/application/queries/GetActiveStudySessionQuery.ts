import { createDIToken } from "@fioc/core";
import { IActiveStudySessionRepository } from "../../domain/interfaces/IActiveStudySessionRepository";

type GetActiveStudySessionQuery = {
  userId: string;
};

export class GetActiveStudySessionQueryHandler {
  constructor(
    private readonly activeStudySessionsRepository: IActiveStudySessionRepository
  ) {}

  handle(query: GetActiveStudySessionQuery) {
    const { userId } = query;
    const activeSession =
      this.activeStudySessionsRepository.getStudySession(userId);
    if (!activeSession)
      throw new Error(`<@${userId}> no has iniciado ninguna sesión de estudio`);
    return activeSession;
  }
}

export const GetActiveStudySessionQueryHandlerToken =
  createDIToken<GetActiveStudySessionQueryHandler>().as(
    "GetActiveStudySessionQueryHandler"
  );
