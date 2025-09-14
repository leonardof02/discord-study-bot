import { ButtonInteraction, StringSelectMenuInteraction } from "discord.js";
import { removeSubjectCommand as deleteSubjectCommand } from "../../DependencyInjection";
import { SubjectColor } from "../../domain/Subject";

export async function deleteSubject(interaction: ButtonInteraction) {
  const subjectId = interaction.customId.split("@")[1];

  await interaction.message.delete();
  const subject = await deleteSubjectCommand.handle({
    id: subjectId,
  });

  await interaction.reply({
    ephemeral: true,
    content: `${subject.color} ${subject.name} borrada correctamente!`,
  });
}
