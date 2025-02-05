"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRanking = getRanking;
exports.getDetailedRanking = getDetailedRanking;
// use cases
const GetDetailedRanking_1 = require("../../application/useCases/GetDetailedRanking");
const GetStudyRanking_1 = require("../../application/useCases/GetStudyRanking");
function getRanking(message, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield (0, GetStudyRanking_1.GetStudyRankingByUser)();
        const ranking = results.map((result, index) => {
            return `${index + 1} - <@${result.userId}> | ${result.totalPoints} Puntos`;
        });
        ranking[0] ? (ranking[0] = "🥇 " + ranking[0]) : "";
        ranking[1] ? (ranking[1] = "🥈 " + ranking[1]) : "";
        ranking[2] ? (ranking[2] = "🥉 " + ranking[2]) : "";
        message.channel.send(`🏆 Hall of fame\n------------------------------------\n${ranking.join("\n")}`);
    });
}
function getDetailedRanking(message, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, GetDetailedRanking_1.GetDetailedStudyRanking)();
        const ranking = Object.entries(result)
            .sort(([, subjectsA], [, subjectsB]) => {
            const totalPointsA = Object.values(subjectsA).reduce((a, b) => a + b, 0);
            const totalPointsB = Object.values(subjectsB).reduce((a, b) => a + b, 0);
            return totalPointsB - totalPointsA;
        })
            .map(([userId, subjects], index) => {
            const totalPoints = Object.values(subjects).reduce((a, b) => a + b, 0);
            const pointsString = `${totalPoints.toFixed(2)} puntos`;
            const pointsBySubjectString = Object.entries(subjects)
                .map(([subject, points]) => {
                return subject !== "de forma general"
                    ? `\t\t\t▫️ ${subject}: ${points} puntos`
                    : `\t\t\t▫️ Extras: ${points} puntos`;
            })
                .join("\n");
            console.log(subjects);
            console.log(pointsBySubjectString);
            return `${index + 1} - <@${userId}> (${pointsString})\n${pointsBySubjectString}`;
        });
        ranking[0] ? (ranking[0] = "🥇 " + ranking[0]) : "";
        ranking[1] ? (ranking[1] = "🥈 " + ranking[1]) : "";
        ranking[2] ? (ranking[2] = "🥉 " + ranking[2]) : "";
        message.channel.send(`🏆 Hall of fame\n------------------------------------\n${ranking.join("\n")}`);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFua2luZ0NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJlc2VudGF0aW9uL2NvbnRyb2xsZXJzL1JhbmtpbmdDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBTUEsZ0NBbUJDO0FBRUQsZ0RBMENDO0FBbkVELFlBQVk7QUFDWixzRkFBd0Y7QUFDeEYsZ0ZBQW1GO0FBRW5GLFNBQXNCLFVBQVUsQ0FDOUIsT0FBb0QsRUFDcEQsSUFBYzs7UUFFZCxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUEsdUNBQXFCLEdBQUUsQ0FBQztRQUU5QyxNQUFNLE9BQU8sR0FBYSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3RELE9BQU8sR0FBRyxLQUFLLEdBQUcsQ0FBQyxRQUFRLE1BQU0sQ0FBQyxNQUFNLE9BQU8sTUFBTSxDQUFDLFdBQVcsU0FBUyxDQUFDO1FBQzdFLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNwRCxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3BELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFFcEQsT0FBTyxDQUFDLE9BQU8s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