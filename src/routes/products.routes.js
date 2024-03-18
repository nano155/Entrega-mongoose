import { Router } from "express";
import { ProductsService } from "../service/db/products.service.js";
// import { ProductsService } from "../service/filesystem/products.service.js";



const products = new ProductsService()

const router = Router()

router.get('/', async (req, res) => {
    try {
        const objeto = {
            sort:req.query.sort, 
            filter:req.query.filter, 
            page:(req.query.page)?+req.query.page:1, 
            limit:(req.query.limit)?+req.query.limit:10
        }
        const productos = await products.getProducts(objeto)
        res.send({message:'Listado de productos', payload: productos})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const product = await products.getProductsById(id)
        res.send({message:`producto con id ${id}`, payload: product})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    try {
        const producto = req.body;
        await products.addProducts(producto);
        res.send({ message: 'Producto agregado exitosamente', payload: producto });
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.put('/:id',async (req, res)=>{
    try {
        const id = req.params.id
        const producto = req.body
        const productoActualizado = await products.updateProduct(id, producto)
        res.send({ message: 'Producto actualizado exitosamente', payload: productoActualizado });
    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
})

router.delete('/:id', async (req, res) =>{
    const id = req.params.id
    try {
        const productoBorrado = await products.deleteProduct(id)
        res.send({ message: 'Producto eliminado exitosamente', payload: productoBorrado });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})


export default router