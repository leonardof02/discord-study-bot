import { createDIToken } from "@fioc/core";
import { IActiveStudySessionRepository } from "../../domain/interfaces/IActiveStudySessionRepository";

type ChangeSessionSubjectCommand = {
  userId: string;
  newSubjectId: string;
};

export class ChangeSessionSubjectCommandHandler {
  private readonly activeStudySessionsRepository: IActiveStudySessionRepository;

  constructor(activeStudySessionsRepository: IActiveStudySessionRepository) {
    this.activeStudySessionsRepository = activeStudySessionsRepository;
  }

  handle(command: ChangeSessionSubjectCommand) {
    const { userId, newSubjectId } = command;
    const session = this.activeStudySessionsRepository.getStudySession(userId);
    if (!session) throw new Error(`<@${userId}> no ha comenzado a estudiar`);
    session.changeSubject(newSubjectId);
    this.activeStudySessionsRepository.saveSession(userId, session);
  }
}

export const ChangeSessionSubjectCommandHandlerToken =
  createDIToken<ChangeSessionSubjectCommandHandler>().as(
    "ChangeSessionSubjectCommandHandler"
  );
