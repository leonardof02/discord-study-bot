import {
  OmitPartialGroupDMChannel,
  Message,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} from "discord.js";
import SessionButtonActions from "../../constants/SessionInteractions";
import { parseTimeStringToSeconds } from "../../../../../shared/presentation/utils/TimeUtils";
import { createCustomChallengeCommandHandler } from "../../../DependencyInjection";

/** Crea un reto personalizado segun el tiempo indicado en el mensaje
 * @param message Mensaje enviado por el usuario
 * @param args Argumentos enviados por el usuario (tiempo en formato `xxh xxm xxs`)
 */
export function createCustomChallenge(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const userId = message.author.id;

  if (!args[0]) {
    message.channel.send(
      `No se han especificado suficientes datos de tiempo del reto`
    );
    return;
  }

  const timeString = args.join(" ");

  let timeInSeconds = 0;
  try {
    timeInSeconds = parseTimeStringToSeconds(timeString);
  } catch (error: any) {
    message.channel.send(error.message);
    return;
  }

  const button = new ButtonBuilder()
    .setCustomId(SessionButtonActions.DeleteChallenge)
    .setLabel("Eliminar reto")
    .setStyle(ButtonStyle.Danger);

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

  try {
    createCustomChallengeCommandHandler.handle({ userId, time: timeInSeconds });
    message.channel.send({
      content: `⏲️ <@${userId}> ha creado un reto personalizado de ${timeString}`,
      components: [row],
    });
  } catch (error: any) {
    message.channel.send(error.message);
  }
}
