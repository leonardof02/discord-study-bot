import { AddSubjectCommandHandler } from "./application/command/AddSubjectCommand";
import { RemoveSubjectCommandHandler } from "./application/command/RemoveSubjectCommand";
import { GetAllSubjectQueryHandler } from "./application/queries/GetAllSubjects";
import { GetSubjectQueryHandler } from "./application/queries/GetSubject";
import { SequelizeSubjectRepository } from "./infrastructure/persistence/repositories/SequelizeSubjectRepository";

const sequelizeSubjectRepository = new SequelizeSubjectRepository();

export const addSubjectCommand = new AddSubjectCommandHandler(
  sequelizeSubjectRepository
);

export const removeSubjectCommand = new RemoveSubjectCommandHandler(
  sequelizeSubjectRepository
);

export const getAllSubjectsQuery = new GetAllSubjectQueryHandler(
  sequelizeSubjectRepository
);

export const getSubjectQuery = new GetSubjectQueryHandler(
  sequelizeSubjectRepository
);


