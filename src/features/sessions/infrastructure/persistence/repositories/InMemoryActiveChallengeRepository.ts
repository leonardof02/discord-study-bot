import { IActiveChallengeRepository } from "../../../domain/interfaces/IActiveChallengeRepository";

export class InMemoryActiveChallengeRepository
  implements IActiveChallengeRepository
{
  constructor(
    private readonly activeChallenges: Record<string, Challenge> = {}
  ) {}

  getActiveChallenge(userId: string) {
    return this.activeChallenges[userId];
  }

  saveActiveChallenge(userId: string, challenge: Challenge) {
    this.activeChallenges[userId] = challenge;
  }

  removeActiveChallenge(userId: string) {
    delete this.activeChallenges[userId];
  }
}
