import DbConnection from "../../shared/infrastructure/DbConnection";
import { ChangeSessionSubjectCommandHandler } from "./application/commands/ChangeSessionSubjectCommand";
import { CreateCustomChallengeCommandHandler } from "./application/commands/CreateCustomChallengeCommand";
import { CreateRandomChallengeCommandHandler } from "./application/commands/CreateRandomChallengeCommand";
import { DeleteChallengeCommandHandler } from "./application/commands/DeleteChallengeCommand";
import { FinishStudySessionCommandHandler } from "./application/commands/FinishStudySessionCommand";
import { StartStudySessionCommandHandler } from "./application/commands/StartStudySessionCommand";
import { GetActiveChallengeQueryHandler } from "./application/queries/GetActiveChallengeQuery";
import { GetActiveStudySessionQueryHandler } from "./application/queries/GetActiveStudySessionQuery";
import { GetLastStudySessionsQueryHandler } from "./application/queries/GetLastStudySessionsQuery";
import { GetStudySessionsFromUserQueryHandler } from "./application/queries/GetStudySessionsFromUserQuery";
import { RandomChallengeDificultyService } from "./domain/services/RandomChallengeDificultyService";
import { InMemoryActiveChallengeRepository } from "./infrastructure/persistence/repositories/InMemoryActiveChallengeRepository";
import { InMemoryActiveStudySessionsRepository } from "./infrastructure/persistence/repositories/InMemoryActiveStudySessionsRepository";
import { SequelizeFinishedSessionsRepository } from "./infrastructure/persistence/repositories/SequelizeFinishedSessionsRepository";

// Infrastructure
export const sequelizeFinishedSessionsRepository =
  new SequelizeFinishedSessionsRepository(DbConnection);

export const inMemoryActiveStudySessionsRepository =
  new InMemoryActiveStudySessionsRepository();

export const inMemoryActiveChallengeRepository =
  new InMemoryActiveChallengeRepository();

// Application

// Command handlers
export const changeSessionSubjectCommandHandler =
  new ChangeSessionSubjectCommandHandler(inMemoryActiveStudySessionsRepository);

export const finishStudySessionCommandHandler =
  new FinishStudySessionCommandHandler(
    inMemoryActiveStudySessionsRepository,
    sequelizeFinishedSessionsRepository,
    inMemoryActiveChallengeRepository
  );

export const startStudySessionCommandHandler =
  new StartStudySessionCommandHandler(
    inMemoryActiveStudySessionsRepository,
    inMemoryActiveChallengeRepository
  );

// Query handlers
export const getActiveStudySessionQueryHandler =
  new GetActiveStudySessionQueryHandler(inMemoryActiveStudySessionsRepository);

export const getLastStudySessionsQueryHandler =
  new GetLastStudySessionsQueryHandler(sequelizeFinishedSessionsRepository);

export const getStudySessionsFromUserQueryHandler =
  new GetStudySessionsFromUserQueryHandler(sequelizeFinishedSessionsRepository);

export const getActiveChallengeQueryHandler =
  new GetActiveChallengeQueryHandler(inMemoryActiveChallengeRepository);

export const createCustomChallengeCommandHandler =
  new CreateCustomChallengeCommandHandler(inMemoryActiveChallengeRepository);

export const deleteChallengeCommandHandler = new DeleteChallengeCommandHandler(
  inMemoryActiveChallengeRepository
);

export const createRandomChallengeCommandHandler =
  new CreateRandomChallengeCommandHandler(
    inMemoryActiveChallengeRepository,
    new RandomChallengeDificultyService()
  );
