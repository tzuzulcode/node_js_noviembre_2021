require("dotenv").config()

const config = {
    dev: process.env.MODE === "dev",
    port: process.env.PORT || 4000,
    password:process.env.DB_PASSWORD,
    jwt_secret:process.env.JWT_SECRET,
    google_client_id:process.env.GOOGLE_CLIENT_ID,
    google_client_secret:process.env.GOOGLE_CLIENT_SECRET,
    email_host:process.env.EMAIL_HOST,
    email_port:process.env.EMAIL_PORT,
    email_secure:process.env.EMAIL_SECURE,
    email_user:process.env.EMAIL_USER,
    email_password:process.env.EMAIL_PASSWORD,
}

module.exports = config