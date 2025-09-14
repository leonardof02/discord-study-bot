export type SubjectColor =
  | "🟥"
  | "🟧"
  | "🟨"
  | "🟩"
  | "🟦"
  | "🟪"
  | "⬛️"
  | "⬜️";

export type Subject = {
  id: string;
  name: string;
  color: SubjectColor;
};