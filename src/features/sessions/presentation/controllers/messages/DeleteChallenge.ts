import { OmitPartialGroupDMChannel, Message } from "discord.js";
import { DependencyContainer } from "../../../../../shared/DependencyInjectionContainer";
import { DeleteChallengeCommandHandlerToken } from "../../../application/commands/DeleteChallengeCommand";

export async function deleteChallenge(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const deleteChallengeCommandHandler = DependencyContainer.resolve(
    DeleteChallengeCommandHandlerToken
  );

  const userId = message.author.id;

  try {
    deleteChallengeCommandHandler.handle({ userId });
    message.channel.send(`⏲️ <@${userId}> ha eliminado correctamente su reto`);
  } catch (error: any) {
    message.channel.send(error.message);
  }
}
