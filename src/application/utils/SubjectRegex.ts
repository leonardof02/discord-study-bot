import { Subjects } from "../../domain/Subjects";

const accentMap: { [key: string]: string } = {
  a: "[aáÁ]",
  e: "[eéÉ]",
  i: "[iíÍ]",
  o: "[oóÓ]",
  u: "[uúÚüÜ]",
  n: "[nñÑ]",
};

function createPartialMatchRegex(subject: string): RegExp {
  const regexParts = subject.split("").map((char) => {
    const lowerChar = char.toLowerCase();
    if (lowerChar in accentMap) {
      return accentMap[lowerChar as keyof typeof accentMap];
    }
    return lowerChar;
  });

  const regexString = regexParts.join("");
  return new RegExp(regexString, "i");
}

export function getSubject(subjectName?: string) {
  if (!subjectName) return null;

  // aliases
  if (subjectName == "mates") return "Matemáticas";

  const regex = createPartialMatchRegex(subjectName);
  const matchedSubjects = Subjects.filter((subject) => regex.test(subject));
  return matchedSubjects[0];
}
