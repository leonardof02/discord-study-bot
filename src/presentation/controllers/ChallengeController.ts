import {
  OmitPartialGroupDMChannel,
  Message,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonInteraction,
  EmbedBuilder,
} from "discord.js";
import { CreateCustomChallenge } from "../../application/useCases/CreateCustomChallenge";
import { DeleteCustomChallenge } from "../../application/useCases/DeleteCustomChallenge";

import { parseTimeStringToSeconds } from "../utils/TimeUtils";
import ButtonActions from "../constants/ButtonActions";

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
    .setCustomId(ButtonActions.DeleteChallenge)
    .setLabel("Eliminar reto")
    .setStyle(ButtonStyle.Danger);

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

  try {
    CreateCustomChallenge(userId, timeInSeconds);
    message.channel.send({
      content: `⏲️ <@${userId}> ha creado un reto personalizado de ${timeString}`,
      components: [row],
    });
  } catch (error: any) {
    message.channel.send(error.message);
  }
}

/** Elimina un reto personalizado ya creado por el usuario
 * @param interaction La interacción resultado del boton de eliminar el reto
 */
export async function stopCustomChallenge(interaction: ButtonInteraction) {
  try {
    const userId = interaction.user.id;
    DeleteCustomChallenge(userId);
    interaction.update({
      content: `⏲️ <@${userId}> ha eliminado correctamente su reto personalizado`,
      components: [],
    });
  } catch (error: any) {
    const errorEmbed = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle("¡Error!")
      .setDescription(error.message)
      .setFooter({ text: "Error en el bot de estudio" });

    await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
  }
}
