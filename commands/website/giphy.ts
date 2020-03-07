import type {Message} from "discord.js"
import Giphy, {MultiResponse} from "giphy-api"
import {Command} from "../../structures/Command"
import {Embeds} from "../../structures/Embeds"
import {Functions} from "./../../structures/Functions"
import {Kisaragi} from "./../../structures/Kisaragi"

export default class GiphyCommand extends Command {
    constructor(discord: Kisaragi, message: Message) {
        super(discord, message, {
            description: "Searches for a gif on giphy.",
            help:
            `
            \`giphy\` - Gets a random gif
            \`giphy query\` - Searches giphy for the query.
            `,
            examples:
            `
            \`=>giphy\`
            \`=>giphy anime\`
            `,
            aliases: ["gif"],
            random: "none",
            cooldown: 5
        })
    }

    public run = async (args: string[]) => {
        const discord = this.discord
        const message = this.message
        const embeds = new Embeds(discord, message)
        const giphy = Giphy(process.env.GIPHY_API_KEY)
        const query = Functions.combineArgs(args, 1)
        const giphyEmbed = embeds.createEmbed()
        let gif
        if (query) {
            if (query.match(/giphy.com/)) {
                const id = query.match(/-(?:.(?!-))+$/)?.[0].replace(/-/g, "")
                gif = await giphy.id(id!).then((r: MultiResponse) => r.data[0])
            } else {
                const result = await giphy.random(query)
                gif = result.data
            }
        } else {
            const result = await giphy.trending()
            const random = Math.floor(Math.random() * result.data.length)
            gif = result.data[random]
        }
        giphyEmbed
        .setAuthor("giphy", "https://media0.giphy.com/media/YJBNjrvG5Ctmo/giphy.gif")
        .setTitle(`**Giphy Gif** ${discord.getEmoji("raphi")}`)
        .setURL(gif.url)
        .setDescription(
            `${discord.getEmoji("star")}_Title:_ **${gif.title}**\n` +
            `${discord.getEmoji("star")}_Creation Date:_ **${Functions.formatDate(new Date(gif.import_datetime))}**\n` +
            `${discord.getEmoji("star")}_Source Post:_ ${gif.source_post_url ? gif.source_post_url : "None"}\n`
        )
        .setImage(gif?.images?.original?.url ?? "")
        message.channel.send(giphyEmbed)
    }
}
