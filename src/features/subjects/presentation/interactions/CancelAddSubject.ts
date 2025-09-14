import { ButtonInteraction, StringSelectMenuInteraction } from "discord.js";

export async function cancelAddSubject(
  interaction: ButtonInteraction
) {
  await interaction.message.delete();
  await interaction.reply({
    ephemeral: true,
    content: "Cancelada la operación a realizar",
  });
}
