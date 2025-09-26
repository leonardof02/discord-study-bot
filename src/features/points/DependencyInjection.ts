// import { sequelizeFinishedSessionsRepository } from "../sessions/DependencyInjection";
// import { GetDetailedStudyRankingQueryHandler } from "./application/queries/GetDetailedRankingQuery";
// import { GetPointsByUserQueryHandler } from "./application/queries/GetPointsByUserQuery";
// import { GetStudyRankingQueryHandler } from "./application/queries/GetStudyRankingQuery";

import { buildDIContainer, toFactory } from "fioc";
import { IFinishedStudySessionRepositoryToken } from "../sessions/domain/interfaces/IFinishedStudySessionRepository";
import {
  GetStudyRankingQueryHandler,
  GetStudyRankingQueryHandlerToken,
} from "./application/queries/GetStudyRankingQuery";
import {
  GetDetailedStudyRankingQueryHandler,
  GetDetailedStudyRankingQueryHandlerToken,
} from "./application/queries/GetDetailedRankingQuery";
import {
  GetPointsByUserQueryHandler,
  GetPointsByUserQueryHandlerToken,
} from "./application/queries/GetPointsByUserQuery";

// const getRankingCommandHandler = new GetStudyRankingQueryHandler(
//   sequelizeFinishedSessionsRepository
// );

// const getDetailedRankingQueryHandler = new GetDetailedStudyRankingQueryHandler(
//   sequelizeFinishedSessionsRepository
// );

// const getPointsByUserQueryHandler = new GetPointsByUserQueryHandler(
//   sequelizeFinishedSessionsRepository
// );

// export {
//   getRankingCommandHandler,
//   getDetailedRankingQueryHandler,
//   getPointsByUserQueryHandler,
// };

const PointsContainer = buildDIContainer()
  .registerConsumer({
    dependencies: [IFinishedStudySessionRepositoryToken],
    token: GetStudyRankingQueryHandlerToken,
    factory: toFactory(GetStudyRankingQueryHandler),
  })
  .registerConsumer({
    dependencies: [IFinishedStudySessionRepositoryToken],
    token: GetDetailedStudyRankingQueryHandlerToken,
    factory: toFactory(GetDetailedStudyRankingQueryHandler),
  })
  .registerConsumer({
    dependencies: [IFinishedStudySessionRepositoryToken],
    token: GetPointsByUserQueryHandlerToken,
    factory: toFactory(GetPointsByUserQueryHandler),
  })
  .getResult();

const PointsContainerState = PointsContainer.getState();

export { PointsContainerState };
