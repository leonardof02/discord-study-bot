import { describe, vi } from "vitest";
import { ISubjectRepository } from "../../../domain/ISubjectRepository";
import {
  GetAllSubjectsQuery,
  GetAllSubjectsQueryHandler,
} from "../GetAllSubjects";

describe("GetAllSubjects", () => {
  const makeRepository = (): ISubjectRepository => {
    return {
      findSubjectByName: vi.fn(),
      addSubject: vi.fn(),
      findSubjectByQueryString: vi.fn(),
      getAllSubjects: vi.fn(),
      getSubjectById: vi.fn(),
      save: vi.fn(),
      removeSubject: vi.fn(),
    };
  };

  it("should return all subjects", () => {
    const repo = makeRepository();

    repo.getAllSubjects = vi.fn().mockResolvedValue([
      { id: "1", name: "Mathematics", color: "🟦" },
      { id: "2", name: "History", color: "🟫" },
    ]);

    const getAllSubjectsCommand: GetAllSubjectsQuery = {};

    const handler = new GetAllSubjectsQueryHandler(repo);
    handler.handle(getAllSubjectsCommand);

    expect(repo.getAllSubjects).toHaveBeenCalledTimes(1);
  });
});
