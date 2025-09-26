import {
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonInteraction,
} from "discord.js";
import SessionButtonActions from "../../constants/SessionInteractions";
import { formatDuration } from "../../../../../shared/presentation/utils/TimeUtils";
import { DependencyContainer } from "../../../../../shared/DependencyInjectionContainer";
import { StartStudySessionCommandHandlerToken } from "../../../application/commands/StartStudySessionCommand";
import { GetActiveChallengeQueryHandlerToken } from "../../../application/queries/GetActiveChallengeQuery";

export async function startGeneralStudySession(interaction: ButtonInteraction) {
  const getActiveChallengeQueryHandler = DependencyContainer.resolve(
    GetActiveChallengeQueryHandlerToken
  );

  const startStudySessionCommandHandler = DependencyContainer.resolve(
    StartStudySessionCommandHandlerToken
  );

  const userId = interaction.customId.split("@")[1];

  try {
    const activeChallenge = getActiveChallengeQueryHandler.handle({ userId });

    if (!activeChallenge) {
      startStudySessionCommandHandler.handle({ userId });
      interaction.reply({
        content: `⏲️ <@${userId}> comenzaste a estudiar de forma general`,
      });
      return;
    }

    if (activeChallenge.isActive) {
      interaction.reply(`⏲️ <@${userId}> ya estás estudiando de forma general`);
      return;
    }

    const confirmButton = new ButtonBuilder()
      .setCustomId(
        `${SessionButtonActions.StartStudySessionWithChallenge}@NULL/${userId}/`
      )
      .setLabel("SI")
      .setStyle(ButtonStyle.Success);

    const cancelButton = new ButtonBuilder()
      .setCustomId(
        `${SessionButtonActions.StartStudySessionWithoutChallenge}@NULL/`
      )
      .setLabel("NO")
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      confirmButton,
      cancelButton
    );

    await interaction.reply({
      content: `¿Quieres aceptar el reto de ${formatDuration(
        activeChallenge.time
      )} en esta sesión?`,
      components: [row],
    });
  } catch (error: any) {
    interaction.reply({ content: error.message });
  }
}
