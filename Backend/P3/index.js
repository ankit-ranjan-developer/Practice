import { input } from '@inquirer/prompts';
import qr from "qr-image";
import fs from "fs";
// var qr = require('qr-image');

const answer = await input({ message: 'Enter your website' });
console.log(answer);

var qr_svg = qr.image(answer, { type: 'png' });

// qr_svg.pipe(fs.createWriteStream("./Keep/01_" + answer+'.png'));

qr_svg.pipe(fs.createWriteStream("./Keep/01_"+'website.png'));


// var svg_string = qr.imageSync(answer, { type: 'png' });
// console.log(svg_string);