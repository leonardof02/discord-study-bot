import {
  OmitPartialGroupDMChannel,
  Message,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} from "discord.js";
import SessionButtonActions from "../../constants/SessionInteractions";
import { formatDuration } from "../../../../../shared/presentation/utils/TimeUtils";
import { createRandomChallengeCommandHandler } from "../../../DependencyInjection";
import { ChallengeType } from "../../../domain/entities/ChallengeType";

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

  const button = new ButtonBuilder()
    .setCustomId(SessionButtonActions.DeleteChallenge)
    .setLabel("Eliminar reto")
    .setStyle(ButtonStyle.Danger);

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

  try {
    const randomChallenge = createRandomChallengeCommandHandler.handle({
      userId,
      difficulty: args[0] as ChallengeType,
    });

    message.channel.send({
      content: `⏲️ <@${userId}> ha creado un reto aleatorio de ${formatDuration(
        randomChallenge)}`,
      components: [row],
    });
  } catch (error: any) {
    message.channel.send(error.message);
  }
}
