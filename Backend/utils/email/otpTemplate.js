const otpTemplate = (name, otp) => {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #4CAF50;">Hello ${name},</h2>
        <p>Thank you for registering with us!</p>
        <p>Your One-Time Password (OTP) is:</p>
  
        <h1 style="background-color: #f0f0f0; padding: 10px 20px; display: inline-block; border-radius: 6px; color: #333;">
          ${otp}
        </h1>
  
        <p style="margin-top: 20px;">This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
  
        <br />
        <p style="font-size: 14px; color: #777;">If you did not request this, you can ignore this email.</p>
        <p style="color: #888;">– Ecommerce App Team</p>
      </div>
    `;
  };
  
  export default otpTemplate;