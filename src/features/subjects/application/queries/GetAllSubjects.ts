import { createDIToken } from "@fioc/core";
import { ISubjectRepository } from "../../domain/ISubjectRepository";

export type GetAllSubjectsQuery = {};

export class GetAllSubjectsQueryHandler {
  constructor(private readonly subjectRepository: ISubjectRepository) {}

  async handle(query: GetAllSubjectsQuery) {
    const subjects = await this.subjectRepository.getAllSubjects();
    return subjects;
  }
}

export const GetAllSubjectsQueryHandlerToken =
  createDIToken<GetAllSubjectsQueryHandler>().as("GetAllSubjectsQueryHandler");

