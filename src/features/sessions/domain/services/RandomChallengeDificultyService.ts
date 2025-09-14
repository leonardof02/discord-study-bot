import { ChallengeType } from "../entities/ChallengeType";

export class RandomChallengeDificultyService {
  public getChallengeTime(difficulty: ChallengeType) {
    switch (difficulty) {
      case "easy":
        return this.generateSecondsBetween(3600, 3600 * 3);
      case "medium":
        return this.generateSecondsBetween(3600 * 3 + 1, 3600 * 6);
      case "hard":
        return this.generateSecondsBetween(3600 * 6 + 1, 3600 * 9);
      default:
        return this.generateSecondsBetween(3600, 3600 * 3);
    }
  }

  private generateSecondsBetween(start: number, end: number): number {
    const randomNumber = Math.floor(Math.random() * (end - start + 1) + start);
    return randomNumber;
  }
}
