import { createDIToken } from "fioc";
import { SequelizeSubjectRepository } from "../infrastructure/persistence/repositories/SequelizeSubjectRepository";
import { Subject } from "./Subject";

export interface ISubjectRepository {
  addSubject(subject: Subject): Promise<void>;
  removeSubject(subjectId: string): Promise<void>;
  save(subject: Subject): Promise<void>;
  findSubjectByQueryString(query: string): Promise<Subject | null>;
  findSubjectByName(name: string): Promise<Subject | null>;
  getSubjectById(id: string): Promise<Subject | null>;
  getAllSubjects(): Promise<Subject[]>;
}

export const ISubjectRepositoryToken =
  createDIToken<ISubjectRepository>("ISubjectRepository");
