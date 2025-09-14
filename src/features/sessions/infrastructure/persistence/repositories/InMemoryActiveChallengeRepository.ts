export class InMemoryActiveChallengeRepository {
  private readonly activeChallenges: Record<string, Challenge> = {};

  constructor() {
    this.activeChallenges = {};
  }

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
