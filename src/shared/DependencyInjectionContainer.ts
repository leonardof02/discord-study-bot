import { buildDIContainer } from "@fioc/core";
import { SubjectContainerState } from "../features/subjects/DependencyInjection";
import { PointsContainerState } from "../features/points/DependencyInjection";
import { SessionsContainerState } from "../features/sessions/DependencyInjection";

const DependencyContainer = buildDIContainer()
  .merge(SubjectContainerState)
  .merge(PointsContainerState)
  .merge(SessionsContainerState)
  .getResult();

export { DependencyContainer };