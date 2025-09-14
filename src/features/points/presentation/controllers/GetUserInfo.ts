import {
  OmitPartialGroupDMChannel,
  Message,
  AttachmentBuilder,
  EmbedBuilder,
} from "discord.js";
import fetch from "node-fetch";
import { getPointsByUserQueryHandler } from "../../DependencyInjection";
import { getStudySessionsFromUserQueryHandler } from "../../../sessions/DependencyInjection";

export async function getUserInfo(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const userId = message.author.id;
  const pointsBySubject = await getPointsByUserQueryHandler.handle({ userId });
  const studySessions = await getStudySessionsFromUserQueryHandler.handle({
    userId,
  });

  // Construir el URL del gráfico usando QuickChart API
  const barChartConfig = {
    type: "bar",
    backgroundColor: "#ffffff",
    data: {
      labels: pointsBySubject.map((item) => item.subjectName),
      datasets: [
        {
          label: "Puntos totales por asignatura",
          data: pointsBySubject.map((item) => item.totalPoints),
          backgroundColor: "#007bff",
        },
      ],
      options: {
        plugins: {
          legend: {
            labels: {
              color: "#000", // Color de la leyenda
            },
          },
        },
        scales: {
          x: {
            ticks: { color: "#fff" }, // Color de las etiquetas del eje x
            grid: { color: "rgba(0,0,0,0.1)" }, // Color de las líneas de la cuadrícula
          },
          y: {
            ticks: { color: "#fff" }, // Color de las etiquetas del eje y
            grid: { color: "rgba(0,0,0,0.1)" },
          },
        },
      },
      backgroundColor: "#ffffff",
    },
  };

  const lineChartConfig = {
    type: "line",
    backgroundColor: "#ffffff",
    data: {
      labels: studySessions.map((item) => item.subjectName),
      datasets: [
        {
          label: "Todas las sesiones de estudio",
          data: studySessions.map((item) => item.totalPoints),
          backgroundColor: "#007bff",
        },
      ],
      options: {
        plugins: {
          legend: {
            labels: {
              color: "#000", // Color de la leyenda
            },
          },
        },
        scales: {
          x: {
            ticks: { color: "#fff" }, // Color de las etiquetas del eje x
            grid: { color: "rgba(0,0,0,0.1)" }, // Color de las líneas de la cuadrícula
          },
          y: {
            ticks: { color: "#fff" }, // Color de las etiquetas del eje y
            grid: { color: "rgba(0,0,0,0.1)" },
          },
        },
      },
      backgroundColor: "#ffffff",
    },
  };

  const barChartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(
    JSON.stringify(barChartConfig)
  )}`;

  const lineChartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(
    JSON.stringify(lineChartConfig)
  )}`;

  // Descargar la imagen del gráfico
  const barChartresponse = await fetch(barChartUrl);
  const barChartBuffer = await barChartresponse.arrayBuffer();
  const barChartFileBuffer = Buffer.from(barChartBuffer);

  const lineChartresponse = await fetch(lineChartUrl);
  const lineChartBuffer = await lineChartresponse.arrayBuffer();
  const lineChartFileBuffer = Buffer.from(lineChartBuffer);

  const graphicBar = new AttachmentBuilder(barChartFileBuffer, {
    name: "bar.png",
  });
  const graphicLine = new AttachmentBuilder(lineChartFileBuffer, {
    name: "line.png",
  });

  const embed = new EmbedBuilder()
    .setTitle(`📊 Resumen de puntos por asignatura`)
    .setDescription(`Usuario: <@${userId}>`)
    .setImage("attachment://bar.png");

  const embedLine = new EmbedBuilder()
    .setTitle(`📊 Resumen de puntos por sesión`)
    .setDescription(`Usuario: <@${userId}>`)
    .setImage("attachment://line.png");

  await message.reply({
    embeds: [embed, embedLine],
    files: [graphicBar, graphicLine],
  });
}
