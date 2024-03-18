import { Router } from "express";
import { ProductsService } from "../service/db/products.service.js";
import { CartsService } from "../service/db/carts.service.js";


const products = new ProductsService()
const carts = new CartsService()
const router = Router()

router.get('/products', async (req, res)=>{
    try {
        const objeto = {
            sort:req.query.sort, 
            filter:req.query.filter, 
            page:(req.query.page)?+req.query.page:1, 
            limit:(req.query.limit)?+req.query.limit:10
        }    
        let productos = await products.getProducts(objeto)
        console.log(productos);
        res.render("views.products.hbs", productos)
    } catch (error) {

    }
})
router.get('/products/:pid', async (req, res) => {
        try {
                const pid = req.params.pid
                const productos = await products.getProductsById(pid)
                res.render("views.details.hbs", productos)
        } catch (error) {
                res.status(400).send({ error })
        }
})
router.get('/carts/:cid', async (req, res)=>{
        try {
                const cid = req.params.cid
                const cart = await carts.getCartById(cid)
                res.render('views.cart.hbs', cart)
        } catch (error) {
                res.status(400).send({ error })
                
        }
})

export default router