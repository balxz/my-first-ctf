const express = require("express")
const axios = require("axios")

let app = express()
let TELEGRAM_TOKEN = "7517888368:AAEGfmhjqUdEQOqEz1NO8SHYxo8yfmb2-_c"
let CHAT_ID = "6296434694"

app.get("/", async (req, res) => {
  let ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress
  let ua = req.headers["user-agent"]
  let message = `Request baru\nIP: ${ip}\nUA: ${ua}`

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message
    })
  } catch (err) {}

  if (req.query.format === "json") {
    res.json({ ip: ip })
  } else {
    res.send(ip)
  }
})

let PORT = 3000
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`)
})
