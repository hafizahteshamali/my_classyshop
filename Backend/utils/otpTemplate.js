const otpTemplate = (username, otp) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Email Verification</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
      
      <table align="center" width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
        <tr>
          <td align="center">
            
            <!-- Card -->
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;padding:30px;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
              
              <!-- Header -->
              <tr>
                <td align="center" style="padding-bottom:20px;">
                  <h2 style="margin:0;color:#333;">Email Verification</h2>
                </td>
              </tr>
  
              <!-- Greeting -->
              <tr>
                <td style="color:#555;font-size:16px;padding-bottom:15px;">
                  Hello <strong>${username}</strong>,
                </td>
              </tr>
  
              <!-- Message -->
              <tr>
                <td style="color:#555;font-size:15px;padding-bottom:25px;">
                  Thank you for signing up. Please use the OTP below to verify your email address.
                </td>
              </tr>
  
              <!-- OTP Box -->
              <tr>
                <td align="center" style="padding-bottom:25px;">
                  <div style="display:inline-block;background:#f0f3ff;color:#2b59ff;
                              font-size:28px;font-weight:bold;
                              letter-spacing:6px;
                              padding:15px 30px;
                              border-radius:6px;">
                    ${otp}
                  </div>
                </td>
              </tr>
  
              <!-- Expiry -->
              <tr>
                <td style="color:#777;font-size:14px;padding-bottom:20px;">
                  ⏳ This OTP will expire in <strong>10 minutes</strong>.
                </td>
              </tr>
  
              <!-- Footer -->
              <tr>
                <td style="color:#999;font-size:13px;border-top:1px solid #eee;padding-top:20px;">
                  If you did not create an account, please ignore this email.
                </td>
              </tr>
  
            </table>
            <!-- End Card -->
  
          </td>
        </tr>
      </table>
  
    </body>
    </html>
    `;
  };
  
  export default otpTemplate;