import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  Message,
  OmitPartialGroupDMChannel,
} from "discord.js";

// use cases
import { StartStudySession } from "../../application/useCases/StartStudySession";
import { FinishStudySession } from "../../application/useCases/FinishStudySession";
import { GetLastStudySessions } from "../../application/useCases/GetLastStudySessions";

import { getSubject } from "../../application/utils/SubjectRegex";
import { ChangeSessionSubject } from "../../application/useCases/ChangeSessionSubject";
import { GetActiveChallenge } from "../../application/useCases/GetActiveChallenge";
import ButtonActions from "../constants/ButtonActions";
import { formatDuration } from "../utils/TimeUtils";

export async function startStudySession(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const userId = message.author.id;

  const subjectName = getSubject(args.join(" "));

  if (args[0] == null || subjectName == null) {
    message.channel.send(
      `No se ha especificado asignatura válida\n para estudiar de forma general usa \`!estudio_general\``
    );
    return;
  }

  try {
    const activeChallenge = GetActiveChallenge(userId);
    if (!activeChallenge) {
      StartStudySession(userId, subjectName);
      message.channel.send(
        `⏲️ <@${userId}> comenzaste a estudiar ${subjectName}`
      );
      return;
    }

    if (activeChallenge.isActive) {
      message.channel.send(
        `⏲️ <@${userId}> ya estás estudiando ${subjectName}`
      );
      return;
    }

    const confirmButton = new ButtonBuilder()
      .setCustomId(
        `${ButtonActions.StartStudySessionWithChallenge}@${subjectName}/${userId}`
      )
      .setLabel("SI")
      .setStyle(ButtonStyle.Success);

    const cancelButton = new ButtonBuilder()
      .setCustomId(
        `${ButtonActions.StartStudySessionWithoutChallenge}@${subjectName}`
      )
      .setLabel("NO")
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      confirmButton,
      cancelButton
    );

    await message.reply({
      content: `¿Quieres aceptar el reto de ${formatDuration(
        activeChallenge.time
      )} en esta sesión?`,
      components: [row],
    });
  } catch (error: any) {
    message.channel.send(error.message);
  }
}

export async function startGeneralStudySession(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const userId = message.author.id;

  try {
    const activeChallenge = GetActiveChallenge(userId);

    if (!activeChallenge) {
      StartStudySession(userId);
      message.channel.send(
        `⏲️ <@${userId}> comenzaste a estudiar de forma general`
      );
      return;
    }

    if (activeChallenge.isActive) {
      message.channel.send(
        `⏲️ <@${userId}> ya estás estudiando de forma general`
      );
      return;
    }

    const confirmButton = new ButtonBuilder()
      .setCustomId(
        `${ButtonActions.StartStudySessionWithChallenge}@de forma general/${userId}`
      )
      .setLabel("SI")
      .setStyle(ButtonStyle.Success);

    const cancelButton = new ButtonBuilder()
      .setCustomId(
        `${ButtonActions.StartStudySessionWithoutChallenge}@de forma general`
      )
      .setLabel("NO")
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      confirmButton,
      cancelButton
    );

    await message.reply({
      content: `¿Quieres aceptar el reto de ${formatDuration(
        activeChallenge.time
      )} en esta sesión?`,
      components: [row],
    });
  } catch (error: any) {
    message.channel.send(error.message);
  }
}

export async function finishStudySession(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const userId = message.author.id;
  try {
    const finishedStudySessionData = await FinishStudySession(userId);

    message.channel.send(
      `Terminada sesión de estudio de <@${userId}>${
        finishedStudySessionData.subjectName === "de forma general"
          ? ""
          : `\n🔖 Asignatura: ${finishedStudySessionData.subjectName}`
      }
  🕑 Tiempo Total: ${finishedStudySessionData.humanReadableTotalTime}
  💯 Puntuación obtenida: ${finishedStudySessionData.points}${
        finishedStudySessionData.challenge &&
        finishedStudySessionData.points > 0
          ? "\n✅ Reto completado con éxito\n➕ Puntos extra ganados"
          : ""
      }${
        finishedStudySessionData.points === 0
          ? "\n❌ No has completado el reto\n➖ Has perdido todos los puntos"
          : ""
      }
  🔑 ID SESIÓN: ${finishedStudySessionData.id}`
    );
    return;
  } catch (error: any) {
    message.channel.send(error.message);
  }
}

export async function getLastSessions(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  let numberOfSessions = parseInt(args[0]);
  if (Number.isNaN(numberOfSessions)) numberOfSessions = 10;

  const lastSessions = await GetLastStudySessions(numberOfSessions);

  const response = (await lastSessions).map(
    (session, index) =>
      `${index + 1} - <@${session.dataValues.userId}> estuvo estudiando \`${
        session.dataValues.subjectName
      }\` por un tiempo de \`${
        session.dataValues.humanReadableTotalTime
      }\` \`[${session.dataValues.id}] \``
  );

  message.channel.send(
    `📌 Últimas sesiones de estudio\n------------------------------------\n${response.join(
      "\n"
    )}`
  );
}

export function changeSubjectOfSession(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const userId = message.author.id;

  if (!args[0]) {
    message.channel.send(
      `No se ha especificado asignatura válida para cambiar`
    );
    return;
  }

  const subjectName = getSubject(args[0]);
  if (!subjectName) {
    message.channel.send(
      `No se ha especificado asignatura válida para cambiar`
    );
    return;
  }

  try {
    ChangeSessionSubject(userId, subjectName);
    message.channel.send(
      `⏲️ <@${userId}> cambió su asignatura a ${subjectName}`
    );
  } catch (error: any) {
    message.channel.send(error.message);
  }
}

export async function acceptSessionWithChallenge(
  interaction: ButtonInteraction
) {
  const currentUserId = interaction.user.id;
  const args = interaction.customId.split("@")[1];
  const [_, userId] = args.split("/");

  const activeChallenge = GetActiveChallenge(userId);

  if (!activeChallenge) {
    interaction.reply({
      content: `<@${userId}> no tiene un reto activado`,
      ephemeral: true,
    });
    return;
  }

  if (userId && userId !== currentUserId) {
    interaction.reply({
      content: `<@${userId}> no es tu sesión`,
      ephemeral: true,
    });
    return;
  }

  StartStudySession(userId, undefined, activeChallenge);
  interaction.update({
    content: `⏲️ <@${userId}> comenzaste a estudiar de forma general aceptando el reto de ${formatDuration(
      activeChallenge.time
    )}`,
    components: [],
  });
}

export async function acceptSessionWithoutChallenge(
  interaction: ButtonInteraction
) {
  const currentUserId = interaction.user.id;
  const args = interaction.customId.split("@")[1];
  const [subjectName, userId] = args.split("/");

  if (!subjectName) {
    interaction.reply({
      content: `<@${userId}> no tiene una asignatura especificada`,
      ephemeral: true,
    });
    return;
  }

  if (userId && userId !== currentUserId) {
    interaction.reply({
      content: `<@${userId}> no es tu sesión`,
      ephemeral: true,
    });
    return;
  }

  StartStudySession(userId, subjectName);
  interaction.update({
    content: `⏲️ <@${userId}> comenzaste a estudiar ${subjectName} sin reto`,
    components: [],
  });
}
