import { createDIToken } from "@fioc/core";
import { IActiveChallengeRepository } from "../../domain/interfaces/IActiveChallengeRepository";

type DeleteChallengeCommand = {
  userId: string;
};

export class DeleteChallengeCommandHandler {
  constructor(
    private readonly challengeRepository: IActiveChallengeRepository
  ) {}

  handle(command: DeleteChallengeCommand) {
    const { userId } = command;
    const existentChallenge =
      this.challengeRepository.getActiveChallenge(userId);

    if (!existentChallenge)
      throw new Error(`<@${userId}> no ha creado un reto`);

    this.challengeRepository.removeActiveChallenge(userId);
  }
}

export const DeleteChallengeCommandHandlerToken =
  createDIToken<DeleteChallengeCommandHandler>().as(
    "DeleteChallengeCommandHandler"
  );
