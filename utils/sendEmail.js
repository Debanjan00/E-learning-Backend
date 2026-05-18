import nodemailer from "nodemailer";

const sendEmail =
  async (
    email,
    otp,
    name = "Learner"
  ) => {

    const user =
      process.env.EMAIL_USER;

    const pass =
      process.env.EMAIL_PASS;

    if (
      !user ||
      !pass
    ) {

      throw new Error(
        "Email credentials are not configured in .env"
      );
    }

    const transporter =
      nodemailer.createTransport({
        service:
          "gmail",

        auth: {
          user,
          pass,
        },
      });

    const logoUrl =
      process.env
        .EMAIL_LOGO_URL ||

      "https://static.vecteezy.com/system/resources/previews/048/342/176/non_2x/cartoon-rocket-logo-png.png";

    await transporter.sendMail({

      from:
        `E-Learning AI <${user}>`,

      to: email,

      subject:
        "🔥 OTP Verification - E-Learning AI",

      text:
        `Hello ${name}, Your OTP is ${otp}`,

      html: `
      
      <div style="
        margin:0;
        padding:0;
        background:#0f0f0f;
        font-family:Arial,sans-serif;
      ">

        <div style="
          max-width:650px;
          margin:40px auto;
          background:#161616;
          border-radius:28px;
          overflow:hidden;
          border:1px solid rgba(255,152,0,0.2);
          box-shadow:0 0 40px rgba(255,140,0,0.15);
        ">

          <!-- HEADER -->
          <div style="
            background:linear-gradient(135deg,#ff9800,#ff5e00);
            padding:40px 20px;
            text-align:center;
          ">

            <img 
              src="${logoUrl}" 
              alt="logo"
              style="
                width:90px;
                height:90px;
                border-radius:20px;
                object-fit:cover;
                box-shadow:0 0 20px rgba(255,255,255,0.25);
              "
            />

            <h1 style="
              color:white;
              margin-top:20px;
              font-size:34px;
              margin-bottom:10px;
            ">
              E-Learning AI
            </h1>

            <p style="
              color:white;
              opacity:0.92;
              font-size:15px;
            ">
              Futuristic Learning Platform 🚀
            </p>

          </div>

          <!-- BODY -->
          <div style="
            padding:45px 35px;
            color:white;
          ">

            <h2 style="
              margin-top:0;
              font-size:28px;
              color:#ffb74d;
            ">
              Hello ${name} 👋
            </h2>

            <p style="
              font-size:16px;
              line-height:1.8;
              color:#d1d1d1;
            ">
              Welcome to the AI-powered learning universe.
              Use the secure OTP below to verify your account.
            </p>

            <!-- OTP BOX -->
            <div style="
              margin:40px auto;
              width:fit-content;
              padding:22px 40px;
              border-radius:22px;
              background:rgba(255,152,0,0.08);
              border:1px solid rgba(255,152,0,0.3);
              box-shadow:0 0 30px rgba(255,140,0,0.2);
            ">

              <div style="
                font-size:42px;
                letter-spacing:8px;
                font-weight:bold;
                color:#ff9800;
                text-align:center;
              ">
                ${otp}
              </div>

            </div>

            <p style="
              text-align:center;
              color:#999;
              font-size:14px;
              line-height:1.7;
            ">
              This OTP will expire in a few minutes.
              Never share this code with anyone.
            </p>

          </div>

          <!-- FOOTER -->
          <div style="
            background:#111827;
            padding:22px;
            text-align:center;
            border-top:1px solid rgba(255,152,0,0.12);
          ">

            <p style="
              color:#888;
              font-size:13px;
              margin:0;
            ">
              © 2026 E-Learning AI Platform
            </p>

            <p style="
              color:#666;
              font-size:12px;
              margin-top:8px;
            ">
              Smart Learning • AI Powered • Future Ready
            </p>

          </div>

        </div>

      </div>
      `,
    });
  };

export default sendEmail;