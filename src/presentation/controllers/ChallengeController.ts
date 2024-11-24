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
import { DeleteChallenge } from "../../application/useCases/DeleteChallenge";

import {
  formatDuration,
  generateSecondsBetween,
  parseTimeStringToSeconds,
} from "../utils/TimeUtils";
import ButtonActions from "../constants/ButtonActions";
import { CreateRandomChallenge } from "../../application/useCases/CreateRandomChallenge";

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

/** Crea un reto aleatorio segun la dificultad indicada en el mensaje
 * @param message Mensaje enviado por el usuario
 * @param args Argumentos enviados por el usuario dificultad del reto (easy, medium, hard)
 */
export function createRandomChallenge(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const userId = message.author.id;

  if (
    !args[0] ||
    (args[0] !== "easy" && args[0] !== "medium" && args[0] !== "hard")
  ) {
    message.channel.send(
      `Especifica la dificultad del reto aleatorio (easy, medium, hard)`
    );
    return;
  }

  const timeByDifficulty: Record<string, number> = {
    easy: generateSecondsBetween(3600, 3600 * 3),
    medium: generateSecondsBetween(3600 * 3 + 1, 3600 * 6),
    hard: generateSecondsBetween(3600 * 6 + 1, 3600 * 9),
  };

  let timeInSeconds = timeByDifficulty[args[0]];

  const button = new ButtonBuilder()
    .setCustomId(ButtonActions.DeleteChallenge)
    .setLabel("Eliminar reto")
    .setStyle(ButtonStyle.Danger);

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

  const timeString = formatDuration(timeInSeconds);
  try {
    CreateRandomChallenge(userId, timeInSeconds);
    message.channel.send({
      content: `⏲️ <@${userId}> ha creado un reto aleatorio de ${timeString}`,
      components: [row],
    });
  } catch (error: any) {
    message.channel.send(error.message);
  }
}

/** Elimina un reto personalizado ya creado por el usuario
 * @param interaction La interacción resultado del boton de eliminar el reto
 */
export async function stopChallenge(interaction: ButtonInteraction) {
  try {
    const userId = interaction.user.id;
    DeleteChallenge(userId);
    interaction.update({
      content: `⏲️ <@${userId}> ha eliminado correctamente su reto`,
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

export async function deleteChallenge(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const userId = message.author.id;

  try {
    DeleteChallenge(userId);
    message.channel.send(
      `⏲️ <@${userId}> ha eliminado correctamente su reto`
    );
  } catch (error: any) {
    message.channel.send(error.message);
  }
}
