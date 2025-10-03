import { createDIToken } from "@fioc/core";
import { ISubjectRepository } from "../../domain/ISubjectRepository";

export type GetSubjectQuery = {
  id: string;
};

export class GetSubjectQueryHandler {
  constructor(private readonly subjectRepository: ISubjectRepository) {}

  async handle(query: GetSubjectQuery) {
    const subjects = await this.subjectRepository.getSubjectById(query.id);
    if (!subjects) throw new Error("Subject not found");
    return subjects;
  }
}

export const GetSubjectQueryHandlerToken =
  createDIToken<GetSubjectQueryHandler>().as("GetSubjectQueryHandler");

