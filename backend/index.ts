import express from 'express'
import dotenv from 'dotenv'
// import path from 'path'
const cors = require('cors')
dotenv.config();

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
// app.use(express.static(path.join(__dirname, 'client/build')))

// Test endpoint
app.get('/', (request, response) => {
  response.json({ message: `Welcome to backend!!` })
})

// Example of using different routers
// app.use('/model1', model1Router)
// app.use('/model2', model2Router)


const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})