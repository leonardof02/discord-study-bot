import { ButtonInteraction, StringSelectMenuInteraction } from "discord.js";
import { SubjectColor } from "../../domain/Subject";
import { DependencyContainer } from "../../../../shared/DependencyInjectionContainer";
import { AddSubjectCommandHandlerToken } from "../../application/command/AddSubjectCommand";

export async function addSubject(interaction: StringSelectMenuInteraction) {
  const addSubjectCommand = DependencyContainer.resolve(
    AddSubjectCommandHandlerToken
  );

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
