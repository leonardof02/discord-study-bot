const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping
    ]
});

client.once('ready', () =>{
    console.log('¡El bot está skibidi toilet!');
});

const archivos =[
    'sesionesDeEstudio.json',
    'puntosDeEstudio.json',
    'nivelesDeEstudio.json',
    'desafiosDeEstudio.json',
    'retosCompletados.json',
    'puntosPorAsignatura.json'
];

archivos.forEach(archivo =>{
    if (!fs.existsSync(archivo)) {
        fs.writeFileSync(archivo, JSON.stringify({}));
    }
});

let sesionesDeEstudio = JSON.parse(fs.readFileSync('sesionesDeEstudio.json', 'utf8'));
let puntosDeEstudio = JSON.parse(fs.readFileSync('puntosDeEstudio.json', 'utf8'));
let nivelesDeEstudio = JSON.parse(fs.readFileSync('nivelesDeEstudio.json', 'utf8'));
let desafiosDeEstudio = JSON.parse(fs.readFileSync('desafiosDeEstudio.json', 'utf8'));
let retosCompletados = JSON.parse(fs.readFileSync('retosCompletados.json', 'utf8'));
let puntosPorAsignatura = JSON.parse(fs.readFileSync('puntosPorAsignatura.json', 'utf8'));

