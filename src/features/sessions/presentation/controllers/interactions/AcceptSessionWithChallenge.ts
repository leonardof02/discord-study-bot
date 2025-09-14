import { ButtonInteraction } from "discord.js";
import { formatDuration } from "../../../../../shared/presentation/utils/TimeUtils";
import {
  getActiveChallengeQueryHandler,
  startStudySessionCommandHandler,
} from "../../../DependencyInjection";
import { getSubjectQuery } from "../../../../subjects/DependencyInjection";

export async function acceptSessionWithChallenge(
  interaction: ButtonInteraction
) {
  const currentUserId = interaction.user.id;
  const args = interaction.customId.split("@")[1];
  const [subjectArg, userId] = args.split("/");

  const subjectId = subjectArg === "NULL" ? undefined : subjectArg;

  const activeChallenge = getActiveChallengeQueryHandler.handle({ userId });
  const subject =
    subjectId != undefined
      ? await getSubjectQuery.handle({ id: subjectId })
      : undefined;

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

  startStudySessionCommandHandler.handle({
    userId,
    subjectId,
    challenge: activeChallenge,
  });

  interaction.update({
    content: `⏲️ <@${userId}> comenzaste a estudiar ${
      subject?.name ?? "de forma general"
    } aceptando el reto de ${formatDuration(activeChallenge.time)}`,
    components: [],
  });
}
