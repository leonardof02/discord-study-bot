import { buildDIContainer } from "fioc";
import { SubjectContainerState } from "../features/subjects/DependencyInjection";
import { PointsContainerState } from "../features/points/DependencyInjection";
import { SessionsContainerState } from "../features/sessions/DependencyInjection";

const DependencyContainer = buildDIContainer({
  ...SubjectContainerState,
  ...PointsContainerState,
  ...SessionsContainerState,
}).getResult();

export { DependencyContainer };
