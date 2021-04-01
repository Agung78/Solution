const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes/index')
const port = 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})