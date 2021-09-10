const express = require('express')
const cors = require('cors')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        //Middlewares
        this.middlewares()
        //Routes
        this.routes()
    }

    middlewares() {
        //Cors
        this.app.use(cors())
        
        //Lectura y parseo del body
        this.app.use(express.json())

        //Directorio público
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use('/api/users', require('../routes/user'))

    }

    listen() {
        this.app.listen(this.port, () => {
        console.log(`Example app listening at http://localhost:${this.port}`)
      })
    }
}


module.exports= Server