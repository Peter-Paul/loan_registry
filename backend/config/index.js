// const dotEnv  = require("dotenv");
require('dotenv').config()

// if (process.env.NODE_ENV !== 'prod') {
//     const configFile =  `./.env.${process.env.NODE_ENV}`;
//     dotEnv.config({ path:  configFile });
// } else {
//     dotEnv.config();
// }

module.exports = {
    PORT: process.env.PORT,
    ACCESS_SECRET: process.env.ACCESS_SECRET,
    REFRESH_SECRET: process.env.REFRESH_SECRET
}
 