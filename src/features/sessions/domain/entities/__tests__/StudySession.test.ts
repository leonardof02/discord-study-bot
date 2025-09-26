import { describe, vi } from "vitest";
import { StudySession } from "../StudySession";

const fakeNow = 1_000_000_000_000;

describe("StudySession", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(fakeNow);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should start with 0 points", () => {
    const session = new StudySession({
      id: "session1",
      userId: "user1",
    });
    expect(session.points).toBe(0);
    expect(session.startTime).toBeUndefined();
    expect(session.totalTime).toBeUndefined();
  });

  it("start() should set startTime and activate challenge", () => {
    const challenge = { isActive: false, time: 60, isRandom: false };
    const session = new StudySession({ id: "1", userId: "u1", challenge });

    session.start();

    expect(session.startTime).toBe(fakeNow);
    expect(challenge.isActive).toBe(true);
  });

  it("finish() without start() should throw an error", () => {
    const session = new StudySession({ id: "1", userId: "u1" });
    expect(() => session.finish()).toThrow(
      Error("Session from <@u1> not started yet")
    );
  });

  it("finish() should calculate totalTime and points", () => {
    const session = new StudySession({ id: "1", userId: "u1" });
    session.start();

    vi.setSystemTime(fakeNow + 5 * 60 * 1000);

    session.finish();

    expect(session.totalTime).toBe(5 * 60 * 1000);
    expect(session.points).toBeCloseTo(5);
  });

  it("changeSubject() should change the subjectId", () => {
    const session = new StudySession({ id: "1", userId: "u1" });
    session.changeSubject("math");
    expect(session.subjectId).toBe("math");
  });

  it("humanReadableTotalTime should format correctly", () => {
    const session = new StudySession({ id: "1", userId: "u1" });
    session.start();
    vi.setSystemTime(fakeNow + 3_600_000 + 65_000); // 1h 1min 5s
    session.finish();

    expect(session.humanReadableTotalTime).toBe("01:01:05");
  });

  it("isChallengeCompleted should be true if the challenge time has passed", () => {
    const challenge = { isActive: false, time: 10, isRandom: false }; // 10s
    const session = new StudySession({ id: "1", userId: "u1", challenge });

    session.start();
    vi.setSystemTime(fakeNow + 11_000); // 11s have passed

    expect(session.isChallengeCompleted).toBe(true);
  });

  it("calculatePoints should double if the challenge is random", () => {
    const challenge = { isActive: false, time: 10, isRandom: true };
    const session = new StudySession({ id: "1", userId: "u1", challenge });

    session.start();
    vi.setSystemTime(fakeNow + 60_000); // 1 minute

    session.finish();

    // Normal serían 1 punto, pero como isRandom duplica = 2
    expect(session.points).toBeCloseTo(2);
  });
});
