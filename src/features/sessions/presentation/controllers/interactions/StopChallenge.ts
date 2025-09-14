import { ButtonInteraction, EmbedBuilder } from "discord.js";
import { deleteChallengeCommandHandler } from "../../../DependencyInjection";

/** Elimina un reto personalizado ya creado por el usuario
 * @param interaction La interacción resultado del boton de eliminar el reto
 */
export async function stopChallenge(interaction: ButtonInteraction) {
  try {
    const userId = interaction.user.id;
    deleteChallengeCommandHandler.handle({ userId });
    interaction.update({
      content: `⏲️ <@${userId}> ha eliminado correctamente su reto`,
      components: [],
    });
  } catch (error: any) {
    const errorEmbed = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle("¡Error!")
      .setDescription(error.message)
      .setFooter({ text: "Error en el bot de estudio" });

    await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
  }
}
