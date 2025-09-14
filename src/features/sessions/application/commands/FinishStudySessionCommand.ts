import { IActiveChallengeRepository } from "../../domain/interfaces/IActiveChallengeRepository";
import { IActiveStudySessionRepository } from "../../domain/interfaces/IActiveStudySessionRepository";
import { IFinishedStudySessionRepository } from "../../domain/interfaces/IFinishedStudySessionRepository";

type FinishStudySessionCommand = {
  userId: string;
};

export class FinishStudySessionCommandHandler {
  constructor(
    private readonly activeStudySessionsRepository: IActiveStudySessionRepository,
    private readonly finishedStudySessionsRepository: IFinishedStudySessionRepository,
    private readonly activeChallengeRepository: IActiveChallengeRepository
  ) {}

  async handle(command: FinishStudySessionCommand) {
    const { userId } = command;
    console.log(userId);

    const existentStudySession =
      this.activeStudySessionsRepository.getStudySession(userId);

    if (!existentStudySession) {
      throw new Error(`<@${userId}> no has iniciado ninguna sesión de estudio`);
    }

    existentStudySession.finish();
    if (existentStudySession.isChallengeCompleted)
      this.activeChallengeRepository.removeActiveChallenge(userId);

    this.activeStudySessionsRepository.removeStudySession(userId);
    await this.finishedStudySessionsRepository.archiveSession(existentStudySession);

    return existentStudySession;
  }
}
