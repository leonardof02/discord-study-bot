import { sequelizeFinishedSessionsRepository } from "../sessions/DependencyInjection";
import { GetDetailedStudyRankingQueryHandler } from "./application/queries/GetDetailedRankingQuery";
import { GetPointsByUserQueryHandler } from "./application/queries/GetPointsByUserQuery";
import { GetStudyRankingQueryHandler } from "./application/queries/GetStudyRankingQuery";

const getRankingCommandHandler = new GetStudyRankingQueryHandler(
  sequelizeFinishedSessionsRepository
);

const getDetailedRankingQueryHandler = new GetDetailedStudyRankingQueryHandler(
  sequelizeFinishedSessionsRepository
);

const getPointsByUserQueryHandler = new GetPointsByUserQueryHandler(
  sequelizeFinishedSessionsRepository
);

export {
  getRankingCommandHandler,
  getDetailedRankingQueryHandler,
  getPointsByUserQueryHandler,
};
