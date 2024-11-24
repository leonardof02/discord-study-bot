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
        var _a, _b;
        const userId = message.author.id;
        const subjectName = (0, SubjectRegex_1.getSubject)(args[0].split("\n")[0]);
        if (args[0] == null || subjectName == null) {
            message.channel.send(`No se ha especificado asignatura válida\n para estudiar de forma general usa \`!estudio_general\``);
            return;
        }
        const [_, ...endLineSplit] = args.join(" ").split("\n");
        const description = (_b = (_a = endLineSplit.join("\n")) !== null && _a !== void 0 ? _a : args.slice(1).join(" ")) !== null && _b !== void 0 ? _b : "";
        try {
            const activeChallenge = (0, GetActiveChallenge_1.GetActiveChallenge)(userId);
            if (!activeChallenge) {
                (0, StartStudySession_1.StartStudySession)(userId, subjectName);
                message.channel.send(`⏲️ <@${userId}> comenzaste a estudiar ${subjectName} ${description ? `\n📝 Descripción: ${description}` : ""}`);
                return;
            }
            if (activeChallenge.isActive) {
                message.channel.send(`⏲️ <@${userId}> ya estás estudiando ${subjectName}`);
                return;
            }
            const confirmButton = new discord_js_1.ButtonBuilder()
                .setCustomId(`${ButtonActions_1.default.StartStudySessionWithChallenge}@${subjectName}/${userId}/${description}`)
                .setLabel("SI")
                .setStyle(discord_js_1.ButtonStyle.Success);
            const cancelButton = new discord_js_1.ButtonBuilder()
                .setCustomId(`${ButtonActions_1.default.StartStudySessionWithoutChallenge}@${subjectName}/${userId}/$${description}`)
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
function finishStudySession(message, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = message.author.id;
        try {
            const finishedStudySessionData = yield (0, FinishStudySession_1.FinishStudySession)(userId);
            const challengeText = message.channel.send(`Terminada sesión de estudio de <@${userId}>${finishedStudySessionData.subjectName === "de forma general"
                ? ""
                : `\n🔖 Asignatura: ${finishedStudySessionData.subjectName}`}
  🕑 Tiempo Total: ${finishedStudySessionData.humanReadableTotalTime}
  💯 Puntuación obtenida: ${finishedStudySessionData.points}${finishedStudySessionData.challenge != null
                ? finishedStudySessionData.challengeCompleted
                    ? "\n✅ Reto completado con éxito\n➕ Puntos extra ganados"
                    : "\n❌ No has completado el reto\n➖ Has perdido todos los puntos del reto"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3R1ZHlTZXNzaW9uQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wcmVzZW50YXRpb24vY29udHJvbGxlcnMvU3R1ZHlTZXNzaW9uQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQW9CQSw4Q0FnRUM7QUFFRCw0REEwREM7QUFFRCxnREE0QkM7QUFFRCwwQ0F1QkM7QUFFRCx3REE2QkM7QUFFRCxnRUFnQ0M7QUFFRCxzRUFxQ0M7QUEvU0QsMkNBT29CO0FBRXBCLFlBQVk7QUFDWixvRkFBaUY7QUFDakYsc0ZBQW1GO0FBQ25GLDBGQUF1RjtBQUV2Rix1RUFBa0U7QUFDbEUsMEZBQXVGO0FBQ3ZGLHNGQUFtRjtBQUNuRiwrRUFBdUQ7QUFDdkQsa0RBQW9EO0FBRXBELFNBQXNCLGlCQUFpQixDQUNyQyxPQUFvRCxFQUNwRCxJQUFjOzs7UUFFZCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNqQyxNQUFNLFdBQVcsR0FBRyxJQUFBLHlCQUFVLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXZELElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFLENBQUM7WUFDM0MsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ2xCLG1HQUFtRyxDQUNwRyxDQUFDO1lBQ0YsT0FBTztRQUNULENBQUM7UUFDRCxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEQsTUFBTSxXQUFXLEdBQUcsTUFBQSxNQUFBLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxD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