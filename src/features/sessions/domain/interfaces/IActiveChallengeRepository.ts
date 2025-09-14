export interface IActiveChallengeRepository {
  getActiveChallenge(userId: string): Challenge | undefined;
  saveActiveChallenge(userId: string, challenge: Challenge): void;
  removeActiveChallenge(userId: string): void;
}
