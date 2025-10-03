import { buildDIContainer, constructorToFactory } from "@fioc/core";
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

const PointsContainer = buildDIContainer()
  .registerFactoryArray([
    {
      dependencies: [IFinishedStudySessionRepositoryToken],
      token: GetStudyRankingQueryHandlerToken,
      factory: constructorToFactory(GetStudyRankingQueryHandler),
    },
    {
      dependencies: [IFinishedStudySessionRepositoryToken],
      token: GetDetailedStudyRankingQueryHandlerToken,
      factory: constructorToFactory(GetDetailedStudyRankingQueryHandler),
    },
    {
      dependencies: [IFinishedStudySessionRepositoryToken],
      token: GetPointsByUserQueryHandlerToken,
      factory: constructorToFactory(GetPointsByUserQueryHandler),
    },
  ])
  .getResult();

const PointsContainerState = PointsContainer.getState();

export { PointsContainerState };
