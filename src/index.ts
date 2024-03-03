/* eslint-disable no-console */
import dotenv from 'dotenv'
import express, { Express, json, urlencoded } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import errors from './errors'
import services from './services'
import { Server } from 'http'
import { getMongoDbUri } from './utils/general'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000
let server: Server | null

app.use(json())
app.use(urlencoded({ extended: false }))

app.use(cors())

app.use(services)

app.use(errors)

void getMongoDbUri().then((uri) => {
  void mongoose.connect(uri).then(() => {
    console.log('Mongoose Ready')
    server = app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
    })
  })
})

export { app, server }
