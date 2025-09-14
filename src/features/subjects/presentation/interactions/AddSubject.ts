import { ButtonInteraction, StringSelectMenuInteraction } from "discord.js";
import { addSubjectCommand } from "../../DependencyInjection";
import { SubjectColor } from "../../domain/Subject";

export async function addSubject(interaction: StringSelectMenuInteraction) {
  const subjectName = interaction.customId.split("@")[1];
  const color = interaction.values[0];

  await interaction.message.delete();
  await addSubjectCommand.handle({
    name: subjectName,
    color: color as SubjectColor,
  });

  interaction.reply({
    ephemeral: true,
    content: `Añadida nueva asignatura: ${color} ${subjectName}`,
  });
}
