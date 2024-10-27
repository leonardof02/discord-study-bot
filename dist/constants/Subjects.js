"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjects = void 0;
exports.getSubject = getSubject;
exports.subjects = [
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
const accentMap = {
    a: "[aáÁ]",
    e: "[eéÉ]",
    i: "[iíÍ]",
    o: "[oóÓ]",
    u: "[uúÚüÜ]",
    n: "[nñÑ]",
};
function createPartialMatchRegex(subject) {
    const regexParts = subject.split("").map((char) => {
        const lowerChar = char.toLowerCase();
        if (lowerChar in accentMap) {
            return accentMap[lowerChar];
        }
        return lowerChar;
    });
    const regexString = regexParts.join("");
    return new RegExp(regexString, "i");
}
function getSubject(subjectName) {
    if (subjectName == "mates")
        return "Matemáticas";
    const regex = createPartialMatchRegex(subjectName);
    const matchedSubjects = exports.subjects.filter((subject) => regex.test(subject));
    return matchedSubjects[0];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ViamVjdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uc3RhbnRzL1N1YmplY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQXNDQSxnQ0FLQztBQTNDWSxRQUFBLFFBQVEsR0FBRztJQUN0QixvQkFBb0I7SUFDcEIsMEJBQTBCO0lBQzFCLGdDQUFnQztJQUNoQyxRQUFRO0lBQ1IsZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixPQUFPO0lBQ1AsV0FBVztJQUNYLG1CQUFtQjtJQUNuQixVQUFVO0lBQ1YsU0FBUztJQUNULFFBQVE7SUFDUixPQUFPO0NBQ1IsQ0FBQztBQUVGLE1BQU0sU0FBUyxHQUE4QjtJQUMzQyxDQUFDLEVBQUUsT0FBTztJQUNWLENBQUMsRUFBRSxPQUFPO0lBQ1YsQ0FBQyxFQUFFLE9BQU87SUFDVixDQUFDLEVBQUUsT0FBTztJQUNWLENBQUMsRUFBRSxTQUFTO0lBQ1osQ0FBQyxFQUFFLE9BQU87Q0FDWCxDQUFDO0FBRUYsU0FBUyx1QkFBdUIsQ0FBQyxPQUFlO0lBQzlDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDaEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksU0FBUyxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQzNCLE9BQU8sU0FBUyxDQUFDLFNBQW1DLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3RDLENBQUM7QUFFRCxTQUFnQixVQUFVLENBQUMsV0FBbUI7SUFDNUMsSUFBSSxXQUFXLElBQUksT0FBTztRQUFFLE9BQU8sYUFBYSxDQUFDO0lBQ2pELE1BQU0sS0FBSyxHQUFHLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25ELE1BQU0sZUFBZSxHQUFHLGdCQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDMUUsT0FBTyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUIsQ0FBQyJ9