require("dotenv").config()

const config = {
    dev: process.env.MODE === "dev",
    port: process.env.PORT || 4000,
    password:process.env.DB_PASSWORD,
    jwt_secret:process.env.JWT_SECRET
}

module.exports = config