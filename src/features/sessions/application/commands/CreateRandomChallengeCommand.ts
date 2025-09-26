import { ChallengeType } from "../../domain/entities/ChallengeType";
import { RandomChallengeDificultyService } from "../../domain/services/RandomChallengeDificultyService";
import { IActiveChallengeRepository } from "../../domain/interfaces/IActiveChallengeRepository";
import { createDIToken } from "fioc";

type CreateRandomChallengeCommand = {
  userId: string;
  difficulty: ChallengeType;
};

export class CreateRandomChallengeCommandHandler {
  constructor(
    private readonly challengeRepository: IActiveChallengeRepository,
    private readonly randomChallengeDificultyService: RandomChallengeDificultyService
  ) {}

  handle(command: CreateRandomChallengeCommand) {
    const { userId, difficulty } = command;
    const existentChallenge =
      this.challengeRepository.getActiveChallenge(userId);

    if (existentChallenge)
      throw new Error(`<@${userId}> ya tiene un reto creado`);

    const challengeTime =
      this.randomChallengeDificultyService.getChallengeTime(difficulty);

    const newChallenge: Challenge = {
      time: challengeTime,
      isActive: false,
      isRandom: true,
    };

    this.challengeRepository.saveActiveChallenge(userId, newChallenge);
    return challengeTime;
  }
}

export const CreateRandomChallengeCommandHandlerToken =
  createDIToken<CreateRandomChallengeCommandHandler>(
    "CreateRandomChallengeCommandHandler"
  );