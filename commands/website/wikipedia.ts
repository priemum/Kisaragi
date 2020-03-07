import {Message, MessageAttachment} from "discord.js"
import fs from "fs"
import wiki from "wikijs"
import {Command} from "../../structures/Command"
import {Embeds} from "./../../structures/Embeds"
import {Functions} from "./../../structures/Functions"
import {Kisaragi} from "./../../structures/Kisaragi"

const svg2img = require("svg2img")

export default class Wikipedia extends Command {
    constructor(discord: Kisaragi, message: Message) {
        super(discord, message, {
            description: "Searches for wikipedia articles.",
            help:
            `
            \`wikipedia\` - Gets a random article
            \`wikipedia query\` - Searches for an article
            \`wikipedia url\` - Gets the article from the url
            `,
            examples:
            `
            \`=>wikipedia\`
            \`=>wikipedia anime\`
            `,
            aliases: ["w", "wiki"],
            random: "none",
            cooldown: 10
        })
    }

    public run = async (args: string[]) => {
        const discord = this.discord
        const message = this.message
        const embeds = new Embeds(discord, message)

        const wikipedia = wiki()

        let title
        if (!args[1]) {
            title = await wikipedia.random(1)
        } else {
            let query = Functions.combineArgs(args, 1)
            if (query.match(/en.wikipedia.org/)) {
                query = query.match(/(?<=\/)(?:.(?!\/))+$/)?.[0].replace(/_/g, " ")!
            }
            const result = await wikipedia.search(query, 1)
            title = result.results
        }

        const page = await wikipedia.page(title[0]) as any
        const summary = await page.summary()
        const mainImg = await page.mainImage()

        if (mainImg.slice(-3) === "svg") {
            await svg2img(mainImg, function(error: Error, buffer: Buffer) {
                    fs.writeFileSync("../assets/images/wiki.png", buffer)
            })

            await Functions.timeout(500)

            const attachment = new MessageAttachment("../assets/images/wiki.png")

            const wikiEmbed = embeds.createEmbed()
            wikiEmbed
            .setAuthor("wikipedia", "https://s3.amazonaws.com/static.graphemica.com/glyphs/i500s/000/010/228/original/0057-500x500.png")
            .setTitle(`**Wikipedia Article** ${discord.getEmoji("raphi")}`)
            .setURL(page.raw.fullurl)
            .attachFiles([attachment])
            .setImage(`attachment://wiki.png`)
            .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFv5c96eAMFjLxlSiE9F5GYKgzrMBPlUygB9vZzOUetVipzIe")
            .setDescription(
                `${discord.getEmoji("star")}_Title:_ **${page.raw.title}**\n` +
                `${discord.getEmoji("star")}_Last Revision:_ **${Functions.formatDate(page.raw.touched)}**\n` +
                `${discord.getEmoji("star")}_Summary:_ ${Functions.checkChar(summary, 1800, ".")}\n`
            )
            message.channel.send(wikiEmbed)

        } else {

            const wikiEmbed = embeds.createEmbed()
            wikiEmbed
            .setAuthor("wikipedia", "https://s3.amazonaws.com/static.graphemica.com/glyphs/i500s/000/010/228/original/0057-500x500.png")
            .setTitle(`**Wikipedia Article** ${discord.getEmoji("raphi")}`)
            .setURL(page.raw.fullurl)
            .setImage(mainImg)
            .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFv5c96eAMFjLxlSiE9F5GYKgzrMBPlUygB9vZzOUetVipzIe")
            .setDescription(
                `${discord.getEmoji("star")}_Title:_ **${page.raw.title}**\n` +
                `${discord.getEmoji("star")}_Last Revision:_ **${Functions.formatDate(page.raw.touched)}**\n` +
                `${discord.getEmoji("star")}_Summary:_ ${Functions.checkChar(summary, 1800, ".")}\n`
            )
            message.channel.send(wikiEmbed)

        }

    }
}
