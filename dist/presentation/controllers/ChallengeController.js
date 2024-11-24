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
exports.createCustomChallenge = createCustomChallenge;
exports.createRandomChallenge = createRandomChallenge;
exports.stopChallenge = stopChallenge;
exports.deleteChallenge = deleteChallenge;
const discord_js_1 = require("discord.js");
const CreateCustomChallenge_1 = require("../../application/useCases/CreateCustomChallenge");
const DeleteChallenge_1 = require("../../application/useCases/DeleteChallenge");
const TimeUtils_1 = require("../utils/TimeUtils");
const ButtonActions_1 = __importDefault(require("../constants/ButtonActions"));
const CreateRandomChallenge_1 = require("../../application/useCases/CreateRandomChallenge");
/** Crea un reto personalizado segun el tiempo indicado en el mensaje
 * @param message Mensaje enviado por el usuario
 * @param args Argumentos enviados por el usuario (tiempo en formato `xxh xxm xxs`)
 */
function createCustomChallenge(message, args) {
    const userId = message.author.id;
    if (!args[0]) {
        message.channel.send(`No se han especificado suficientes datos de tiempo del reto`);
        return;
    }
    const timeString = args.join(" ");
    let timeInSeconds = 0;
    try {
        timeInSeconds = (0, TimeUtils_1.parseTimeStringToSeconds)(timeString);
    }
    catch (error) {
        message.channel.send(error.message);
        return;
    }
    const button = new discord_js_1.ButtonBuilder()
        .setCustomId(ButtonActions_1.default.DeleteChallenge)
        .setLabel("Eliminar reto")
        .setStyle(discord_js_1.ButtonStyle.Danger);
    const row = new discord_js_1.ActionRowBuilder().addComponents(button);
    try {
        (0, CreateCustomChallenge_1.CreateCustomChallenge)(userId, timeInSeconds);
        message.channel.send({
            content: `⏲️ <@${userId}> ha creado un reto personalizado de ${timeString}`,
            components: [row],
        });
    }
    catch (error) {
        message.channel.send(error.message);
    }
}
/** Crea un reto aleatorio segun la dificultad indicada en el mensaje
 * @param message Mensaje enviado por el usuario
 * @param args Argumentos enviados por el usuario dificultad del reto (easy, medium, hard)
 */
function createRandomChallenge(message, args) {
    const userId = message.author.id;
    if (!args[0] ||
        (args[0] !== "easy" && args[0] !== "medium" && args[0] !== "hard")) {
        message.channel.send(`Especifica la dificultad del reto aleatorio (easy, medium, hard)`);
        return;
    }
    const timeByDifficulty = {
        easy: (0, TimeUtils_1.generateSecondsBetween)(3600, 3600 * 3),
        medium: (0, TimeUtils_1.generateSecondsBetween)(3600 * 3 + 1, 3600 * 6),
        hard: (0, TimeUtils_1.generateSecondsBetween)(3600 * 6 + 1, 3600 * 9),
    };
    let timeInSeconds = timeByDifficulty[args[0]];
    const button = new discord_js_1.ButtonBuilder()
        .setCustomId(ButtonActions_1.default.DeleteChallenge)
        .setLabel("Eliminar reto")
        .setStyle(discord_js_1.ButtonStyle.Danger);
    const row = new discord_js_1.ActionRowBuilder().addComponents(button);
    const timeString = (0, TimeUtils_1.formatDuration)(timeInSeconds);
    try {
        (0, CreateRandomChallenge_1.CreateRandomChallenge)(userId, timeInSeconds);
        message.channel.send({
            content: `⏲️ <@${userId}> ha creado un reto aleatorio de ${timeString}`,
            components: [row],
        });
    }
    catch (error) {
        message.channel.send(error.message);
    }
}
/** Elimina un reto personalizado ya creado por el usuario
 * @param interaction La interacción resultado del boton de eliminar el reto
 */
function stopChallenge(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = interaction.user.id;
            (0, DeleteChallenge_1.DeleteChallenge)(userId);
            interaction.update({
                content: `⏲️ <@${userId}> ha eliminado correctamente su reto`,
                components: [],
            });
        }
        catch (error) {
            const errorEmbed = new discord_js_1.EmbedBuilder()
                .setColor("#FF0000")
                .setTitle("¡Error!")
                .setDescription(error.message)
                .setFooter({ text: "Error en el bot de estudio" });
            yield interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    });
}
function deleteChallenge(message, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = message.author.id;
        try {
            (0, DeleteChallenge_1.DeleteChallenge)(userId);
            message.channel.send(`⏲️ <@${userId}> ha eliminado correctamente su reto`);
        }
        catch (error) {
            message.channel.send(error.message);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhbGxlbmdlQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wcmVzZW50YXRpb24vY29udHJvbGxlcnMvQ2hhbGxlbmdlQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQXdCQSxzREF1Q0M7QUFNRCxzREF5Q0M7QUFLRCxzQ0FpQkM7QUFFRCwwQ0FjQztBQXBKRCwyQ0FRb0I7QUFDcEIsNEZBQXlGO0FBQ3pGLGdGQUE2RTtBQUU3RSxrREFJNEI7QUFDNUIsK0VBQXVEO0FBQ3ZELDRGQUF5RjtBQUV6Rjs7O0dBR0c7QUFDSCxTQUFnQixxQkFBcUIsQ0FDbkMsT0FBb0QsRUFDcEQsSUFBYztJQUVkLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0lBRWpDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNiLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNsQiw2REFBNkQsQ0FDOUQsQ0FBQztRQUNGLE9BQU87SUFDVCxDQUFDO0lBRUQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVsQyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDdEIsSUFBSSxDQUFDO1FBQ0gsYUFBYSxHQUFHLElBQUEsb0NBQXdCLEVBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7UUFDcEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLE9BQU87SUFDVCxDQUFDO0lBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSwwQkFBYSxFQUFFO1NBQy9CLFdBQVcsQ0FBQyx1QkFBYSxDQUFDLGVBQWUsQ0FBQztTQUMxQyxRQUFRLENBQUMsZUFBZSxDQUFDO1NBQ3pCLFFBQVEs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