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
exports.confirmFinishStudySession = confirmFinishStudySession;
exports.cancelFinishStudySession = cancelFinishStudySession;
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
const GetActiveStudySession_1 = __importDefault(require("../../application/useCases/GetActiveStudySession"));
function startStudySession(message, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = message.author.id;
        const subjectName = (0, SubjectRegex_1.getSubject)(args[0]);
        if (args[0] == null || subjectName == null) {
            message.channel.send(`No se ha especificado asignatura válida\n para estudiar de forma general usa \`!estudio_general\``);
            return;
        }
        // TODO: Fix input description
        // const [_, ...endLineSplit] = args.join(" ").split("\n");
        // const description = endLineSplit.join("\n") ?? args.slice(1).join(" ") ?? "";
        try {
            const activeChallenge = (0, GetActiveChallenge_1.GetActiveChallenge)(userId);
            const activeStudySession = (0, GetActiveStudySession_1.default)(userId);
            if (!activeChallenge) {
                (0, StartStudySession_1.StartStudySession)(userId, subjectName);
                message.channel.send(`⏲️ <@${userId}> comenzaste a estudiar ${subjectName}`);
                return;
            }
            if (activeStudySession) {
                message.channel.send(`⏲️ <@${userId}> ya estás estudiando ${subjectName}`);
                return;
            }
            const confirmButton = new discord_js_1.ButtonBuilder()
                .setCustomId(`${ButtonActions_1.default.StartStudySessionWithChallenge}@${subjectName}/${userId}/`)
                .setLabel("SI")
                .setStyle(discord_js_1.ButtonStyle.Success);
            const cancelButton = new discord_js_1.ButtonBuilder()
                .setCustomId(`${ButtonActions_1.default.StartStudySessionWithoutChallenge}@${subjectName}/${userId}/`)
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
        const descriptionSlice = message.content.split(" ").slice(1).join(" ");
        const description = descriptionSlice !== null && descriptionSlice !== void 0 ? descriptionSlice : "";
        console.log("DESCRIPCCCION:!!!!! ", description);
        try {
            const activeChallenge = (0, GetActiveChallenge_1.GetActiveChallenge)(userId);
            if (!activeChallenge) {
                (0, StartStudySession_1.StartStudySession)(userId);
                message.channel.send(`⏲️ <@${userId}> comenzaste a estudiar de forma general ${description ? `\n📝 Descripción: ${description}` : ""}`);
                return;
            }
            if (activeChallenge.isActive) {
                message.channel.send(`⏲️ <@${userId}> ya estás estudiando de forma general`);
                return;
            }
            const confirmButton = new discord_js_1.ButtonBuilder()
                .setCustomId(`${ButtonActions_1.default.StartStudySessionWithChallenge}@de forma general/${userId}//${description}`)
                .setLabel("SI")
                .setStyle(discord_js_1.ButtonStyle.Success);
            const cancelButton = new discord_js_1.ButtonBuilder()
                .setCustomId(`${ButtonActions_1.default.StartStudySessionWithoutChallenge}@de forma general//${description}`)
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
function confirmFinishStudySession(message, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = message.author.id;
        const existingSession = (0, GetActiveStudySession_1.default)(userId);
        if (!existingSession) {
            message.channel.send({
                content: `<@${userId}> no tiene una sesión de estudio activa`,
            });
            return;
        }
        const yesButton = new discord_js_1.ButtonBuilder()
            .setCustomId(ButtonActions_1.default.ConfirmFinishStudySession)
            .setLabel("SI")
            .setStyle(discord_js_1.ButtonStyle.Success);
        const noButton = new discord_js_1.ButtonBuilder()
            .setCustomId(ButtonActions_1.default.CancelFinishStudySession)
            .setLabel("NO")
            .setStyle(discord_js_1.ButtonStyle.Danger);
        const row = new discord_js_1.ActionRowBuilder().addComponents(yesButton, noButton);
        yield message.reply({
            content: `¿Quieres terminar la sesión de estudio?`,
            components: [row],
        });
    });
}
function cancelFinishStudySession(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = interaction.user.id;
        interaction.update({
            content: `⏲️ <@${userId}> continúa estudiando`,
            components: [],
        });
    });
}
function finishStudySession(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = interaction.user.id;
        try {
            const finishedStudySessionData = yield (0, FinishStudySession_1.FinishStudySession)(userId);
            const { subjectName, challengeCompleted, challenge, humanReadableTotalTime, points, id, } = finishedStudySessionData;
            const replyText = `Terminada sesión de estudio de <@${userId}>${subjectName === "de forma general"
                ? ""
                : `\n🔖 Asignatura: ${subjectName}`}
  🕑 Tiempo Total: ${humanReadableTotalTime}
  💯 Puntuación obtenida: ${points}${challenge != null
                ? challengeCompleted
                    ? "\n✅ Reto completado con éxito\n➕ Puntos extra ganados"
                    : "\n❌ No has completado el reto\n➖ Has perdido todos los puntos del reto"
                : ""}
  🔑 ID SESIÓN: ${id}`;
            interaction.update({
                content: replyText,
                components: [],
            });
            return;
        }
        catch (error) {
            interaction.reply(error.message);
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
        const [subjectName, userId, description] = args.split("/");
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
        (0, StartStudySession_1.StartStudySession)(userId, subjectName, activeChallenge);
        interaction.update({
            content: `⏲️ <@${userId}> comenzaste a estudiar ${subjectName} aceptando el reto de ${(0, TimeUtils_1.formatDuration)(activeChallenge.time)}\n📝 Descripción: ${description}`,
            components: [],
        });
    });
}
function acceptSessionWithoutChallenge(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentUserId = interaction.user.id;
        const args = interaction.customId.split("@")[1];
        const [subjectName, userId, description] = args.split("/");
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
        try {
            (0, StartStudySession_1.StartStudySession)(userId, subjectName);
        }
        catch (error) {
            interaction.reply({
                content: error.message,
                ephemeral: true,
            });
            return;
        }
        interaction.update({
            content: `⏲️ <@${userId}> comenzaste a estudiar ${subjectName} sin reto \n📝 Descripción: ${description}`,
            components: [],
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3R1ZHlTZXNzaW9uQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wcmVzZW50YXRpb24vY29udHJvbGxlcnMvU3R1ZHlTZXNzaW9uQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQXNCQSw4Q0FpRUM7QUFFRCw0REEwREM7QUFFRCw4REFpQ0M7QUFFRCw0REFPQztBQUVELGdEQXNDQztBQUVELDBDQXVCQztBQUVELHdEQTZCQztBQUVELGdFQWdDQztBQUVELHNFQXFDQztBQXhXRCwyQ0FPb0I7QUFFcEIsWUFBWTtBQUNaLG9GQUFpRjtBQUNqRixzRkFBbUY7QUFDbkYsMEZBQXVGO0FBRXZGLHVFQUFrRTtBQUNsRSwwRkFBdUY7QUFDdkYsc0ZBQW1GO0FBQ25GLCtFQUF1RDtBQUN2RCxrREFBb0Q7QUFFcEQsNkdBQXFGO0FBRXJGLFNBQXNCLGlCQUFpQixDQUNyQyxPQUFvRCxFQUNwRCxJQUFjOztRQUVkLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2pDLE1BQU0sV0FBVyxHQUFHLElBQUEseUJBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV4QyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksV0FBVyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNsQixtR0FBbUcsQ0FDcEcsQ0FBQztZQUNGLE9BQU87UUFDVCxDQUFDO1FBRUQsOEJBQThCO1FBQzlCLDJEQUEyRDtRQUMzRCxnRkFBZ0Y7UUFFaEYsSUFBSSxDQUFDO1lBQ0gsTUFBTSxlQUFlLEdBQUcsSUFBQSx1Q0FBa0IsRUFBQyxNQUFNLENBQUMsQ0FBQztZQUNuRCxNQUFNLGtCQUFrQixHQUFHLElBQUEsK0JBQXFCLEVBQUMsTUFBTSxDQUFDLENBQUM7WUFFekQs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