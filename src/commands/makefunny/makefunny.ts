import {Command, Log} from "@ubccpsc310/bot-base";
import { Client, Message } from "discord.js";

// Roses are red
// Violets do grow
// I don't know shit about javascript
// but I can copy from stackoverflow
import * as imagizer from "imagizer";
import request from "request";
import * as fs from 'fs';

const bufferpath = "./data/buffer.png";

const makefunny: Command = {
    name: "makefunny",
    description: "Makes an image funny",
    usage: "makefunny on a message with a png attached",
    procedure: async (client: Client, message: Message) => {
        if (message.attachments.size === 1) {
            const img = message.attachments.entries().next().value[1];
            const imgurl = img.attachment;
            const imght = img.height;
            const imgwt = img.width;

            const ok_types = ["image/png"];

            if (!ok_types.includes(img.contentType)) {
                return message.channel.send("uh oh I think you did a fricky wicky...  :eyes: pwease onwy call me with a png uwu");
            }

            request.get(imgurl)
                .on('error', Log.error)
                .pipe(fs.createWriteStream(bufferpath))
                .on('finish', () => {
                    const project = new imagizer.Project(imgwt, imght);

                    const layer1 = project.createLayer({
                        blendingMode: "normal", // optional
                    });

                    const image1 = new imagizer.Image();
                    image1.load(bufferpath, function () {
                        const obj = layer1.put(image1, 0, 0);
                        obj.applyEffect("contrast", { contrast: Math.random() * 0.50 + 0.2 });
                        obj.applyEffect("brightness", { brightness: Math.random() * 0.15 + 0.05 });
                        obj.applyEffect("dither");
                        obj.applyEffect("exposure", { exposure: Math.random() * 0.3 + 0.5 });
                        obj.applyEffect("brightness", { brightness: Math.random() * 0.1 + 0.35 });
                        obj.applyEffect("contrast", { contrast: Math.random() * 0.1 + 0.7 });
                        obj.applyEffect("water", { wavelength: 30, amplitude: 0.2 * Math.random(), radius: Math.max(imght, imgwt) });
                        obj.applyEffect("sphere", { a: 0.9, b: 0.8, refractionIndex: 5.6 });
                        // obj.applyEffect("gain");// , { gammaRed: 1, gammaGreen: 0.7, gammaBlue: 0.3 });
                    });

                    project.save(bufferpath);

                    return message.channel.send({ files: [bufferpath] });

                });
        }
        else {
            return message.channel.send("ahhhh omg.... jeez I wish you attached an image to me... ah aha just kidding..,.. unless? :pleading_face: :point_right: :point_left:");
        }
    },
};

export default makefunny;
