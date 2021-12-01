// eslint-disable-next-line import/no-extraneous-dependencies
import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

export const mailTransport = nodemailer.createTransport({
  host: process.env.smtpServer,
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.postUser,
    pass: process.env.postPass,
  },
});
