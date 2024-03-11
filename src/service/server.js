import express from "express";
import __dirname from "../utils.js";
import { engine } from "express-handlebars";
import { Server as server } from 'socket.io'
import { MessageService } from "./db/messages.service.js";


export class Server {
    #app = express();
    #port;
    #publicPath;
    #productsRouter;
    #cartsRouter;
    #messageRouter;

    constructor(options) {
        const { port, publicPath, productsRouter, cartsRouter, messageRouter } = options
        this.#port = port
        this.#publicPath = publicPath
        this.#productsRouter = productsRouter
        this.#cartsRouter = cartsRouter
        this.#messageRouter = messageRouter
    }


    async start() {
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({ extended: true }))

        this.#app.use(express.static(__dirname + this.#publicPath))


        this.#app.engine('.hbs', engine({ extname: '.hbs' }));

        this.#app.set('views', (__dirname + '/views'));
        this.#app.set('view engine', 'hbs');



        this.#app.use('/api/products', this.#productsRouter)
        this.#app.use('/api/carts', this.#cartsRouter)
        this.#app.use('/api/message', this.#messageRouter)

        const httpServer = this.#app.listen(this.#port, () => {
            console.log(`listen port ${this.#port}`);
        })


        const socketServer = new server(httpServer)

        socketServer.on('connection', async (socket) => {
            try {
                socket.on('connected', (user)=>{
                    socket.broadcast.emit('conexion', user);
                });
                // const users = await MessageService.getUsersUnique();
        
                socket.on('send-message', async (message) => {
                    try {
                        const messageSend = await MessageService.addMessage(message); 
                            socket.broadcast.emit('received-message', messageSend );
                    } catch (error) {
                        console.log(error);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        })

    }

}
