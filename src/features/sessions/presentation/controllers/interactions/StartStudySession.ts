import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuInteraction,
} from "discord.js";
import { formatDuration } from "../../../../../shared/presentation/utils/TimeUtils";
import SessionButtonActions from "../../constants/SessionInteractions";
import { DependencyContainer } from "../../../../../shared/DependencyInjectionContainer";
import { GetSubjectQueryHandlerToken } from "../../../../subjects/application/queries/GetSubject";
import { StartStudySessionCommandHandlerToken } from "../../../application/commands/StartStudySessionCommand";
import { GetActiveChallengeQueryHandlerToken } from "../../../application/queries/GetActiveChallengeQuery";

export async function startStudySession(
  interaction: StringSelectMenuInteraction
) {

  const getActiveChallengeQueryHandler = DependencyContainer.resolve(
    GetActiveChallengeQueryHandlerToken
  );

  const startStudySessionCommandHandler = DependencyContainer.resolve(
    StartStudySessionCommandHandlerToken
  );

  const getSubjectQuery = DependencyContainer.resolve(GetSubjectQueryHandlerToken);

  try {
    const userId = interaction.customId.split("@")[1];
    const subjectId = interaction.values[0];

    const subject = await getSubjectQuery.handle({ id: subjectId });

    const activeChallenge = getActiveChallengeQueryHandler.handle({ userId });
    if (!activeChallenge) {
      startStudySessionCommandHandler.handle({
        userId,
        subjectId,
      });
      interaction.reply({
        content: `⏲️ <@${userId}> comenzaste a estudiar ${subject.color} ${subject.name}`,
      });
      return;
    }

    const confirmChallengeButton = new ButtonBuilder()
      .setCustomId(
        `${SessionButtonActions.StartStudySessionWithChallenge}@${subjectId}/${userId}/`
      )
      .setLabel("SI")
      .setStyle(ButtonStyle.Success);
    const cancelChallengeButton = new ButtonBuilder()
      .setCustomId(
        `${SessionButtonActions.StartStudySessionWithoutChallenge}@${subjectId}/${userId}/`
      )
      .setLabel("NO")
      .setStyle(ButtonStyle.Danger);
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      confirmChallengeButton,
      cancelChallengeButton
    );

    await interaction.reply({
      content: `¿Quieres aceptar el reto de ${formatDuration(
        activeChallenge.time
      )} en esta sesión?`,
      components: [row],
    });
  } catch (error: any) {
    interaction.reply({
      content: error.message,
      ephemeral: true,
    });
  }
}
