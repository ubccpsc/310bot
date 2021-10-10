import { Command } from "@ubccpsc310/bot-base";
import { Client, Message } from "discord.js";

// Roses are red
// Violets do grow
// I don't know shit about javascript
// but I can copy from stackoverflow
import * as imagizer from "imagizer";
import request from "request";
import * as fs from 'fs';



// Paramaters
const bufferdir = "./data/";
const buffername = "buffer.png";

const ok_types = ["image/png"];

enum MessageError {
    ER_EMPTY,
    ER_FILETYPE,
    ER_DOWNLOAD,
    ER_SAVE
}

const cringe: { [key in MessageError]: string } = {
    [MessageError.ER_EMPTY]: "ahhhh omg.... jeez I wish you attached an image to me... ah aha just kidding..,.. unless? :pleading_face: :point_right: :point_left:",
    [MessageError.ER_FILETYPE]: "uh oh I think you did a fricky wicky...  :eyes: pwease onwy call me with a png uwu",
    [MessageError.ER_DOWNLOAD]: "oh noes my netuwurk had an errorawr", // I'm so sorry but I have to commit to the bit
    [MessageError.ER_SAVE]: "hahah omg I'm so fricken clumsy n i lost your image I'm so sowwy"
};



function applyFunny(path, width, height) {
    const project = new imagizer.Project(width, height);
    const layer1 = project.createLayer();
    const im = new imagizer.Image();
    im.load(bufferdir + buffername, function () {
        const obj = layer1.put(im, 0, 0);
        obj.applyEffect("contrast", { contrast: Math.random() * 0.50 + 0.2 });
        obj.applyEffect("brightness", { brightness: Math.random() * 0.15 + 0.05 });
        obj.applyEffect("dither");
        obj.applyEffect("exposure", { exposure: Math.random() * 0.3 + 0.5 });
        obj.applyEffect("brightness", { brightness: Math.random() * 0.1 + 0.35 });
        obj.applyEffect("contrast", { contrast: Math.random() * 0.1 + 0.7 });
        obj.applyEffect("water", { wavelength: 30, amplitude: 0.2 * Math.random(), radius: Math.max(width, height) });
        obj.applyEffect("sphere", { a: 0.9, b: 0.8, refractionIndex: 5.6 });
    });

    project.save(path);
}

const makefunny: Command = {
    name: "makefunny",
    description: "Makes an image funny",
    usage: "makefunny on a message with a png attached",

    procedure: async (client: Client, message: Message) => {

        if (message.attachments.size !== 1) {
            return message.channel.send(cringe[MessageError.ER_EMPTY]);
        }

        await message.channel.sendTyping();
        const img = message.attachments.entries().next().value[1];

        if (!ok_types.includes(img.contentType)) {
            return message.channel.send(cringe[MessageError.ER_FILETYPE]);
        }

        if (!fs.existsSync(bufferdir)) {
            fs.mkdirSync(bufferdir);
        }

        request.get(img.attachment)
            .on('error', () => {
                return message.channel.send(cringe[MessageError.ER_DOWNLOAD]);
            })
            .pipe(fs.createWriteStream(bufferdir + buffername))
            .on('error', () => {
                return message.channel.send(cringe[MessageError.ER_SAVE]);
            })
            .on('finish', () => {
                applyFunny(bufferdir + buffername, img.width, img.height);
                return message.channel.send({ files: [bufferdir + buffername] });
            });

    }
};

export default makefunny;
