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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activeStudySessions = void 0;
exports.startStudySession = startStudySession;
exports.startGeneralStudySession = startGeneralStudySession;
exports.endStudySession = endStudySession;
exports.getRanking = getRanking;
exports.getLastSessions = getLastSessions;
const ArchivedStudySession_1 = require("../../infrastructure/ArchivedStudySession");
const DbConnection_1 = __importDefault(require("../../infrastructure/DbConnection"));
const SubjectRegex_1 = require("../utils/SubjectRegex");
exports.activeStudySessions = {};
function startStudySession(message, args) {
    const userId = message.author.id;
    if (exports.activeStudySessions[userId]) {
        message.channel.send(`Lo siento <@${userId}> ya estás estudiando ${exports.activeStudySessions[userId].subjectName}`);
        return;
    }
    const subjectName = (0, SubjectRegex_1.getSubject)(args.join(" "));
    if (args[0] == null || subjectName == null) {
        message.channel.send(`No se ha especificado asignatura válida\n para estudiar de forma general usa \`!estudio_general\``);
        return;
    }
    exports.activeStudySessions[userId] = {
        totalTime: 0,
        startTime: Date.now(),
        subjectName,
        points: 0,
    };
    message.channel.send(`⏲️ <@${userId}> comenzaste a estudiar ${subjectName}`);
}
function startGeneralStudySession(message, args) {
    const userId = message.author.id;
    if (exports.activeStudySessions[userId]) {
        message.channel.send(`Lo siento <@${userId}> ya estás estudiando ${exports.activeStudySessions[userId].subjectName}`);
        return;
    }
    exports.activeStudySessions[userId] = {
        totalTime: 0,
        startTime: Date.now(),
        subjectName: "de forma general",
        points: 0,
    };
    message.channel.send(`⏲️ <@${userId}> comenzaste a estudiar de forma general`);
}
function endStudySession(message, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = message.author.id;
        if (!exports.activeStudySessions[userId]) {
            message.channel.send(`<@${userId}> no has iniciado ninguna sesión de estudio`);
            return;
        }
        const totalTime = Date.now() - exports.activeStudySessions[userId].startTime;
        const finishedStudySessionData = {
            totalTime,
            subjectName: exports.activeStudySessions[userId].subjectName,
            startTime: exports.activeStudySessions[userId].startTime,
            points: Math.round(((Date.now() - exports.activeStudySessions[userId].startTime) / (1000 * 60)) *
                100) / 100,
            humanReadableTotalTime: msToTime(totalTime),
            userId: message.author.id,
        };
        (yield ArchivedStudySession_1.ArchivedStudySession.create(finishedStudySessionData)).save();
        delete exports.activeStudySessions[userId];
        message.channel.send(`Terminada sesión de estudio de <@${userId}>${finishedStudySessionData.subjectName === "de forma general"
            ? ""
            : `🔖 Asignatura: ${finishedStudySessionData.subjectName}}`}
🕑 Tiempo Total: ${finishedStudySessionData.humanReadableTotalTime}
💯 Puntuación obtenida: ${finishedStudySessionData.points}`);
    });
}
function getRanking(message, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = (yield ArchivedStudySession_1.ArchivedStudySession.findAll({
            attributes: [
                "userId",
                [DbConnection_1.default.fn("SUM", DbConnection_1.default.col("points")), "totalPoints"],
            ],
            group: ["userId"],
            order: [[DbConnection_1.default.fn("SUM", DbConnection_1.default.col("points")), "DESC"]],
        }));
        const ranking = results.map((result, index) => {
            const { userId, totalPoints } = result.get({ plain: true });
            return `${index + 1} - <@${userId}> | ${totalPoints} Puntos`;
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
        const lastSessions = ArchivedStudySession_1.ArchivedStudySession.findAll({
            order: [["createdAt", "DESC"]],
            limit: numberOfSessions,
        });
        const response = (yield lastSessions).map((session, index) => `${index + 1} <@${session.dataValues.userId}> estuvo estudiando \`${session.dataValues.subjectName}\` por un tiempo de \`${session.dataValues.humanReadableTotalTime}\``);
        message.channel.send(`📌 Últimas sesiones de estudio\n------------------------------------\n${response.join("\n")}`);
    });
}
function msToTime(duration) {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3R1ZHlTZXNzaW9uTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wcmVzZW50YXRpb24vc2VydmljZXMvU3R1ZHlTZXNzaW9uTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFVQSw4Q0E4QkM7QUFFRCw0REF1QkM7QUFFRCwwQ0FzQ0M7QUFFRCxnQ0EyQkM7QUFFRCwwQ0F3QkM7QUFoS0Qsb0ZBR21EO0FBRW5ELHFGQUE2RDtBQUM3RCx3REFBbUQ7QUFFdEMsUUFBQSxtQkFBbUIsR0FBaUMsRUFBRSxDQUFDO0FBRXBFLFNBQWdCLGlCQUFpQixDQUMvQixPQUFvRCxFQUNwRCxJQUFjO0lBRWQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFFakMsSUFBSSwyQkFBbUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNsQixlQUFlLE1BQU0seUJBQXlCLDJCQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUN4RixDQUFDO1FBQ0YsT0FBTztJQUNULENBQUM7SUFFRCxNQUFNLFdBQVcsR0FBRyxJQUFBLHlCQUFVLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRS9DLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFLENBQUM7UUFDM0MsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ2xCLG1HQUFtRyxDQUNwRyxDQUFDO1FBQ0YsT0FBTztJQUNULENBQUM7SUFFRCwyQkFBbUIsQ0FBQyxNQUFNLENBQUMsR0FBRztRQUM1QixTQUFTLEVBQUUsQ0FBQztRQUNaLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ3JCLFdBQVc7UUFDWCxNQUFNLEVBQUUsQ0FB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