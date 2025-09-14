import { ButtonInteraction } from "discord.js";

export async function cancelFinishStudySession(interaction: ButtonInteraction) {
  const userId = interaction.user.id;

  interaction.update({
    content: `⏲️ <@${userId}> continúa estudiando`,
    components: [],
  });
}
