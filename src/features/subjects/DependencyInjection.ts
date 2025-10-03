import { constructorToFactory, buildDIContainer } from "@fioc/core";
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
  .registerFactory({
    token: GetSubjectQueryHandlerToken,
    dependencies: [ISubjectRepositoryToken],
    factory: constructorToFactory(GetSubjectQueryHandler),
  })
  .registerFactory({
    token: ISubjectRepositoryToken,
    dependencies: [RegexToolToken],
    factory: constructorToFactory(SequelizeSubjectRepository),
  })
  .registerFactory({
    token: AddSubjectCommandHandlerToken,
    dependencies: [ISubjectRepositoryToken],
    factory: constructorToFactory(AddSubjectCommandHandler),
  })
  .registerFactory({
    token: RemoveSubjectCommandHandlerToken,
    dependencies: [ISubjectRepositoryToken],
    factory: constructorToFactory(RemoveSubjectCommandHandler),
  })
  .registerFactory({
    token: GetAllSubjectsQueryHandlerToken,
    dependencies: [ISubjectRepositoryToken],
    factory: constructorToFactory(GetAllSubjectsQueryHandler),
  })
  .getResult();

const SubjectContainerState = SubjectContainer.getState();

export { SubjectContainerState };