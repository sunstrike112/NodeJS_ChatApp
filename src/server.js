import express from "express"
const app = express()

const hostname = "localhost"
const port = 8017

app.get("/hellobugcreator", (req, res) => {
  res.send("<h1>Hello Bug Creator</h1>")
})

app.listen(port, hostname, () => {
  console.log(`Hello Bug Creator, I am running at ${hostname}: ${port}/`)
})
