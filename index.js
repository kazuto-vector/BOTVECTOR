const Discord = require("discord.js");
const bot = new Discord.Client();

bot.login(process.env.token);

bot.on("message", (message) =>{
    if(message.content == "che ore sono?"){
        var data = new Date();
        var ora = data.getHours();
        var minuto = data.getMinutes();

        message.channel.send("ORA ATTUALE: " + ora + ":" + minuto);
    }
});

bot.on("message", (message) =>{
    if(message.content.startsWith("$kick")){

        var utenteKick = message.mentions.members.first();

        if(!message.member.hasPermission("KICK_MEMBERS")){
            message.channel.send("Non hai il permesso");
            return;
        }

        if(!utenteKick) {
            message.channel.send("Non hai menzionato nessun utente")
            return;
        }

        if(!utenteKick.kickable) {
            message.channel.send("Il bot non ha il permesso");
            return;
        }

       
        utenteKick.kick()
            .then(() => message.channel.send("<@" + utenteKick + "> è stato kickato"))
    }
});

bot.on("message", (message) =>{
    if(message.content.startsWith("$ban")){

        var utenteBan = message.mentions.members.first();

        if(!message.member.hasPermission("BAN_MEMBERS")){
            message.channel.send("Non hai il permesso");
            return;
        }

        if(!utenteBan) {
            message.channel.send("Non hai menzionato nessun utente")
            return;
        }

        if(!utenteBan.kickable) {
            message.channel.send("Il bot non ha il permesso");
            return;
        }

       
        utenteBan.ban()
            .then(() => message.channel.send("<@" + utenteBan + "> è stato Bannato"))
    }
});

bot.on("message", (message) => {
    if(message.content == "$audio") {
       var canaleVocale = message.member.voice.channel;

       if(!canaleVocale){
           message.channel.send("Non sei in un canale vocale");
       }
       else {
           canaleVocale.join()
               .then(connection => {
                 connection.play("audio.mp3")
        })
}
    }
});

bot.on("message", (message) => {
    if (message.content == "!comando") {
        message.channel.send("Segli una reazione")
            .then(messaggio => {
                messaggio.react("👍");
                messaggio.react("👎");

                var filtro = (reaction, user) => ["👍", "👎"].includes(reaction.emoji.name) && user.id == message.author.id;

                messaggio.awaitReactions(filtro, { max: 1, time: 10000 })
                    .then(collected => {
                        var reazione = collected.first().emoji.name;
                        if (reazione == "👍") {
                            message.channel.send("OK, bravo");
                        }
                        if (reazione == "👎") {
                            message.channel.send("NO, arrivederci");
                        }

                    }).catch(collected => {
                        return message.channel.send("Tempo scaduto!");
                    })




            })
    }
})
