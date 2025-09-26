import { ButtonInteraction, StringSelectMenuInteraction } from "discord.js";
import { SubjectColor } from "../../domain/Subject";
import { RemoveSubjectCommandHandlerToken } from "../../application/command/RemoveSubjectCommand";
import { DependencyContainer } from "../../../../shared/DependencyInjectionContainer";

export async function deleteSubject(interaction: ButtonInteraction) {
  const removeSubjectCommand = DependencyContainer.resolve(
    RemoveSubjectCommandHandlerToken
  );

  const subjectId = interaction.customId.split("@")[1];

  await interaction.message.delete();
  const subject = await removeSubjectCommand.handle({
    id: subjectId,
  });

  await interaction.reply({
    ephemeral: true,
    content: `${subject.color} ${subject.name} borrada correctamente!`,
  });
}
