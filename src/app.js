import cartsRouter from "./routes/carts.routes.js"
import productRouter from "./routes/products.routes.js"
import messageRouter from './routes/messages.routes.js'
import { Server } from "./service/server.js"
import mongoose from 'mongoose'

(() => {
    main()
})()
function main() {
    const connectMongoDB = async () => {
        try {
            await mongoose.connect('mongodb+srv://arqmolina:t5kawMQhAwC6uIO4@cluster0.lep3vbi.mongodb.net/ecommerse?retryWrites=true&w=majority&appName=Cluster0',{
                dbName:'ecommerse',
            });
            console.log("Conectado con exito a MongoDB usando Moongose.");
          } catch (error) {
            console.error("No se pudo conectar a la BD usando Moongoose: " + error);
            process.exit();
          }     
    };
    const server = new Server({
        port: 3000,
        publicPath: '/public',
        productsRouter: productRouter,
        cartsRouter: cartsRouter,
        messageRouter:messageRouter,
    })
    server.start()
    connectMongoDB();
}




