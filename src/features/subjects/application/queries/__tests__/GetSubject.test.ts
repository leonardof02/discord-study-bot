import { describe, vi } from "vitest";
import { ISubjectRepository } from "../../../domain/ISubjectRepository";
import {
  GetAllSubjectsQuery,
  GetAllSubjectsQueryHandler,
} from "../GetAllSubjects";
import { GetSubjectQuery, GetSubjectQueryHandler } from "../GetSubject";

describe("GetSubject", () => {
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

  it("should return a subject by id", () => {
    const repo = makeRepository();

    repo.getSubjectById = vi.fn().mockResolvedValue({
      id: "1",
      name: "Mathematics",
      color: "🟦",
    });

    const getSubjectCommand: GetSubjectQuery = { id: "1" };

    const handler = new GetSubjectQueryHandler(repo);

    expect(handler.handle(getSubjectCommand)).resolves.toEqual({
      id: "1",
      name: "Mathematics",
      color: "🟦",
    });

    expect(repo.getSubjectById).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if subject not found", () => {
    const repo = makeRepository();

    repo.getSubjectById = vi.fn().mockResolvedValue(null);

    const getSubjectCommand: GetSubjectQuery = { id: "1" };

    const handler = new GetSubjectQueryHandler(repo);

    expect(handler.handle(getSubjectCommand)).rejects.toThrow(Error);
    expect(repo.getSubjectById).toHaveBeenCalledTimes(1);
  });
});
