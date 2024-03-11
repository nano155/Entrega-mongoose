
import fs from "fs";
import { Product } from "./models/products.js";


export class ProductsService {

    constructor() {

        this.products = [];
        this.dirName = "./src/data";
        this.path = `${this.dirName}/productos.json`;
    }


    async #readFile() {
        if (!fs.existsSync(this.path)) return []
        const resultado = await (fs.promises.readFile(this.path, 'utf8'));
        if (!resultado) return []
        return JSON.parse(resultado)
    }

    async #createDir() {
        if (!fs.existsSync(this.dirName))
            await fs.promises.mkdir(this.dirName)
    }

    async addProducts(producto) {
        await this.#createDir()
        try {
            const newProduct = new Product(producto)
            const prev = await this.#readFile()
            this.products = [...prev, { ...newProduct }]
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
        } catch (error) {
            throw error
        }
    }

    async getProducts() {
        return await this.#readFile()
    }

    async getProductsById(id) {
        const productos = await this.#readFile()
        if (!productos.find(producto => producto.id === id)) {
            throw new Error(`No se encontro producto con el id: ${id}`)

        }
        return productos.find(producto => producto.id === id)
    }

    async deleteProduct(id) {
        let productos = await this.#readFile()
        if (!productos.find(producto => producto.id === id)) {
            throw new Error(`No se encontro producto con el id: ${id}`)
        }
        const deletedProduct = productos.filter(producto => producto.id === id)
        productos = productos.filter(producto => producto.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2))

        return deletedProduct
    }

    async updateProduct(id, producto) {
        const arrayProducts = await this.#readFile()
        const productoActualizado = arrayProducts.find(producto => id === producto.id)
        if (!productoActualizado) {
            throw new Error('product not found!')
        }
        try {
            const nuevoProducto = new Product({ id, ...producto })
            arrayProducts[arrayProducts.findIndex(producto => producto.id === productoActualizado.id)] = nuevoProducto;
            await fs.promises.writeFile(this.path, JSON.stringify(arrayProducts, null, 2))
            return nuevoProducto
        } catch (error) {
            throw error
        }

    }

}
