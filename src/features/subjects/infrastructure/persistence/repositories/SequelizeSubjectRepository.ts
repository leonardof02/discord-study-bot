import { ISubjectRepository } from "../../../domain/ISubjectRepository";
import { Subject } from "../../../domain/Subject";
import { SubjectModel } from "../models/SubjectModel";
import { RegexTool } from "../../../domain/RegexTool";

export class SequelizeSubjectRepository implements ISubjectRepository {
  private readonly _regexTool: RegexTool;

  constructor() {
    this._regexTool = new RegexTool();
  }
  findSubjectByName(name: string): Promise<Subject | null> {
    return SubjectModel.findOne({
      where: {
        name,
      },
    }).then((subject) => {
      if (!subject) return null;
      return {
        id: subject.dataValues.id,
        color: subject.dataValues.color,
        name: subject.dataValues.name,
      };
    });
  }

  async addSubject(subject: Subject): Promise<void> {
    const newSubject = await SubjectModel.create({
      id: subject.id,
      color: subject.color,
      name: subject.name,
    });
    await newSubject.save();
  }
  async removeSubject(subjectId: string): Promise<void> {
    await SubjectModel.destroy({
      where: {
        id: subjectId,
      },
    });
  }
  async save(subject: Subject): Promise<void> {
    const existentSubject = await SubjectModel.findByPk(subject.id);
    if (!existentSubject) throw new Error("Subject not found");
    existentSubject.dataValues.color = subject.color;
    existentSubject.dataValues.name = subject.name;
    await existentSubject?.save();
  }

  async findSubjectByQueryString(name: string): Promise<Subject | null> {
    const allSubjects = await SubjectModel.findAll();
    const regex = this._regexTool.createPartialMatchRegex(name);
    const matchedSubjects = allSubjects.filter((subject) =>
      regex.test(subject.dataValues.name)
    );
    if (matchedSubjects.length === 0) return null;
    const subject = matchedSubjects[0];
    return {
      color: subject.dataValues.color,
      id: subject.dataValues.id,
      name: subject.dataValues.name,
    };
  }
  async getAllSubjects(): Promise<Subject[]> {
    const subjects = await SubjectModel.findAll();
    return subjects.map((subject) => ({
      id: subject.dataValues.id,
      name: subject.dataValues.name,
      color: subject.dataValues.color,
    }));
  }

  async getSubjectById(id: string): Promise<Subject | null> {
    const subject = await SubjectModel.findByPk(id);
    if (!subject) return null;

    return {
      id: subject.dataValues.id,
      color: subject.dataValues.color,
      name: subject.dataValues.name,
    };
  }
}
