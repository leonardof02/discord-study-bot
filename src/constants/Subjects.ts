export const subjects = [
  "Historia de España",
  "Historia de la Filosofía",
  "Lengua Castellana y Literatura",
  "Inglés",
  "Dibujo Técnico",
  "Matemáticas",
  "Latín",
  "Geografía",
  "Historia del Arte",
  "Biología",
  "Química",
  "Física",
  "Latín",
];

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

export function getSubject(subjectName: string) {
  const regex = createPartialMatchRegex(subjectName);
  const matchedSubjects = subjects.filter((subject) => regex.test(subject));
  console.log(matchedSubjects);
  return matchedSubjects[0];
}
