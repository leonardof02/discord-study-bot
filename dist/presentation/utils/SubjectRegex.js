"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubject = getSubject;
const Subjects_1 = require("../../domain/Subjects");
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
    const matchedSubjects = Subjects_1.Subjects.filter((subject) => regex.test(subject));
    return matchedSubjects[0];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ViamVjdFJlZ2V4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3ByZXNlbnRhdGlvbi91dGlscy9TdWJqZWN0UmVnZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUF3QkEsZ0NBS0M7QUE3QkQsb0RBQWlEO0FBRWpELE1BQU0sU0FBUyxHQUE4QjtJQUMzQyxDQUFDLEVBQUUsT0FBTztJQUNWLENBQUMsRUFBRSxPQUFPO0lBQ1YsQ0FBQyxFQUFFLE9BQU87SUFDVixDQUFDLEVBQUUsT0FBTztJQUNWLENBQUMsRUFBRSxTQUFTO0lBQ1osQ0FBQyxFQUFFLE9BQU87Q0FDWCxDQUFDO0FBRUYsU0FBUyx1QkFBdUIsQ0FBQyxPQUFlO0lBQzlDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDaEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksU0FBUyxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQzNCLE9BQU8sU0FBUyxDQUFDLFNBQW1DLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3RDLENBQUM7QUFFRCxTQUFnQixVQUFVLENBQUMsV0FBbUI7SUFDNUMsSUFBSSxXQUFXLElBQUksT0FBTztRQUFFLE9BQU8sYUFBYSxDQUFDO0lBQ2pELE1BQU0sS0FBSyxHQUFHLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25ELE1BQU0sZUFBZSxHQUFHLG1CQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDMUUsT0FBTyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUIsQ0FBQyJ9