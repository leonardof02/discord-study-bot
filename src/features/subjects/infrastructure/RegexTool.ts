export class RegexTool {
  private readonly accentMap: { [key: string]: string } = {
    a: "[aáÁ]",
    e: "[eéÉ]",
    i: "[iíÍ]",
    o: "[oóÓ]",
    u: "[uúÚüÜ]",
    n: "[nñÑ]",
  };

  createPartialMatchRegex(subject: string): RegExp {
    const regexParts = subject.split("").map((char) => {
      const lowerChar = char.toLowerCase();
      if (lowerChar in this.accentMap) {
        return this.accentMap[lowerChar as keyof typeof this.accentMap];
      }
      return lowerChar;
    });

    const regexString = regexParts.join("");
    return new RegExp(regexString, "i");
  }
}
