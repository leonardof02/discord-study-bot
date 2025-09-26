import { buildDIContainer, createDIToken, toFactory } from "fioc";
import { IFinishedStudySessionRepositoryToken } from "./domain/interfaces/IFinishedStudySessionRepository";
import { SequelizeFinishedSessionsRepository } from "./infrastructure/persistence/repositories/SequelizeFinishedSessionsRepository";
import { Sequelize } from "sequelize";
import DbConnection from "../../shared/infrastructure/DbConnection";
import { IActiveStudySessionRepositoryToken } from "./domain/interfaces/IActiveStudySessionRepository";
import { InMemoryActiveStudySessionsRepository } from "./infrastructure/persistence/repositories/InMemoryActiveStudySessionsRepository";
import { IActiveChallengeRepositoryToken } from "./domain/interfaces/IActiveChallengeRepository";
import { InMemoryActiveChallengeRepository } from "./infrastructure/persistence/repositories/InMemoryActiveChallengeRepository";
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
  RemoveSubjectCommandHandler,
  RemoveSubjectCommandHandlerToken,
} from "../subjects/application/command/RemoveSubjectCommand";
import { ISubjectRepositoryToken } from "../subjects/domain/ISubjectRepository";

const SequelizeToken = createDIToken<Sequelize>("Sequelize");

const SessionsContainer = buildDIContainer()
  .register(SequelizeToken, DbConnection)
  .registerConsumer({
    token: IFinishedStudySessionRepositoryToken,
    dependencies: [SequelizeToken],
    factory: toFactory(SequelizeFinishedSessionsRepository),
  })
  .registerConsumer({
    dependencies: [],
    token: IActiveStudySessionRepositoryToken,
    factory: toFactory(InMemoryActiveStudySessionsRepository),
  })
  .registerConsumer({
    dependencies: [],
    token: IActiveChallengeRepositoryToken,
    factory: toFactory(InMemoryActiveChallengeRepository),
  })
  .registerConsumer({
    dependencies: [IActiveStudySessionRepositoryToken],
    token: GetActiveStudySessionQueryHandlerToken,
    factory: toFactory(GetActiveStudySessionQueryHandler),
  })
  .registerConsumer({
    dependencies: [IFinishedStudySessionRepositoryToken],
    token: GetLastStudySessionsQueryHandlerToken,
    factory: toFactory(GetLastStudySessionsQueryHandler),
  })
  .registerConsumer({
    dependencies: [IFinishedStudySessionRepositoryToken],
    token: GetStudySessionsFromUserQueryHandlerToken,
    factory: toFactory(GetStudySessionsFromUserQueryHandler),
  })
  .registerConsumer({
    dependencies: [IActiveChallengeRepositoryToken],
    token: GetActiveChallengeQueryHandlerToken,
    factory: toFactory(GetActiveChallengeQueryHandler),
  })
  .registerConsumer({
    token: CreateCustomChallengeCommandHandlerToken,
    factory: toFactory(CreateCustomChallengeCommandHandler),
    dependencies: [IActiveChallengeRepositoryToken],
  })
  .registerConsumer({
    token: RemoveSubjectCommandHandlerToken,
    factory: toFactory(RemoveSubjectCommandHandler),
    dependencies: [ISubjectRepositoryToken],
  })
  .getResult();

const SessionsContainerState = SessionsContainer.getState();

export { SessionsContainerState };