client.on('messageCreate', message =>{
    if (message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'estudiar'){
        if(args.length === 0){
            return message.reply('Por favor, proporciona una asignatura. Ejemplo: `!estudiar matematicas`');
        }

        const asignatura = args.join(' ');

        if(!sesionesDeEstudio[message.author.id]){
            sesionesDeEstudio[message.author.id] ={
                inicio: Date.now(),
                asignatura: asignatura
            };
            fs.writeFileSync('sesionesDeEstudio.json', JSON.stringify(sesionesDeEstudio));
            message.reply(`¡Has comenzado a estudiar ${asignatura}!`);
        }
        else{
            message.reply('Ya tienes una sesión de estudio en curso. Usa `!terminar` para finalizar tu sesión actual.');
        }
    }
    
    else if(command === 'terminar'){
        if(!sesionesDeEstudio[message.author.id] || !sesionesDeEstudio[message.author.id].inicio){
            return message.reply('No tienes ninguna sesión de estudio en curso.');
        }

        const sesion = sesionesDeEstudio[message.author.id];
        const tiempoEstudiado = Date.now() - sesion.inicio;
        const minutosEstudiados = Math.floor(tiempoEstudiado / (60 * 1000));
        const horasEstudiadas = Math.floor(minutosEstudiados / 60);
        const minutosRestantes = minutosEstudiados % 60;

        puntosDeEstudio[message.author.id] = (puntosDeEstudio[message.author.id] || 0) + minutosEstudiados;
        if (!puntosPorAsignatura[message.author.id]) {
            puntosPorAsignatura[message.author.id] = {};
        }
        puntosPorAsignatura[message.author.id][sesion.asignatura] = (puntosPorAsignatura[message.author.id][sesion.asignatura] || 0) + minutosEstudiados;
        fs.writeFileSync('puntosPorAsignatura.json', JSON.stringify(puntosPorAsignatura));

        nivelesDeEstudio[message.author.id] = Math.floor(puntosDeEstudio[message.author.id] / 100) + 1;

        fs.writeFileSync('puntosDeEstudio.json', JSON.stringify(puntosDeEstudio));
        fs.writeFileSync('nivelesDeEstudio.json', JSON.stringify(nivelesDeEstudio));
        delete sesionesDeEstudio[message.author.id];
        fs.writeFileSync('sesionesDeEstudio.json', JSON.stringify(sesionesDeEstudio));

        message.reply(`Has terminado tu sesión de estudio para ${sesion.asignatura}. Has estudiado durante ${horasEstudiadas} horas y ${minutosRestantes} minutos. Has ganado ${minutosEstudiados} puntos. Ahora tienes ${puntosDeEstudio[message.author.id]} puntos y tu nivel es ${nivelesDeEstudio[message.author.id]}.`);
    }
    
    
    else if(command === 'retopersonalizado'){
        if(args.length === 0){
            return message.reply('Por favor, especifica la duración del reto. Ejemplo: `!retopersonalizado 2h`');
        }
    
        const timeArgs = args[0];
        const timeValue = parseInt(timeArgs);
        let timeInMilliseconds = 0;
    
        if(timeArgs.includes('h')){
            timeInMilliseconds = timeValue * 60 * 60 * 1000; // h to ms
        }
        else if(timeArgs.includes('m')){
            timeInMilliseconds = timeValue * 60 * 1000; // m to ms
        }
        else if(timeArgs.includes('s')){
            timeInMilliseconds = timeValue * 1000; // s to ms
        }
        else{
            return message.reply('Por favor, especifica una duración válida. Ejemplo: `!retopersonalizado 2h`');
        }
    
        // reducir la duración en un 10%
        const tiempoReducido = timeInMilliseconds * 0.9; // puntuacion original - 10%.
    
        if(!desafiosDeEstudio[message.author.id]){
            desafiosDeEstudio[message.author.id] ={
                inicio: Date.now(),
                duracion: tiempoReducido
            };
            fs.writeFileSync('desafiosDeEstudio.json', JSON.stringify(desafiosDeEstudio));
            message.reply(`¡Desafío personalizado de ${timeArgs} comenzado! ¡Buena suerte!`);
        }
        else{
            message.reply('Ya estás en medio de un desafío. Usa `!terminarReto` para finalizar el desafío actual.');
        }
    }

    else if(command === 'retos'){
        const randomHours = Math.floor(Math.random() * 5) + 1;
        const timeInMilliseconds = randomHours * 60 * 60 * 1000;
    
        if(!desafiosDeEstudio[message.author.id]){
            desafiosDeEstudio[message.author.id] = {
                inicio: Date.now(),
                duracion: timeInMilliseconds
            };
            fs.writeFileSync('desafiosDeEstudio.json', JSON.stringify(desafiosDeEstudio));
            message.reply(`¡Desafío de ${randomHours} horas comenzado! ¡Buena suerte!`);
        }
        else{
            message.reply('Ya estás en medio de un desafío. Usa `!terminarReto` para finalizar el desafío actual.');
        }
    }
    
    else if (command === 'terminarreto') {
        if (desafiosDeEstudio[message.author.id]) {
            const desafio = desafiosDeEstudio[message.author.id];
            const tiempoDesafiante = Date.now() - desafio.inicio;
            const tiempoRestante = desafio.duracion - tiempoDesafiante;

            if (tiempoRestante <= 0) {
                const puntos = Math.floor(desafio.duracion / (60 * 1000)); // 1 punto por cada minuto del desafío completado
                puntosDeEstudio[message.author.id] = (puntosDeEstudio[message.author.id] || 0) + puntos;
                nivelesDeEstudio[message.author.id] = Math.floor(puntosDeEstudio[message.author.id] / 100) + 1; // 1 nivel por cada 100 puntos
                retosCompletados[message.author.id] = (retosCompletados[message.author.id] || 0) + 1;

                fs.writeFileSync('puntosDeEstudio.json', JSON.stringify(puntosDeEstudio));
                fs.writeFileSync('nivelesDeEstudio.json', JSON.stringify(nivelesDeEstudio));
                fs.writeFileSync('retosCompletados.json', JSON.stringify(retosCompletados));
                delete desafiosDeEstudio[message.author.id];
                fs.writeFileSync('desafiosDeEstudio.json', JSON.stringify(desafiosDeEstudio));
                message.reply(`¡Felicidades! Has completado el desafío y has ganado ${puntos} puntos. Ahora tienes un total de ${puntosDeEstudio[message.author.id]} puntos y tu nivel es ${nivelesDeEstudio[message.author.id]}.`);
            } else {
                message.reply('Aún no has completado el desafío. Responde con `sí` para confirmar que quieres abandonarlo sin puntos o `no` para seguir.');

                const filter = response => {
                    return ['sí', 'no'].includes(response.content.toLowerCase()) && response.author.id === message.author.id;
                };

                message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
                    .then(collected => {
                        const response = collected.first();
                        if (response.content.toLowerCase() === 'sí') {
                            retosCompletados[message.author.id] = (retosCompletados[message.author.id] || 0) + 1;
                            delete desafiosDeEstudio[message.author.id];
                            fs.writeFileSync('desafiosDeEstudio.json', JSON.stringify(desafiosDeEstudio));
                            fs.writeFileSync('retosCompletados.json', JSON.stringify(retosCompletados));
                            message.reply('Has abandonado el desafío y no has ganado puntos.');
                        } else {
                            message.reply('Sigue con el desafío. ¡No te rindas!');
                        }
                    })
                    .catch(() =>{
                        message.reply('No se recibió ninguna respuesta. El desafío sigue en curso.');
                    });
            }
        }
        else{
            message.reply('No estás en medio de ningún desafío. Usa `!crearReto <duración>` para iniciar uno.');
        }
    }
    
    else if(command === 'ranking'){
        const ranking = Object.entries(puntosDeEstudio).map(([userId, puntos]) =>{
            return { userId, puntos };
        }).sort((a, b) => b.puntos - a.puntos).slice(0, 10);

        const rankingMessage = ranking.map((user, index) =>{
            return `${index + 1}. <@${user.userId}> - ${user.puntos} puntos`;
        }).join('\n');
        message.channel.send(`**Ranking de Estudio**\n${rankingMessage}`);


    }
    else if (command === 'rankingdetallado') {
        const rankingDetallado = Object.entries(puntosPorAsignatura).map(([userId, asignaturas]) => {
            const puntosEstudio = Object.values(asignaturas).reduce((a, b) => a + b, 0);
            const puntosExtras = puntosDeEstudio[userId] - puntosEstudio; // Calcular puntos extras
            return { userId, puntosEstudio, puntosExtras, asignaturas };
        }).sort((a, b) => (b.puntosEstudio + b.puntosExtras) - (a.puntosEstudio + a.puntosExtras)).slice(0, 10);
    
        const rankingDetalladoMessage = rankingDetallado.map((user, index) => {
            const asignaturas = Object.entries(user.asignaturas).map(([asignatura, puntos]) => {
                return `${asignatura}: ${puntos} puntos`;
            }).join(', ');
    
            return `${index + 1}. <@${user.userId}> - Puntos de estudio: ${user.puntosEstudio}, Puntos extras: ${user.puntosExtras}, (${asignaturas})`;
        }).join('\n');
    
        message.channel.send(`**Ranking Detallado de Estudio**\n${rankingDetalladoMessage}`);
    }
    


    else if(command === 'mispuntos'){
        const puntos = puntosDeEstudio[message.author.id] || 0;
        const nivel = nivelesDeEstudio[message.author.id] || 1;
        message.reply(`Tienes ${puntos} puntos de estudio. Tu nivel es ${nivel}.`);
    }


    else if(command === 'mispuntosdetallado'){
        const asignaturas = puntosPorAsignatura[message.author.id] || {};
        const puntosDetallados = Object.entries(asignaturas).map(([asignatura, puntos]) =>{
            return `${asignatura}: ${puntos} puntos`;
        }).join(', ');
        message.reply(`Tienes los siguientes puntos por asignatura: ${puntosDetallados}`);
    }


    else if (command === 'anadirpuntos'){
        if (args.length < 2) {
            return message.reply('Por favor, proporciona el usuario, la asignatura y los puntos a añadir. Ejemplo: `!anadirpuntos @usuario matematicas 10`');
        }
        const targetUser = message.mentions.users.first();
        const asignatura = args[1];
        const puntos = parseInt(args[2]);

        if (!targetUser || isNaN(puntos)) {
            return message.reply('Por favor, proporciona un usuario válido y una cantidad de puntos válida.');
        }

        if (!puntosPorAsignatura[targetUser.id]) {
            puntosPorAsignatura[targetUser.id] = {};
        }

        puntosPorAsignatura[targetUser.id][asignatura] = (puntosPorAsignatura[targetUser.id][asignatura] || 0) + puntos;
        fs.writeFileSync('puntosPorAsignatura.json', JSON.stringify(puntosPorAsignatura));

        puntosDeEstudio[targetUser.id] = (puntosDeEstudio[targetUser.id] || 0) + puntos;
        fs.writeFileSync('puntosDeEstudio.json', JSON.stringify(puntosDeEstudio));

        message.reply(`Añadido ${puntos} puntos a ${targetUser} en ${asignatura}. Ahora tiene ${puntosPorAsignatura[targetUser.id][asignatura]} puntos en ${asignatura}.`);
    }
    
    
    else if (command === 'eliminarpuntos') {
        if (args.length < 2) {
            return message.reply('Por favor, proporciona el usuario, la asignatura y los puntos a eliminar. Ejemplo: `!eliminarpuntos @usuario matematicas 10`');
        }
        const targetUser = message.mentions.users.first();
        const asignatura = args[1];
        const puntos = parseInt(args[2]);

        if (!targetUser || isNaN(puntos)) {
            return message.reply('Por favor, proporciona un usuario válido y una cantidad de puntos válida.');
        }

        if (puntosPorAsignatura[targetUser.id] && puntosPorAsignatura[targetUser.id][asignatura]) {
            puntosPorAsignatura[targetUser.id][asignatura] -= puntos;
            if (puntosPorAsignatura[targetUser.id][asignatura] < 0) puntosPorAsignatura[targetUser.id][asignatura] = 0;
            fs.writeFileSync('puntosPorAsignatura.json', JSON.stringify(puntosPorAsignatura));

            puntosDeEstudio[targetUser.id] -= puntos;
            if (puntosDeEstudio[targetUser.id] < 0) puntosDeEstudio[targetUser.id] = 0;
            fs.writeFileSync('puntosDeEstudio.json', JSON.stringify(puntosDeEstudio));

            message.reply(`Eliminado ${puntos} puntos a ${targetUser} en ${asignatura}. Ahora tiene ${puntosPorAsignatura[targetUser.id][asignatura]} puntos en ${asignatura}.`);
        } else {
            message.reply(`${targetUser} no tiene puntos en ${asignatura}.`);
        }
    }


    else if (command === 'eliminarasignatura'){
        if(args.length < 2){
            return message.reply('Por favor, proporciona el usuario y la asignatura a eliminar. Ejemplo: `!eliminarAsignatura @usuario matematicas`');
        }
        const targetUser = message.mentions.users.first();
        const asignatura = args[1];

        if(!targetUser){
            return message.reply('Por favor, proporciona un usuario válido.');
        }

        if (puntosPorAsignatura[targetUser.id] && puntosPorAsignatura[targetUser.id][asignatura]) {
            delete puntosPorAsignatura[targetUser.id][asignatura];
            fs.writeFileSync('puntosPorAsignatura.json', JSON.stringify(puntosPorAsignatura));
            message.reply(`Asignatura ${asignatura} eliminada para ${targetUser}.`);
        } else {
            message.reply(`${targetUser} no tiene puntos en ${asignatura}.`);
        }
    }


    else if (command === 'setpuntos') {
        if (args.length < 2) {
            return message.reply('Por favor, proporciona el usuario y la cantidad de puntos a establecer. Ejemplo: `!setpuntos @usuario 100`');
        }
        const targetUser = message.mentions.users.first();
        const puntos = parseInt(args[1]);
    
        if (!targetUser || isNaN(puntos)) {
            return message.reply('Por favor, proporciona un usuario válido y una cantidad de puntos válida.');
        }
    
        // Actualiza los puntos en la estructura de datos
        puntosDeEstudio[targetUser.id] = puntos;
    
        // Guarda los cambios en el archivo JSON de forma sincrónica
        fs.writeFileSync('puntosDeEstudio.json', JSON.stringify(puntosDeEstudio));
    
        message.reply(`Los puntos de ${targetUser} han sido establecidos en ${puntos}.`);
    }
    

    else if(command === 'help'){
        const helpMessage = `
        **Comandos del Bot de Estudio:**
        \`\`\`
   1.     !empezar <asignatura>         - Comienza a estudiar una asignatura.
   2.     !terminar                     - Termina la sesión de estudio y gana puntos.
   3.     !ranking                      - Muestra el ranking de los 10 usuarios con más puntos.
   4.     !retopersonalizado <duración> - Crea un reto de estudio personalizado. (3h, 45m, 23m...)
   5.     !retos                        - Te da un reto de estudio aleatorio entre 1 y 5 horas.
   6.     !terminarReto                 - Termina el reto de estudio actual.
   7.     !rankingDetallado             - Muestra un ranking detallado por asignatura.
   8.     !misPuntos                    - Muestra tus puntos actuales.
   9.     !misPuntosDetallado           - Muestra tus puntos desglosados por asignatura.
  10.     !eliminarAsignatura <asignatura> - Elimina una asignatura.
  11.     !anadirPuntos <usuario> <asignatura> <puntos> - Añade puntos a una asignatura. (Admin)
  12.     !quitarPuntos <usuario> <asignatura> <puntos> - Quita puntos de una asignatura. (Admin)
  13.     !setPuntos <userId> <puntos> - Establece los puntos de un usuario. (Admin)
        \`\`\`
                `;

        message.channel.send(helpMessage);
    } 
});


client.login('...');
