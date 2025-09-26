import {
  OmitPartialGroupDMChannel,
  Message,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} from "discord.js";
import SessionButtonActions from "../../constants/SessionInteractions";
import { DependencyContainer } from "../../../../../shared/DependencyInjectionContainer";
import { GetActiveStudySessionQueryHandlerToken } from "../../../application/queries/GetActiveStudySessionQuery";

export async function confirmFinishStudySession(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const getActiveStudySessionQueryHandler = DependencyContainer.resolve(
    GetActiveStudySessionQueryHandlerToken
  );

  try {
    const userId = message.author.id;
    const existingSession = getActiveStudySessionQueryHandler.handle({
      userId,
    });

    if (!existingSession) {
      message.channel.send({
        content: `<@${userId}> no tiene una sesión de estudio activa`,
      });
      return;
    }

    const yesButton = new ButtonBuilder()
      .setCustomId(SessionButtonActions.ConfirmFinishStudySession)
      .setLabel("SI")
      .setStyle(ButtonStyle.Success);

    const noButton = new ButtonBuilder()
      .setCustomId(SessionButtonActions.CancelFinishStudySession)
      .setLabel("NO")
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      yesButton,
      noButton
    );

    await message.reply({
      content: `¿Quieres terminar la sesión de estudio?`,
      components: [row],
    });
  } catch (error: Error | any) {
    message.reply((error as Error).message);
  }
}
