import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

type SendMailProps = {
	to: string;
	subject: string;
	text: string;
};

export const sendEmail = async ({ to, subject, text }: SendMailProps) => {
	console.log(process.env.EMAIL);
	console.log(process.env.PASSWORD);

	const transporter = nodemailer.createTransport({
		host: process.env.HOST ?? '',
		port: process.env.PORT ? parseInt(process.env.PORT) : 465,
		secure: true,
		auth: {
			user: process.env.EMAIL ?? '',
			pass: process.env.PASSWORD ?? ''
		}
	});

	try {
		await transporter.sendMail({
			from: `"${process.env.EMAIL}" <${process.env.EMAIL}>`,
			to,
			subject,
			text
		});
	} catch (error) {
		console.error('Error sending email:', error);
	}
};
