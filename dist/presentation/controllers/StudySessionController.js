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
exports.startStudySession = startStudySession;
exports.startGeneralStudySession = startGeneralStudySession;
exports.finishStudySession = finishStudySession;
exports.getLastSessions = getLastSessions;
exports.changeSubjectOfSession = changeSubjectOfSession;
exports.acceptSessionWithChallenge = acceptSessionWithChallenge;
exports.acceptSessionWithoutChallenge = acceptSessionWithoutChallenge;
const discord_js_1 = require("discord.js");
// use cases
const StartStudySession_1 = require("../../application/useCases/StartStudySession");
const FinishStudySession_1 = require("../../application/useCases/FinishStudySession");
const GetLastStudySessions_1 = require("../../application/useCases/GetLastStudySessions");
const SubjectRegex_1 = require("../../application/utils/SubjectRegex");
const ChangeSessionSubject_1 = require("../../application/useCases/ChangeSessionSubject");
const GetActiveChallenge_1 = require("../../application/useCases/GetActiveChallenge");
const ButtonActions_1 = __importDefault(require("../constants/ButtonActions"));
const TimeUtils_1 = require("../utils/TimeUtils");
function startStudySession(message, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = message.author.id;
        const subjectName = (0, SubjectRegex_1.getSubject)(args.join(" "));
        if (args[0] == null || subjectName == null) {
            message.channel.send(`No se ha especificado asignatura válida\n para estudiar de forma general usa \`!estudio_general\``);
            return;
        }
        try {
            const activeChallenge = (0, GetActiveChallenge_1.GetActiveChallenge)(userId);
            if (!activeChallenge) {
                (0, StartStudySession_1.StartStudySession)(userId, subjectName);
                message.channel.send(`⏲️ <@${userId}> comenzaste a estudiar ${subjectName}`);
                return;
            }
            if (activeChallenge.isActive) {
                message.channel.send(`⏲️ <@${userId}> ya estás estudiando ${subjectName}`);
                return;
            }
            const confirmButton = new discord_js_1.ButtonBuilder()
                .setCustomId(`${ButtonActions_1.default.StartStudySessionWithChallenge}@${subjectName}/${userId}`)
                .setLabel("SI")
                .setStyle(discord_js_1.ButtonStyle.Success);
            const cancelButton = new discord_js_1.ButtonBuilder()
                .setCustomId(`${ButtonActions_1.default.StartStudySessionWithoutChallenge}@${subjectName}`)
                .setLabel("NO")
                .setStyle(discord_js_1.ButtonStyle.Danger);
            const row = new discord_js_1.ActionRowBuilder().addComponents(confirmButton, cancelButton);
            yield message.reply({
                content: `¿Quieres aceptar el reto de ${(0, TimeUtils_1.formatDuration)(activeChallenge.time)} en esta sesión?`,
                components: [row],
            });
        }
        catch (error) {
            message.channel.send(error.message);
        }
    });
}
function startGeneralStudySession(message, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = message.author.id;
        try {
            const activeChallenge = (0, GetActiveChallenge_1.GetActiveChallenge)(userId);
            if (!activeChallenge) {
                (0, StartStudySession_1.StartStudySession)(userId);
                message.channel.send(`⏲️ <@${userId}> comenzaste a estudiar de forma general`);
                return;
            }
            if (activeChallenge.isActive) {
                message.channel.send(`⏲️ <@${userId}> ya estás estudiando de forma general`);
                return;
            }
            const confirmButton = new discord_js_1.ButtonBuilder()
                .setCustomId(`${ButtonActions_1.default.StartStudySessionWithChallenge}@de forma general/${userId}`)
                .setLabel("SI")
                .setStyle(discord_js_1.ButtonStyle.Success);
            const cancelButton = new discord_js_1.ButtonBuilder()
                .setCustomId(`${ButtonActions_1.default.StartStudySessionWithoutChallenge}@de forma general`)
                .setLabel("NO")
                .setStyle(discord_js_1.ButtonStyle.Danger);
            const row = new discord_js_1.ActionRowBuilder().addComponents(confirmButton, cancelButton);
            yield message.reply({
                content: `¿Quieres aceptar el reto de ${(0, TimeUtils_1.formatDuration)(activeChallenge.time)} en esta sesión?`,
                components: [row],
            });
        }
        catch (error) {
            message.channel.send(error.message);
        }
    });
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
  💯 Puntuación obtenida: ${finishedStudySessionData.points}${finishedStudySessionData.challenge &&
                finishedStudySessionData.points > 0
                ? "\n✅ Reto completado con éxito\n➕ Puntos extra ganados"
                : ""}${finishedStudySessionData.points === 0
                ? "\n❌ No has completado el reto\n➖ Has perdido todos los puntos"
                : ""}
  🔑 ID SESIÓN: ${finishedStudySessionData.id}`);
            return;
        }
        catch (error) {
            message.channel.send(error.message);
        }
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
function changeSubjectOfSession(message, args) {
    const userId = message.author.id;
    if (!args[0]) {
        message.channel.send(`No se ha especificado asignatura válida para cambiar`);
        return;
    }
    const subjectName = (0, SubjectRegex_1.getSubject)(args[0]);
    if (!subjectName) {
        message.channel.send(`No se ha especificado asignatura válida para cambiar`);
        return;
    }
    try {
        (0, ChangeSessionSubject_1.ChangeSessionSubject)(userId, subjectName);
        message.channel.send(`⏲️ <@${userId}> cambió su asignatura a ${subjectName}`);
    }
    catch (error) {
        message.channel.send(error.message);
    }
}
function acceptSessionWithChallenge(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentUserId = interaction.user.id;
        const args = interaction.customId.split("@")[1];
        const [_, userId] = args.split("/");
        const activeChallenge = (0, GetActiveChallenge_1.GetActiveChallenge)(userId);
        if (!activeChallenge) {
            interaction.reply({
                content: `<@${userId}> no tiene un reto activado`,
                ephemeral: true,
            });
            return;
        }
        if (userId && userId !== currentUserId) {
            interaction.reply({
                content: `<@${userId}> no es tu sesión`,
                ephemeral: true,
            });
            return;
        }
        (0, StartStudySession_1.StartStudySession)(userId, undefined, activeChallenge);
        interaction.update({
            content: `⏲️ <@${userId}> comenzaste a estudiar de forma general aceptando el reto de ${(0, TimeUtils_1.formatDuration)(activeChallenge.time)}`,
            components: [],
        });
    });
}
function acceptSessionWithoutChallenge(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentUserId = interaction.user.id;
        const args = interaction.customId.split("@")[1];
        const [subjectName, userId] = args.split("/");
        if (!subjectName) {
            interaction.reply({
                content: `<@${userId}> no tiene una asignatura especificada`,
                ephemeral: true,
            });
            return;
        }
        if (userId && userId !== currentUserId) {
            interaction.reply({
                content: `<@${userId}> no es tu sesión`,
                ephemeral: true,
            });
            return;
        }
        (0, StartStudySession_1.StartStudySession)(userId, subjectName);
        interaction.update({
            content: `⏲️ <@${userId}> comenzaste a estudiar ${subjectName} sin reto`,
            components: [],
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3R1ZHlTZXNzaW9uQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wcmVzZW50YXRpb24vY29udHJvbGxlcnMvU3R1ZHlTZXNzaW9uQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQW9CQSw4Q0E0REM7QUFFRCw0REFvREM7QUFFRCxnREErQkM7QUFFRCwwQ0F1QkM7QUFFRCx3REE2QkM7QUFFRCxnRUFnQ0M7QUFFRCxzRUE0QkM7QUEvUkQsMkNBT29CO0FBRXBCLFlBQVk7QUFDWixvRkFBaUY7QUFDakYsc0ZBQW1GO0FBQ25GLDBGQUF1RjtBQUV2Rix1RUFBa0U7QUFDbEUsMEZBQXVGO0FBQ3ZGLHNGQUFtRjtBQUNuRiwrRUFBdUQ7QUFDdkQsa0RBQW9EO0FBRXBELFNBQXNCLGlCQUFpQixDQUNyQyxPQUFvRCxFQUNwRCxJQUFjOztRQUVkLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBRWpDLE1BQU0sV0FBVyxHQUFHLElBQUEseUJBQVUsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFL0MsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUMzQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDbEIsbUdBQW1HLENBQ3BHLENBQUM7WUFDRixPQUFPO1FBQ1QsQ0FBQztRQUVELElBQUksQ0FBQztZQUNILE1BQU0sZUFBZSxHQUFHLElBQUEsdUNBQWtCLEVBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUNyQixJQUFBLHFDQUFpQixFQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDdkMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ2xCLFFBQVEsTUFB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