import { buildDIContainer, toFactory } from "fioc";
import {
  AddSubjectCommandHandler,
  AddSubjectCommandHandlerToken,
} from "./application/command/AddSubjectCommand";
import {
  RemoveSubjectCommandHandler,
  RemoveSubjectCommandHandlerToken,
} from "./application/command/RemoveSubjectCommand";
import {
  GetAllSubjectsQueryHandler,
  GetAllSubjectsQueryHandlerToken,
} from "./application/queries/GetAllSubjects";
import {
  GetSubjectQueryHandler,
  GetSubjectQueryHandlerToken,
} from "./application/queries/GetSubject";
import { SequelizeSubjectRepository } from "./infrastructure/persistence/repositories/SequelizeSubjectRepository";
import { RegexTool, RegexToolToken } from "./domain/RegexTool";
import { ISubjectRepositoryToken } from "./domain/ISubjectRepository";

const SubjectContainer = buildDIContainer()
  .register(RegexToolToken, new RegexTool())
  .registerConsumer({
    token: ISubjectRepositoryToken,
    dependencies: [RegexToolToken],
    factory: toFactory(SequelizeSubjectRepository),
  })
  .registerConsumer({
    token: AddSubjectCommandHandlerToken,
    dependencies: [ISubjectRepositoryToken],
    factory: toFactory(AddSubjectCommandHandler),
  })
  .registerConsumer({
    token: RemoveSubjectCommandHandlerToken,
    dependencies: [ISubjectRepositoryToken],
    factory: toFactory(RemoveSubjectCommandHandler),
  })
  .registerConsumer({
    token: GetAllSubjectsQueryHandlerToken,
    dependencies: [ISubjectRepositoryToken],
    factory: toFactory(GetAllSubjectsQueryHandler),
  })
  .registerConsumer({
    token: GetSubjectQueryHandlerToken,
    dependencies: [ISubjectRepositoryToken],
    factory: toFactory(GetSubjectQueryHandler),
  })
  .getResult();

const SubjectContainerState = SubjectContainer.getState();

export { SubjectContainerState };
