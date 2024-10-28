import * as ChallengeRepository from "../../infrastructure/repositories/ChallengeRepository";

export function GetActiveChallenge(userId: string) {
  const activeChallenge = ChallengeRepository.getChallenge(userId);
  return activeChallenge;
}