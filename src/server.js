import express from "express"
import ConnectDB from "./config/connectDB"
import ContactModel from "./models/contact.model"

const app = express()

// Connect to MongoDb
ConnectDB()

app.get("/testdb", async (req, res) => {
  try {
    let item = {
      userId: "uchac111121212111j",
      contactId: "chdt cmnrsjsh",
    }
    let contact = await ContactModel.createNew(item)
    res.send(contact)
  } catch (error) {
    console.log(error)
  }
})

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log(
    `Hello Bug Creator, I am running at ${process.env.APP_HOST}: ${process.env.APP_PORT}/`
  )
})
