import cors from 'cors'
import express, { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import router from './routes'
import helmet from 'helmet'
import { Morgan } from './shared/morgan'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app = express()

//morgan
app.use(Morgan.successHandler)
app.use(Morgan.errorHandler)
app.use(helmet())
//body parser
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//file retrieve
app.use(express.static('uploads'))

//router
app.use('/api/v1', router)

//live response
app.get('/', (req: Request, res: Response) => {
  res.send(
    '<h1 style="text-align:center; color:#A55FEF; font-family:Verdana;">Hey, How can I assist you today!</h1>'
  )
})

//global error handle
app.use(globalErrorHandler)

//handle not found route;
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API DOESN'T EXIST",
      },
    ],
  })
})

export default app
