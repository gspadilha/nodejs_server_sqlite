/*jslint node: true */
'use strict';

const config = require('../../configs/config');
const nodemailer = require('nodemailer');

exports.send = async ({ from, to, subject, text }) => {
    let transporter = nodemailer.createTransport({
        host: config.email.host,
        port: config.email.port,
        auth: {
            user: config.email.user,
            pass: config.email.pass
        }
    });

    let info = await transporter.sendMail({
        from: from, // quem está mandando
        to: to, // lista de email, separados por ','
        subject: subject, // assunto
        html: text, // corpo html
    });

    console.log("Message sent: %s", info.messageId);
};
