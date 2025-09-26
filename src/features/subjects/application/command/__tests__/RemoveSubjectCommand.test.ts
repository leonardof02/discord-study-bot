import { vi, describe, it } from "vitest";
import { ISubjectRepository } from "../../../domain/ISubjectRepository";
import {
  RemoveSubjectCommand,
  RemoveSubjectCommandHandler,
} from "../RemoveSubjectCommand";

describe("RemoveSubjectCommand", () => {
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

  it("should remove a subject by id", async () => {
    const repo = makeRepository();

    repo.removeSubject = vi.fn().mockResolvedValue(undefined);
    repo.getSubjectById = vi.fn().mockResolvedValue({
      id: "1",
      name: "Mathematics",
      color: "🟦",
    });

    const command: RemoveSubjectCommand = {
      id: "1",
    };

    const handler = new RemoveSubjectCommandHandler(repo);
    await handler.handle(command);

    expect(repo.removeSubject).toHaveBeenCalledTimes(1);
    expect(repo.getSubjectById).toHaveBeenCalledTimes(1);
  });

  it("should fail to remove a subject if not found", async () => {
    const repo = makeRepository();

    repo.removeSubject = vi.fn().mockResolvedValue(undefined);
    repo.getSubjectById = vi.fn().mockResolvedValue(null);

    const command: RemoveSubjectCommand = {
      id: "1",
    };

    const handler = new RemoveSubjectCommandHandler(repo);

    expect(handler.handle(command)).rejects.toThrow(Error);
    expect(repo.getSubjectById).toHaveBeenCalledTimes(1);
    expect(repo.removeSubject).not.toHaveBeenCalled();
  });
});
