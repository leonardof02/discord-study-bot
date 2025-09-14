import { IFinishedStudySessionRepository } from "../../../sessions/domain/interfaces/IFinishedStudySessionRepository";

type GetPointsByUserQuery = {
  userId: string;
};

export class GetPointsByUserQueryHandler {
  constructor(
    private readonly finishedStudySessionsRepository: IFinishedStudySessionRepository
  ) {}

  handle(command: GetPointsByUserQuery) {
    return this.finishedStudySessionsRepository.getPointsSumsWithSubjectFromUser(
      command.userId
    );
  }
}
