import { v4 as uuidv4 } from "uuid";
import { StudySession } from "../../domain/entities/StudySession";
import { IActiveChallengeRepository } from "../../domain/interfaces/IActiveChallengeRepository";
import { IActiveStudySessionRepository } from "../../domain/interfaces/IActiveStudySessionRepository";
import { createDIToken } from "@fioc/core";

type StartStudySessionCommand = {
  userId: string;
  subjectId?: string;
  challenge?: Challenge;
};

export class StartStudySessionCommandHandler {
  constructor(
    private readonly activeStudySessionsRepository: IActiveStudySessionRepository,
    private readonly activeChallengeRepository: IActiveChallengeRepository
  ) {}

  handle(command: StartStudySessionCommand) {
    const { userId, subjectId: subjectName, challenge } = command;
    const studySession = new StudySession({
      id: uuidv4(),
      userId,
      startTime: Date.now(),
      subjectId: subjectName,
      challenge,
    });

    const existentStudySession =
      this.activeStudySessionsRepository.getStudySession(userId);

    if (existentStudySession)
      throw new Error(
        `<@${userId}> Ya estás estudiando ${existentStudySession.subjectId}, si quieres parar de estudiar prueba con !terminar`
      );

    if (studySession.challenge) {
      studySession.challenge.isActive = true;
      this.activeChallengeRepository.saveActiveChallenge(
        userId,
        studySession.challenge
      );
    }

    studySession.start();
    this.activeStudySessionsRepository.saveSession(userId, studySession);
  }
}

export const StartStudySessionCommandHandlerToken =
  createDIToken<StartStudySessionCommandHandler>().as(
    "StartStudySessionCommandHandler"
  );
