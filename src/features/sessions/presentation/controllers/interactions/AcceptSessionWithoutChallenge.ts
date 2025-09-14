import { ButtonInteraction } from "discord.js";
import { startStudySessionCommandHandler } from "../../../DependencyInjection";

export async function acceptSessionWithoutChallenge(
  interaction: ButtonInteraction
) {
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
    startStudySessionCommandHandler.handle({ userId, subjectId: subjectName });
  } catch (error: any) {
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
}
