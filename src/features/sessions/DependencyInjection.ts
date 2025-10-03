import {
  buildDIContainer,
  createDIToken,
  constructorToFactory,
} from "@fioc/core";
import {
  IFinishedStudySessionRepository,
  IFinishedStudySessionRepositoryToken,
} from "./domain/interfaces/IFinishedStudySessionRepository";
import { Sequelize } from "sequelize";
import DbConnection from "../../shared/infrastructure/DbConnection";
import { IActiveStudySessionRepositoryToken } from "./domain/interfaces/IActiveStudySessionRepository";
import { IActiveChallengeRepositoryToken } from "./domain/interfaces/IActiveChallengeRepository";
import {
  GetActiveStudySessionQueryHandler,
  GetActiveStudySessionQueryHandlerToken,
} from "./application/queries/GetActiveStudySessionQuery";
import {
  GetLastStudySessionsQueryHandlerToken,
  GetLastStudySessionsQueryHandler,
} from "./application/queries/GetLastStudySessionsQuery";
import {
  GetStudySessionsFromUserQueryHandler,
  GetStudySessionsFromUserQueryHandlerToken,
} from "./application/queries/GetStudySessionsFromUserQuery";
import {
  GetActiveChallengeQueryHandler,
  GetActiveChallengeQueryHandlerToken,
} from "./application/queries/GetActiveChallengeQuery";
import {
  CreateCustomChallengeCommandHandler,
  CreateCustomChallengeCommandHandlerToken,
} from "./application/commands/CreateCustomChallengeCommand";
import {
  ChangeSessionSubjectCommandHandler,
  ChangeSessionSubjectCommandHandlerToken,
} from "./application/commands/ChangeSessionSubjectCommand";
import {
  CreateRandomChallengeCommandHandler,
  CreateRandomChallengeCommandHandlerToken,
} from "./application/commands/CreateRandomChallengeCommand";
import { RandomChallengeDificultyService } from "./domain/services/RandomChallengeDificultyService";
import {
  DeleteChallengeCommandHandler,
  DeleteChallengeCommandHandlerToken,
} from "./application/commands/DeleteChallengeCommand";
import {
  FinishStudySessionCommandHandler,
  FinishStudySessionCommandHandlerToken,
} from "./application/commands/FinishStudySessionCommand";
import {
  StartStudySessionCommandHandler,
  StartStudySessionCommandHandlerToken,
} from "./application/commands/StartStudySessionCommand";
import { InMemoryActiveStudySessionsRepository } from "./infrastructure/persistence/repositories/InMemoryActiveStudySessionsRepository";
import { SequelizeFinishedSessionsRepository } from "./infrastructure/persistence/repositories/SequelizeFinishedSessionsRepository";
import { InMemoryActiveChallengeRepository } from "./infrastructure/persistence/repositories/InMemoryActiveChallengeRepository";
import { ISubjectRepositoryToken } from "../subjects/domain/ISubjectRepository";

const SequelizeToken = createDIToken<Sequelize>().as("Sequelize");
const RandomChallengeDificultyServiceToken =
  createDIToken<RandomChallengeDificultyService>().as(
    "RandomChallengeDificultyService"
  );

const SessionsContainer = buildDIContainer()
  .register(SequelizeToken, DbConnection)
  .register(
    RandomChallengeDificultyServiceToken,
    new RandomChallengeDificultyService()
  )
  .register(
    IActiveStudySessionRepositoryToken,
    new InMemoryActiveStudySessionsRepository()
  )
  .register(
    IActiveChallengeRepositoryToken,
    new InMemoryActiveChallengeRepository()
  )
  .registerFactoryArray([
    {
      token: IFinishedStudySessionRepositoryToken,
      factory: constructorToFactory(SequelizeFinishedSessionsRepository) as (
        sequelize: Sequelize
      ) => IFinishedStudySessionRepository,
      dependencies: [SequelizeToken],
    },
    {
      token: GetActiveStudySessionQueryHandlerToken,
      factory: constructorToFactory(GetActiveStudySessionQueryHandler),
      dependencies: [IActiveStudySessionRepositoryToken],
    },
    {
      token: GetLastStudySessionsQueryHandlerToken,
      factory: constructorToFactory(GetLastStudySessionsQueryHandler),
      dependencies: [IFinishedStudySessionRepositoryToken],
    },
    {
      token: GetStudySessionsFromUserQueryHandlerToken,
      factory: constructorToFactory(GetStudySessionsFromUserQueryHandler),
      dependencies: [IFinishedStudySessionRepositoryToken],
    },
    {
      token: GetActiveChallengeQueryHandlerToken,
      factory: constructorToFactory(GetActiveChallengeQueryHandler),
      dependencies: [IActiveChallengeRepositoryToken],
    },
    {
      token: CreateCustomChallengeCommandHandlerToken,
      factory: constructorToFactory(CreateCustomChallengeCommandHandler),
      dependencies: [IActiveChallengeRepositoryToken],
    },
    {
      token: ChangeSessionSubjectCommandHandlerToken,
      factory: constructorToFactory(ChangeSessionSubjectCommandHandler),
      dependencies: [IActiveStudySessionRepositoryToken],
    },
    {
      token: CreateRandomChallengeCommandHandlerToken,
      factory: constructorToFactory(CreateRandomChallengeCommandHandler),
      dependencies: [
        IActiveChallengeRepositoryToken,
        RandomChallengeDificultyServiceToken,
      ],
    },
    {
      token: DeleteChallengeCommandHandlerToken,
      factory: constructorToFactory(DeleteChallengeCommandHandler),
      dependencies: [IActiveChallengeRepositoryToken],
    },
    {
      token: FinishStudySessionCommandHandlerToken,
      factory: constructorToFactory(FinishStudySessionCommandHandler),
      dependencies: [
        IActiveStudySessionRepositoryToken,
        IFinishedStudySessionRepositoryToken,
        IActiveChallengeRepositoryToken,
        ISubjectRepositoryToken,
      ],
    },
    {
      token: StartStudySessionCommandHandlerToken,
      factory: constructorToFactory(StartStudySessionCommandHandler),
      dependencies: [
        IActiveStudySessionRepositoryToken,
        IActiveChallengeRepositoryToken,
      ],
    },
  ])
  .getResult();

const SessionsContainerState = SessionsContainer.getState();

export { SessionsContainerState };
