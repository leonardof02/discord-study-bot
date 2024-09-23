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
const ArchivedStudySession_1 = require("../db/ArchivedStudySession");
const DbConnection_1 = __importDefault(require("../db/DbConnection"));
const Subjects_1 = require("../constants/Subjects");
exports.activeStudySessions = {};
function startStudySession(message, args) {
    const userId = message.author.id;
    if (exports.activeStudySessions[userId]) {
        message.channel.send(`Lo siento <@${userId}> ya estás estudiando ${exports.activeStudySessions[userId].subjectName}`);
        return;
    }
    const subjectName = (0, Subjects_1.getSubject)(args.join(" "));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3R1ZHlTZXNzaW9uTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9TdHVkeVNlc3Npb25NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQVVBLDhDQThCQztBQUVELDREQXVCQztBQUVELDBDQXNDQztBQUVELGdDQTJCQztBQUVELDBDQXdCQztBQWhLRCxxRUFHb0M7QUFFcEMsc0VBQThDO0FBQzlDLG9EQUFtRDtBQUV0QyxRQUFBLG1CQUFtQixHQUFpQyxFQUFFLENBQUM7QUFFcEUsU0FBZ0IsaUJBQWlCLENBQy9CLE9BQW9ELEVBQ3BELElBQWM7SUFFZCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUVqQyxJQUFJLDJCQUFtQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDaEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ2xCLGVBQWUsTUFBTSx5QkFBeUIsMkJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQ3hGLENBQUM7UUFDRixPQUFPO0lBQ1QsQ0FBQztJQUVELE1BQU0sV0FBVyxHQUFHLElBQUEscUJBQVUsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFL0MsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMzQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDbEIsbUdBQW1HLENBQ3BHLENBQUM7UUFDRixPQUFPO0lBQ1QsQ0FBQztJQUVELDJCQUFtQixDQUFDLE1BQU0sQ0FBQyxHQUFHO1FBQzVCLFNBQVMsRUFBRSxDQUFDO1FBQ1osU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDckIsV0FBVztRQUNYLE1BQU0sRUFBRSxDQUFDO0tBQ1YsQ0FBQztJQUVG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