require("dotenv").config()

const config = {
    dev: process.env.MODE === "dev",
    port: process.env.PORT || 4000,
    password:process.env.DB_PASSWORD,
    jwt_secret:process.env.JWT_SECRET,
    google_client_id:process.env.GOOGLE_CLIENT_ID,
    google_client_secret:process.env.GOOGLE_CLIENT_SECRET
}

module.exports = config