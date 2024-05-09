import express, { Application } from 'express'
import dotenv from 'dotenv'
import RestaurantRouter from './routes/restaurantRoutes'
import RatingRouter from './routes/ratingRoutes'
import OrderRouter from './routes/orderRoutes'
import client from './db/db'

//For env File
dotenv.config()

const app: Application = express()
const port = process.env.PORT || 8000

app.use(express.json())

app.use('/restaurants', RestaurantRouter)
app.use('/ratings', RatingRouter)
app.use('/order', OrderRouter)

app.listen(port, () => {
  console.log(`Server is On at http://localhost:${port}`)
})

process.on('SIGINT', () => {
  client.end((err: Error) => {
    if (err) {
      console.error('error during disconnection', err.stack)
    }
    process.exit()
  })
})

process.on('SIGTERM', () => {
  client.end((err: Error) => {
    if (err) {
      console.error('error during disconnection', err.stack)
    }
    process.exit()
  })
})
