import { IActiveChallengeRepository } from "../../domain/interfaces/IActiveChallengeRepository";

type CreateCustomChallengeCommand = {
  userId: string;
  time: number;
};

export class CreateCustomChallengeCommandHandler {
  constructor(
    private readonly challengeRepository: IActiveChallengeRepository
  ) {}

  handle(command: CreateCustomChallengeCommand) {
    const { userId, time } = command;
    const existentChallenge =
      this.challengeRepository.getActiveChallenge(userId);

    if (existentChallenge)
      throw new Error(`<@${userId}> ya tiene un reto creado`);

    const newChallenge: Challenge = {
      time,
      isActive: false,
      isRandom: false,
    };

    this.challengeRepository.saveActiveChallenge(userId, newChallenge);
  }
}
