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
exports.stopCustomChallenge = stopCustomChallenge;
const discord_js_1 = require("discord.js");
const CreateCustomChallenge_1 = require("../../application/useCases/CreateCustomChallenge");
const DeleteCustomChallenge_1 = require("../../application/useCases/DeleteCustomChallenge");
const TimeUtils_1 = require("../utils/TimeUtils");
const ButtonActions_1 = __importDefault(require("../constants/ButtonActions"));
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
/** Elimina un reto personalizado ya creado por el usuario
 * @param interaction La interacción resultado del boton de eliminar el reto
 */
function stopCustomChallenge(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = interaction.user.id;
            (0, DeleteCustomChallenge_1.DeleteCustomChallenge)(userId);
            interaction.update({
                content: `⏲️ <@${userId}> ha eliminado correctamente su reto personalizado`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhbGxlbmdlQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wcmVzZW50YXRpb24vY29udHJvbGxlcnMvQ2hhbGxlbmdlQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQW1CQSxzREF1Q0M7QUFLRCxrREFpQkM7QUFoRkQsMkNBUW9CO0FBQ3BCLDRGQUF5RjtBQUN6Riw0RkFBeUY7QUFFekYsa0RBQThEO0FBQzlELCtFQUF1RDtBQUV2RDs7O0dBR0c7QUFDSCxTQUFnQixxQkFBcUIsQ0FDbkMsT0FBb0QsRUFDcEQsSUFBYztJQUVkLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0lBRWpDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNiLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNsQiw2REFBNkQsQ0FDOUQsQ0FBQztRQUNGLE9BQU87SUFDVCxDQUFDO0lBRUQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVsQyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDdEIsSUFBSSxDQUFDO1FBQ0gsYUFBYSxHQUFHLElBQUEsb0NBQXdCLEVBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7UUFDcEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLE9BQU87SUFDVCxDQUFDO0lBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSwwQkFBYSxFQUFFO1NBQy9CLFdBQVcsQ0FBQyx1QkFBYSxDQUFDLGVBQWUsQ0FBQztTQUMxQyxRQUFRLENBQUMsZUFBZSxDQUFDO1NBQ3pCLFFBQVEsQ0FBQyx3QkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRWhDLE1BQU0sR0FBRyxHQUFHLElBQUksNkJBQWdCLEVBQWlCLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXhFLElBQUksQ0FBQztRQUNILElBQUEsNkNBQXFCLEVBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ25CLE9BQU8sRUFBRSxRQUFRLE1BQU0sd0NBQXdDLFVBQVUsRUFBRTtZQUMzRSxVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUM7U0FDbEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7UUFDcEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7QUFDSCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFzQixtQkFBbUIsQ0FBQyxXQUE4Qjs7UUFDdEUsSUFBSSxDQUFDO1lBQ0gsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDbkMsSUFBQSw2Q0FBcUIsRUFBQyxNQUFNLENBQUMsQ0FBQztZQUM5QixXQUFXLENBQUMsTUFBTSxDQUFDO2dCQUNqQixPQUFPLEVBQUUsUUFBUSxNQUFNLG9EQUFvRDtnQkFDM0UsVUFBVSxFQUFFLEVBQUU7YUFDZixDQUFDLENBQUM7UUFDTCxDQUFDO1FBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztZQUNwQixNQUFNLFVBQVUsR0FBRyxJQUFJLHlCQUFZLEVBQUU7aUJBQ2xDLFFBQVEsQ0FBQyxTQUFTLENBQUM7aUJBQ25CLFFBQVEsQ0FBQyxTQUFTLENBQUM7aUJBQ25CLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO2lCQUM3QixTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsNEJBQTRCLEVBQUUsQ0FBQyxDQUFDO1lBRXJELE1BQU0sV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7SUFDSCxDQUFDO0NBQUEifQ==