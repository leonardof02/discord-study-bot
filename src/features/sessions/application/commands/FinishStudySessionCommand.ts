import { createDIToken } from "@fioc/core";
import { IActiveChallengeRepository } from "../../domain/interfaces/IActiveChallengeRepository";
import { IActiveStudySessionRepository } from "../../domain/interfaces/IActiveStudySessionRepository";
import { IFinishedStudySessionRepository } from "../../domain/interfaces/IFinishedStudySessionRepository";
import { ISubjectRepository } from "../../../subjects/domain/ISubjectRepository";

type FinishStudySessionCommand = {
  userId: string;
};

type FinishedStudySessionData = {
  userId: string;
  subjectName?: string;
  challenge?: Challenge;
  isChallengeCompleted: boolean;
  totalTime: number;
  points: number;
  sessionId: string;
};

export class FinishStudySessionCommandHandler {
  constructor(
    private readonly activeStudySessionsRepository: IActiveStudySessionRepository,
    private readonly finishedStudySessionsRepository: IFinishedStudySessionRepository,
    private readonly activeChallengeRepository: IActiveChallengeRepository,
    private readonly subjectRepository: ISubjectRepository
  ) {}

  async handle(
    command: FinishStudySessionCommand
  ): Promise<FinishedStudySessionData> {
    const { userId } = command;

    const existentStudySession =
      this.activeStudySessionsRepository.getStudySession(userId);

    if (!existentStudySession) {
      throw new Error(`<@${userId}> no has iniciado ninguna sesión de estudio`);
    }

    existentStudySession.finish();
    if (existentStudySession.isChallengeCompleted)
      this.activeChallengeRepository.removeActiveChallenge(userId);

    this.activeStudySessionsRepository.removeStudySession(userId);
    await this.finishedStudySessionsRepository.archiveSession(
      existentStudySession
    );

    const subject = existentStudySession.subjectId
      ? await this.subjectRepository.getSubjectById(
          existentStudySession.subjectId
        )
      : null;
    const subjectName = subject ? subject.name : undefined;

    const finishedStudySessionData: FinishedStudySessionData = {
      userId,
      subjectName,
      totalTime: existentStudySession.totalTime!,
      points: existentStudySession.points,
      challenge: existentStudySession.challenge,
      isChallengeCompleted: existentStudySession.isChallengeCompleted,
      sessionId: existentStudySession.id!,
    };

    return finishedStudySessionData;
  }
}

export const FinishStudySessionCommandHandlerToken =
  createDIToken<FinishStudySessionCommandHandler>().as(
    "FinishStudySessionCommandHandler"
  );
