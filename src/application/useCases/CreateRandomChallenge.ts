import * as ChallengeRepository from "../../infrastructure/repositories/ChallengeRepository";

export function CreateRandomChallenge(userId: string, time: number) {
  const existentChallenge = ChallengeRepository.getChallenge(userId);
  if (existentChallenge)
    throw new Error(`<@${userId}> ya tiene un reto creado`);
  ChallengeRepository.setChallenge(userId, {
    time,
    isActive: false,
    isRandom: true,
  });
  return;
}
