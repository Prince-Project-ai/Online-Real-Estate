import nodemailer from "nodemailer";

export const Transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "gayatridairy2001@gmail.com",
    pass: "cvxrtwiyvhsdjehv",
  },
});