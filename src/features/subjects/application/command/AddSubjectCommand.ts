import { createDIToken } from "fioc";
import { ISubjectRepository } from "../../domain/ISubjectRepository";
import { Subject, SubjectColor } from "../../domain/Subject";
import { v4 as uuidv4 } from "uuid";

export type AddSubjectCommand = {
  name: string;
  color: SubjectColor;
};

export class AddSubjectCommandHandler {
  constructor(private readonly subjectRepository: ISubjectRepository) {}

  async handle(command: AddSubjectCommand) {
    const { name, color } = command;

    const existingSubject = await this.subjectRepository.findSubjectByName(
      name
    );

    if (existingSubject) {
      throw new Error("Subject already exists");
    }

    const newSubject: Subject = {
      id: uuidv4(),
      name,
      color,
    };

    await this.subjectRepository.addSubject(newSubject);
  }
}

export const AddSubjectCommandHandlerToken = createDIToken<AddSubjectCommandHandler>(
  "AddSubjectCommandHandler"
);