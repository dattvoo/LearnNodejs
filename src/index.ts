import express from 'express'

const app = express()

const port = 3000

app.get('/', (res, req) => {
  return req.json({
    message: 'Heeeellooooooo'
  })
})

app.listen(port, () => {
  console.log(`App is listenning on port:${port}`)
})
