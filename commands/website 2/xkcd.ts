import {Message} from "discord.js"
import {Command} from "../../structures/Command"
import {Embeds} from "./../../structures/Embeds"
import {Functions} from "./../../structures/Functions"
import {Kisaragi} from "./../../structures/Kisaragi"

const xkcd = require("xkcd")

export default class Xkcd extends Command {
    constructor(discord: Kisaragi, message: Message) {
        super(discord, message, {
            description: "Searches for an xkcd comic.",
            help:
            `
            \`xkcd\` - Posts the most recent comic
            \`xkcd id/url\` - Gets a comic by id or url
            `,
            examples:
            `
            \`=>xkcd\`
            \`=>xkcd 42\`
            `,
            aliases: [],
            random: "none",
            cooldown: 5
        })
    }

    public run = async (args: string[]) => {
        const discord = this.discord
        const message = this.message
        const embeds = new Embeds(discord, message)
        const xkcdEmbed = embeds.createEmbed()
        const monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ]

        if (args[1]) {
            let id = args[1]
            if (args[1].match(/xkcd.com/)) {
                id = args[1].match(/\d+/)![0]
            }
            await xkcd(Number(id), (comic: any) => {
                const cleanText = comic.transcript.replace(/\[\[/g, "**").replace(/\]\]/g, "**").replace(/{{/g, "_").replace(/}}/g, "_")
                const checkedText = Functions.checkChar(cleanText, 2000, ",")
                xkcdEmbed
                .setAuthor("xkcd", "https://images-na.ssl-images-amazon.com/images/I/51qKVpRPnDL._SY355_.png")
                .setURL(`https://xkcd.com/${comic.num}/`)
                .setTitle(`**xkcd Comic** ${discord.getEmoji("kannaSpook")}`)
                .setDescription(
                `${discord.getEmoji("star")}_Title:_ **${comic.title}**\n` +
                `${discord.getEmoji("star")}_ID:_ **${comic.num}**\n` +
                `${discord.getEmoji("star")}_Date:_ **${monthNames[comic.month]} ${comic.day}, ${comic.year}**\n` +
                `${discord.getEmoji("star")}_Transcript_: ${checkedText ? checkedText : "None"}\n`
                )
                .setThumbnail(message.author!.displayAvatarURL())
                .setImage(comic.img)
                message.channel.send(xkcdEmbed)
            })
        } else {
            await xkcd((comic: any) => {
                const cleanText = comic.transcript.replace(/\[\[/g, "**").replace(/\]\]/g, "**").replace(/{{/g, "_").replace(/}}/g, "_")
                const checkedText = Functions.checkChar(cleanText, 2000, ",")
                xkcdEmbed
                .setAuthor("xkcd", "https://images-na.ssl-images-amazon.com/images/I/51qKVpRPnDL._SY355_.png")
                .setURL(`https://xkcd.com/${comic.num}/`)
                .setTitle(`**xkcd Comic** ${discord.getEmoji("kannaSpook")}`)
                .setDescription(
                `${discord.getEmoji("star")}_Title:_ **${comic.title}**\n` +
                `${discord.getEmoji("star")}_ID:_ **${comic.num}**\n` +
                `${discord.getEmoji("star")}_Date:_ **${monthNames[comic.month]} ${comic.day}, ${comic.year}**\n` +
                `${discord.getEmoji("star")}_Transcript_: ${checkedText ? checkedText : "None"}\n`
                )
                .setThumbnail(message.author!.displayAvatarURL({format: "png", dynamic: true}))
                .setImage(comic.img)
                message.channel.send(xkcdEmbed)
            })
        }
    }
}
