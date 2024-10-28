export function parseTimeStringToSeconds(timeString: string): number {
  // Llevar cadena timeString en formato "xxh xxm xxs" a segundos UNIX
  // Ejemplo: "1h 30m 10s" -> 3780

  let totalSeconds = 0; // Total de segundos
  let timePattern = /(\d+)([hms])/g; // Expresión regular para buscar el tiempo en horas, minutos y segundos

  let match;
  while ((match = timePattern.exec(timeString)) !== null) {
    // Buscar cada ocurrencia de la expresión regular en la cadena
    const value = parseInt(match[1]); // Obtener el valor de la ocurrencia
    const unit = match[2]; // Obtener la unidad de tiempo
    switch (
      unit // Dependiendo de la unidad de tiempo, sumar el valor correspondiente a la unidad
    ) {
      case "h": // Si es hora, sumar el valor multiplicado por 3600 segundos
        totalSeconds += value * 3600;
        break;
      case "m": // Si es minuto, sumar el valor multiplicado por 60 segundos
        totalSeconds += value * 60;
        break;
      case "s": // Si es segundo, sumar el valor directamente
        totalSeconds += value;
        break;
      default:
        throw new Error("Unidad de tiempo no reconocida");
        break;
    }
  } // Fin del bucle
  if (!timePattern.test(timeString)) {
    throw new Error("Unidad de tiempo no reconocida");
  }
  return totalSeconds; // Retornar el total de segundos
}

export function formatDuration(timestamp: number): string {
  const totalSeconds = Math.floor(timestamp);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];

  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);

  return parts.join(" ") || "0s";
}
