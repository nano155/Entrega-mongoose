import { Router } from "express";
import { CartsService } from "../service/db/carts.service.js";
// import { CartsService } from "../service/filesystem/carts.service.js";


const router = Router()
const carts = new CartsService()

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const getCarts = await carts.getCartById(id)
        res.send(getCarts)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const cart = await carts.createCart()
        res.send({ message: 'cart creado exitosamente!!', payload: cart })
    } catch (error) {
        res.json({ message: error.message })
    }
})

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const productoAgregado = await carts.addProductsToCart(cid, pid)
        res.send(productoAgregado)
    } catch (error) {
        res.status(500).json({message : error.message})
    }

})

router.delete('/:cid/products/:pid', async (req, res)=>{
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const productoBorrado = await carts.deleteProduct(cid, pid)
        res.send(productoBorrado)  
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})
router.delete('/:cid', async (req, res)=>{
    try {
        const cid = req.params.cid
        const productosBorrado = await carts.deleteAllProduct(cid)
        res.send(productosBorrado)  
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})
router.put('/:cid', async (req, res)=>{
    try {
        const cid = req.params.cid
        const products = req.body
        const cartUpdate = await carts.updateCart(cid, products)
        res.send(cartUpdate)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})
router.put('/:cid/products/:pid', async (req, res)=>{
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const {quantity} = req.body
        const productoActualizado = await carts.updateProductQuantity(cid, pid, quantity)
        res.send(productoActualizado)  
    } catch (error) {
        res.status(500).json({message : error.message})
    }

})


export default router