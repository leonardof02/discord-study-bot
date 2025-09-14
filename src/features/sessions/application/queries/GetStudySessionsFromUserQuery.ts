import { IFinishedStudySessionRepository } from "../../domain/interfaces/IFinishedStudySessionRepository";

type GetStudySessionsFromUserQuery = {
  userId: string;
};

export class GetStudySessionsFromUserQueryHandler {
  constructor(
    private readonly finishedStudySessionsRepository: IFinishedStudySessionRepository
  ) {}

  handle(query: GetStudySessionsFromUserQuery) {
    const { userId } = query;
    return this.finishedStudySessionsRepository.getStudySessionsFromUser(
      userId
    );
  }
}
