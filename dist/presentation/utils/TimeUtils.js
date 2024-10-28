"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTimeStringToSeconds = parseTimeStringToSeconds;
exports.formatDuration = formatDuration;
function parseTimeStringToSeconds(timeString) {
    // Llevar cadena timeString en formato "xxh xxm xxs" a segundos UNIX
    // Ejemplo: "1h 30m 10s" -> 3780
    let totalSeconds = 0; // Total de segundos
    let timePattern = /(\d+)([hms])/g; // Expresión regular para buscar el tiempo en horas, minutos y segundos
    let match;
    while ((match = timePattern.exec(timeString)) !== null) {
        // Buscar cada ocurrencia de la expresión regular en la cadena
        const value = parseInt(match[1]); // Obtener el valor de la ocurrencia
        const unit = match[2]; // Obtener la unidad de tiempo
        switch (unit // Dependiendo de la unidad de tiempo, sumar el valor correspondiente a la unidad
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
function formatDuration(timestamp) {
    const totalSeconds = Math.floor(timestamp);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const parts = [];
    if (hours > 0)
        parts.push(`${hours}h`);
    if (minutes > 0)
        parts.push(`${minutes}m`);
    if (seconds > 0)
        parts.push(`${seconds}s`);
    return parts.join(" ") || "0s";
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3ByZXNlbnRhdGlvbi91dGlscy9UaW1lVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0REFpQ0M7QUFFRCx3Q0FjQztBQWpERCxTQUFnQix3QkFBd0IsQ0FBQyxVQUFrQjtJQUN6RCxvRUFBb0U7SUFDcEUsZ0NBQWdDO0lBRWhDLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLG9CQUFvQjtJQUMxQyxJQUFJLFdBQVcsR0FBRyxlQUFlLENBQUMsQ0FBQyx1RUFBdUU7SUFFMUcsSUFBSSxLQUFLLENBQUM7SUFDVixPQUFPLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUN2RCw4REFBOEQ7UUFDOUQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsb0NBQW9DO1FBQ3RFLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLDhCQUE4QjtRQUNyRCxRQUNFLElBQUksQ0FBQyxpRkFBaUY7VUFDdEYsQ0FBQztZQUNELEtBQUssR0FBRyxFQUFFLDREQUE0RDtnQkFDcEUsWUFBWSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQzdCLE1BQU07WUFDUixLQUFLLEdBQUcsRUFBRSw0REFBNEQ7Z0JBQ3BFLFlBQVksSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUMzQixNQUFNO1lBQ1IsS0FBSyxHQUFHLEVBQUUsNkNBQTZDO2dCQUNyRCxZQUFZLElBQUksS0FBSyxDQUFDO2dCQUN0QixNQUFNO1lBQ1I7Z0JBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO2dCQUNsRCxNQUFNO1FBQ1YsQ0FBQztJQUNILENBQUMsQ0FBQyxnQkFBZ0I7SUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztRQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUNELE9BQU8sWUFBWSxDQUFDLENBQUMsZ0NBQWdDO0FBQ3ZELENBQUM7QUFFRCxTQUFnQixjQUFjLENBQUMsU0FBaUI7SUFDOUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUUzQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQztJQUM5QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELE1BQU0sT0FBTyxHQUFHLFlBQVksR0FBRyxFQUFFLENBQUM7SUFFbEMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBRWpCLElBQUksS0FBSyxHQUFHLENBQUM7UUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUN2QyxJQUFJLE9BQU8sR0FBRyxDQUFDO1FBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDM0MsSUFBSSxPQUFPLEdBQUcsQ0FBQztRQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBRTNDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDakMsQ0FBQyJ9