import { Cart } from "./models/carts.js";
import { ProductsService } from "./products.service.js";
import fs from "fs"

const products = new ProductsService()

export class CartsService {


    constructor() {

        this.carts = [];
        this.dirName = "./src/data";
        this.path = `${this.dirName}/carts.json`;
    }

    async #readFile() {
        if (!fs.existsSync(this.path)) return []
        const resultado = await fs.promises.readFile(this.path, 'utf8');
        if (!resultado) return []
        return JSON.parse(resultado)
    }

    async #createDir() {
        if (!fs.existsSync(this.dirName))
            await fs.promises.mkdir(this.dirName)
    }

    async createCart() {
        try {

            await this.#createDir()
            const cart = new Cart()
            const prev = await this.#readFile()
            this.carts.push(...prev, cart)
            fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2))
            return cart
        } catch (error) {
            throw error

        }
    }

    async getCartById(id) {
        const carts = await this.#readFile()
        const cartId = carts.find(cart => (cart.id === id))
        if (!cartId) throw Error(`No se encontro cart con el id ${id}`)
        return cartId
    }

    async addProductsToCart(cid, pid) {
        try {
            const carts = await this.#readFile()
            const cart = await this.getCartById(cid);
            const product = await products.getProductsById(pid)
            if (!cart || !product) {
                return null;
            }
            const indexCart = carts.findIndex(cart => cart.id === cid)
            const productoId = cart.products.findIndex(product => product.id === pid)
            if (productoId !== -1) {
                const newCart = cart.products.map((producto, index) => {
                    if (index !== productoId) return producto
                    return { id: pid, quantity: producto.quantity + 1 }
                })
                cart.products = newCart
                carts[indexCart] = cart
                fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
                return `Agregaste un producto mas de ${product.title}, al carrito con id ${cid}`
            }
            cart.products.push({
                id: pid,
                quantity: 1
            })
            carts[indexCart] = cart
            fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
            return `Producto ${product.title} agregado, al carrito con id ${cid}`

        } catch (error) {
            throw error;
        }
    }
}