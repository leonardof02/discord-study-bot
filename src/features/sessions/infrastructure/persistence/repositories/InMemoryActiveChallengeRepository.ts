import { IActiveChallengeRepository } from "../../../domain/interfaces/IActiveChallengeRepository";

export class InMemoryActiveChallengeRepository
  implements IActiveChallengeRepository
{
  private readonly activeChallenges: Record<string, Challenge> = {};

  constructor() {}

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
