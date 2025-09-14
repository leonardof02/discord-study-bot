import { ISubjectRepository } from "../../domain/ISubjectRepository";

export type RemoveSubjectCommand = {
  id: string;
};

export class RemoveSubjectCommandHandler {
  constructor(private readonly subjectRepository: ISubjectRepository) {}

  async handle(command: RemoveSubjectCommand) {
    const { id } = command;
    const subject = await this.subjectRepository.getSubjectById(id);
    if (!subject) throw new Error("Subject not found");
    await this.subjectRepository.removeSubject(id);
    return subject;
  }
}
