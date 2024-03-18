import express from "express";
import __dirname from "../utils.js";
import {create} from "express-handlebars";
import { Server as server } from 'socket.io'
import { MessageService } from "./db/messages.service.js";



export class Server {
    #app = express();
    #port;
    #publicPath;
    #productsRouter;
    #cartsRouter;
    #messageRouter;
    #viewsProductsRouter;

    constructor(options) {
        const { port, publicPath, productsRouter, cartsRouter, messageRouter, viewsProductsRouter } = options
        this.#port = port
        this.#publicPath = publicPath
        this.#productsRouter = productsRouter
        this.#cartsRouter = cartsRouter
        this.#messageRouter = messageRouter
        this.#viewsProductsRouter = viewsProductsRouter
    }


    async start() {
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({ extended: true }))

        this.#app.use(express.static(__dirname + this.#publicPath))

        const hbs = create({
            extname: '.hbs',
            runtimeOptions: {
              allowProtoPropertiesByDefault: true,
              allowProtoMethodsByDefault: true
            }
          });

        this.#app.engine('.hbs', hbs.engine);

        this.#app.set('views', (__dirname + '/views'));
        this.#app.set('view engine', 'hbs');



        this.#app.use('/api/products', this.#productsRouter)
        this.#app.use('/api/carts', this.#cartsRouter)
        this.#app.use('/api/message', this.#messageRouter)
        this.#app.use('/views', this.#viewsProductsRouter)

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
