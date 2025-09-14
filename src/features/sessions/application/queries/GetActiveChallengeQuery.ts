import { IActiveChallengeRepository } from "../../domain/interfaces/IActiveChallengeRepository";

type GetActiveChallengeQuery = {
  userId: string;
};

export class GetActiveChallengeQueryHandler {
  constructor(
    private readonly challengeRepository: IActiveChallengeRepository
  ) {}

  handle(command: GetActiveChallengeQuery) {
    const { userId } = command;
    const existentChallenge =
      this.challengeRepository.getActiveChallenge(userId);

    return existentChallenge;
  }
}
