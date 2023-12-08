import express from 'express'
import databaseService from './services/database.services'

const app = express()
const port = 3000

app.get('/', (res, req) => {
  return req.json({
    message: 'Heeeellooooooo'
  })
})
databaseService.connect()
app.listen(port, () => {
  console.log(`App is listenning on port:${port}`)
})
