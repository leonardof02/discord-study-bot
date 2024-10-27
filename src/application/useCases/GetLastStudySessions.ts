import * as ArchivedSessionsRepository from "../../infrastructure/repositories/ArchivedSessionsRepository";

export function GetLastStudySessions(numberOfSessions: number) {
  const lastSessions = ArchivedSessionsRepository.getLast(numberOfSessions);
  return lastSessions;
}
