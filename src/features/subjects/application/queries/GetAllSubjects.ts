import { ISubjectRepository } from "../../domain/ISubjectRepository";

export type GetAllSubjectQuery = {};

export class GetAllSubjectQueryHandler {
  constructor(private readonly subjectRepository: ISubjectRepository) {}

  async handle(query: GetAllSubjectQuery) {
    const subjects = await this.subjectRepository.getAllSubjects();
    return subjects;
  }
}
