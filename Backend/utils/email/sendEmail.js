import transporter from "./transporter.js";

const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: process.env.PORTAL_EMAIL,
            to: to,
            subject: subject,
            html: html,
        };

        await transporter.sendMail(mailOptions);
        console.log("📧 Email sent successfully to:", to);
    } catch (error) {
        console.error("❌ Email sending failed:", error.message);
    }
}

export default sendEmail;