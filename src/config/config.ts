import { config as conf } from "dotenv"
conf()
const _config={
    port:process.env.port,
    databaseUrl:process.env.databaseUrl,
    env:process.env.NODE_ENV,
    jwtsecuritytoken:process.env.jwtsecuritytoken,
    cloud_name:process.env.cloud_name,
        api_key: process.env.api_key, 
        api_secret: process.env.api_secret
}
export const config=Object.freeze(_config)