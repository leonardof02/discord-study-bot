import { describe, vi } from "vitest";
import {
  AddSubjectCommand,
  AddSubjectCommandHandler,
} from "../AddSubjectCommand";
import { ISubjectRepository } from "../../../domain/ISubjectRepository";
import { SubjectColor } from "../../../domain/Subject";

describe("AddSubjectCommand", () => {
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

  it("should add a new subject if not exists", async () => {
    const repo = makeRepository();

    repo.findSubjectByName = vi.fn().mockResolvedValue(null);
    repo.addSubject = vi.fn().mockResolvedValue(undefined);

    const command: AddSubjectCommand = {
      name: "Mathematics",
      color: "🟦",
    };

    const handler = new AddSubjectCommandHandler(repo);
    await handler.handle(command);

    expect(repo.addSubject).toHaveBeenCalledTimes(1);
    expect(repo.findSubjectByName).toHaveBeenCalledTimes(1);
  });

  it("should fail to add a new subject if already exists", async () => {
    const repo = makeRepository();

    repo.findSubjectByName = vi
      .fn()
      .mockResolvedValue({ id: "1", name: "Mathematics", color: "🟦" });
    repo.addSubject = vi.fn().mockResolvedValue(undefined);

    const command: AddSubjectCommand = {
      name: "Mathematics",
      color: "🟦",
    };

    const handler = new AddSubjectCommandHandler(repo);

    expect(handler.handle(command)).rejects.toThrow(Error);
    expect(repo.findSubjectByName).toHaveBeenCalledTimes(1);
    expect(repo.addSubject).not.toHaveBeenCalled();
  });
});
