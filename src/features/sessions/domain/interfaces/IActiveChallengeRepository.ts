import { createDIToken } from "@fioc/core";

export interface IActiveChallengeRepository {
  getActiveChallenge(userId: string): Challenge | undefined;
  saveActiveChallenge(userId: string, challenge: Challenge): void;
  removeActiveChallenge(userId: string): void;
}

export const IActiveChallengeRepositoryToken =
  createDIToken<IActiveChallengeRepository>().as("IActiveChallengeRepository");