const db = require('mongoose')

module.exports = () => {console.log(process.env.DB_URL_NONLOCAL); db.connect(process.env.DB_URL_NONLOCAL)}
