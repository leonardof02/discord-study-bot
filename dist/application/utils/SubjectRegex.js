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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ViamVjdFJlZ2V4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcGxpY2F0aW9uL3V0aWxzL1N1YmplY3RSZWdleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQXdCQSxnQ0FLQztBQTdCRCxvREFBaUQ7QUFFakQsTUFBTSxTQUFTLEdBQThCO0lBQzNDLENBQUMsRUFBRSxPQUFPO0lBQ1YsQ0FBQyxFQUFFLE9BQU87SUFDVixDQUFDLEVBQUUsT0FBTztJQUNWLENBQUMsRUFBRSxPQUFPO0lBQ1YsQ0FBQyxFQUFFLFNBQVM7SUFDWixDQUFDLEVBQUUsT0FBTztDQUNYLENBQUM7QUFFRixTQUFTLHVCQUF1QixDQUFDLE9BQWU7SUFDOUMsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNoRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsSUFBSSxTQUFTLElBQUksU0FBUyxFQUFFLENBQUM7WUFDM0IsT0FBTyxTQUFTLENBQUMsU0FBbUMsQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDdEMsQ0FBQztBQUVELFNBQWdCLFVBQVUsQ0FBQyxXQUFtQjtJQUM1QyxJQUFJLFdBQVcsSUFBSSxPQUFPO1FBQUUsT0FBTyxhQUFhLENBQUM7SUFDakQsTUFBTSxLQUFLLEdBQUcsdUJBQXVCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbkQsTUFBTSxlQUFlLEdBQUcsbUJBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMxRSxPQUFPLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QixDQUFDIn0=