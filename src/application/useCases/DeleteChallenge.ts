import * as ChallengeRepository from "../../infrastructure/repositories/ChallengeRepository";

export function DeleteChallenge(userId: string) {
  const existentChallenge = ChallengeRepository.getChallenge(userId);
  if (!existentChallenge)
    throw new Error(`<@${userId}> no tiene un reto creado`);
  ChallengeRepository.removeChallenge(userId);
  return;
}
