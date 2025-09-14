import { ButtonInteraction } from "discord.js";

export async function cancelStartStudySession(interaction: ButtonInteraction) {
  const userId = interaction.user.id;

  interaction.update({
    content: `⏲️ <@${userId}> ya no va a estudiar`,
    components: [],
  });
}
