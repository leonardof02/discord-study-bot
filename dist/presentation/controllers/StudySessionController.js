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
exports.startStudySession = startStudySession;
exports.startGeneralStudySession = startGeneralStudySession;
exports.finishStudySession = finishStudySession;
exports.getRanking = getRanking;
exports.getDetailedRanking = getDetailedRanking;
exports.getLastSessions = getLastSessions;
// use cases
const StartStudySession_1 = require("../../application/useCases/StartStudySession");
const FinishStudySession_1 = require("../../application/useCases/FinishStudySession");
const GetStudyRanking_1 = require("../../application/useCases/GetStudyRanking");
const GetLastStudySessions_1 = require("../../application/useCases/GetLastStudySessions");
const SubjectRegex_1 = require("../../application/utils/SubjectRegex");
function startStudySession(message, args) {
    const userId = message.author.id;
    const subjectName = (0, SubjectRegex_1.getSubject)(args.join(" "));
    if (args[0] == null || subjectName == null) {
        message.channel.send(`No se ha especificado asignatura válida\n para estudiar de forma general usa \`!estudio_general\``);
        return;
    }
    try {
        (0, StartStudySession_1.StartStudySession)(userId, subjectName);
        message.channel.send(`⏲️ <@${userId}> comenzaste a estudiar ${subjectName}`);
    }
    catch (error) {
        message.channel.send(error.message);
    }
}
function startGeneralStudySession(message, args) {
    const userId = message.author.id;
    try {
        (0, StartStudySession_1.StartStudySession)(userId);
        message.channel.send(`⏲️ <@${userId}> comenzaste a estudiar de forma general`);
    }
    catch (error) {
        message.channel.send(error.message);
    }
}
function finishStudySession(message, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = message.author.id;
        try {
            const finishedStudySessionData = yield (0, FinishStudySession_1.FinishStudySession)(userId);
            message.channel.send(`Terminada sesión de estudio de <@${userId}>${finishedStudySessionData.subjectName === "de forma general"
                ? ""
                : `\n🔖 Asignatura: ${finishedStudySessionData.subjectName}`}
🕑 Tiempo Total: ${finishedStudySessionData.humanReadableTotalTime}
💯 Puntuación obtenida: ${finishedStudySessionData.points}
🔑 ID SESIÓN: ${finishedStudySessionData.id}`);
        }
        catch (error) {
            message.channel.send(error.message);
        }
    });
}
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
        const result = yield (0, GetStudyRanking_1.GetDetailedStudyRanking)();
        const ranking = Object.entries(result)
            .sort(([, subjectsA], [, subjectsB]) => {
            const totalPointsA = Object.values(subjectsA).reduce((a, b) => a + b, 0);
            const totalPointsB = Object.values(subjectsB).reduce((a, b) => a + b, 0);
            return totalPointsB - totalPointsA;
        })
            .map(([userId, subjects], index) => {
            const totalPoints = Object.values(subjects).reduce((a, b) => a + b, 0);
            const pointsString = `${totalPoints} puntos`;
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
function getLastSessions(message, args) {
    return __awaiter(this, void 0, void 0, function* () {
        let numberOfSessions = parseInt(args[0]);
        if (Number.isNaN(numberOfSessions))
            numberOfSessions = 10;
        const lastSessions = yield (0, GetLastStudySessions_1.GetLastStudySessions)(numberOfSessions);
        const response = (yield lastSessions).map((session, index) => `${index + 1} - <@${session.dataValues.userId}> estuvo estudiando \`${session.dataValues.subjectName}\` por un tiempo de \`${session.dataValues.humanReadableTotalTime}\` \`[${session.dataValues.id}] \``);
        message.channel.send(`📌 Últimas sesiones de estudio\n------------------------------------\n${response.join("\n")}`);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3R1ZHlTZXNzaW9uQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wcmVzZW50YXRpb24vY29udHJvbGxlcnMvU3R1ZHlTZXNzaW9uQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQWFBLDhDQXVCQztBQUVELDREQWNDO0FBRUQsZ0RBb0JDO0FBRUQsZ0NBbUJDO0FBRUQsZ0RBMENDO0FBRUQsMENBdUJDO0FBbEtELFlBQVk7QUFDWixvRkFBaUY7QUFDakYsc0ZBQW1GO0FBQ25GLGdGQUdvRDtBQUNwRCwwRkFBdUY7QUFFdkYsdUVBQWtFO0FBRWxFLFNBQWdCLGlCQUFpQixDQUMvQixPQUFvRCxFQUNwRCxJQUFjO0lBRWQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFFakMsTUFBTSxXQUFXLEdBQUcsSUFBQSx5QkFBVSxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUUvQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksV0FBVyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNsQixtR0FBbUcsQ0FDcEcsQ0FBQztRQUNGLE9BQU87SUFDVCxDQUFDO0lBRUQsSUFBSSxDQUFDO1FBQ0gsSUFBQSxxQ0FBaUIsRUFBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDdkMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ2xCLFFBQVEsTUFBTSwyQkFBMkIsV0FBVyxFQUFFLENBQ3ZELENBQUM7SUFDSixDQUFDO0lBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztRQUNwQixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEMsQ0FBQztBQUNILENBQUM7QUFFRCxTQUFn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