const express = require("express")
const axios = require("axios")

let app = express()
let TELEGRAM_TOKEN = "7517888368:AAEGfmhjqUdEQOqEz1NO8SHYxo8yfmb2-_c"
let CHAT_ID = "6296434694"

app.get("/", async (req, res) => {
  let ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress
  let message = `Request baru\nIP: ${ip}\nUA: ${req.headers["user-agent"]}`

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message
    })
  } catch (err) {}

  res.json({ ip: ip })
})

let PORT = 3000
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`)
})