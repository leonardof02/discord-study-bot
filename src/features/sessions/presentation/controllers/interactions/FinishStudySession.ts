import { ButtonInteraction } from "discord.js";
import { finishStudySessionCommandHandler } from "../../../DependencyInjection";

export async function finishStudySession(interaction: ButtonInteraction) {
  const userId = interaction.user.id;
  console.log(userId);

  try {
    const finishedStudySessionData =
      await finishStudySessionCommandHandler.handle({ userId });

    const { subjectId, challenge, humanReadableTotalTime, points, id } =
      finishedStudySessionData;

    const replyText = `Terminada sesión de estudio de <@${userId}>${
      subjectId
        ? "\n🔖 Asignatura: ${subjectId}"
        : `\n🔖 Estudio general`
    }
  🕑 Tiempo Total: ${humanReadableTotalTime}
  💯 Puntuación obtenida: ${points}${
      challenge != null
        ? finishedStudySessionData.isChallengeCompleted
          ? "\n✅ Reto completado con éxito\n➕ Puntos extra ganados"
          : "\n❌ No has completado el reto\n➖ Has perdido todos los puntos del reto"
        : ""
    }
  🔑 ID SESIÓN: ${id}`;

    interaction.update({
      content: replyText,
      components: [],
    });

    return;
  } catch (error: any) {
    console.log(error);
    interaction.reply(error.message);
  }
}
