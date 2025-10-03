import { ButtonInteraction } from "discord.js";
import { DependencyContainer } from "../../../../../shared/DependencyInjectionContainer";
import { FinishStudySessionCommandHandlerToken } from "../../../application/commands/FinishStudySessionCommand";

export async function finishStudySession(interaction: ButtonInteraction) {
  const finishStudySessionCommandHandler = DependencyContainer.resolve(
    FinishStudySessionCommandHandlerToken
  );

  try {
    const finishedStudySessionData =
      await finishStudySessionCommandHandler.handle({
        userId: interaction.user.id,
      });

    const {
      subjectName,
      challenge,
      totalTime,
      points,
      userId,
      isChallengeCompleted,
      sessionId,
    } = finishedStudySessionData;

    const replyText = `Terminada sesión de estudio de <@${userId}>${
      subjectName ? `\n🔖 Asignatura: ${subjectName}` : `\n🔖 Estudio general`
    }
  🕑 Tiempo Total: ${totalTime}
  💯 Puntuación obtenida: ${points}${
      challenge
        ? isChallengeCompleted
          ? "\n✅ Reto completado con éxito\n➕ Puntos extra ganados"
          : "\n❌ No has completado el reto\n➖ Has perdido todos los puntos del reto"
        : ""
    }
  🔑 ID SESIÓN: ${sessionId}`;

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
