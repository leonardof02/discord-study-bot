import { OmitPartialGroupDMChannel, Message } from "discord.js";
import { getAllSubjectsQuery } from "../../DependencyInjection";

export async function viewSubjects(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const allSubjects = await getAllSubjectsQuery.handle({});

  if (allSubjects.length === 0) {
    message.reply(
      "No hay ninguna asignatura registrada, para registrar una escribe el comando !nueva_asignatura <nombre de la asignatura>"
    );
    return;
  }

  const subjectsString = allSubjects.map((subject) => {
    return `${subject.color} ${subject.name}`;
  });

  await message.reply({
    content:
      "Todas las asignaturas registradas en esta sala \n```\n" +
      subjectsString.join("\n") +
      "\n```\n",
  });
}
