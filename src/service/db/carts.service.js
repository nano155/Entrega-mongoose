import { cartModel } from "./models/carts.js";
import { productModel } from "./models/products.js";


export class CartsService {

    async createCart() {
        try {
            const cart = await cartModel.create({ products: [] })
            return cart
        } catch (error) {
            throw error

        }
    }
    async getCartById(id) {
        try {
            const cart = await cartModel.findById(id)
            if (!cart) throw new Error(`No se encontro carrito con id ${id}`)
            return cart
        } catch (error) {
            throw error
        }
    }
    async addProductsToCart(cid, pid) {
        try {
            const cartId = await cartModel.findById(cid)
            const productId = await productModel.findById(pid)
            const cartIndex = cartId.products.findIndex(cart => cart.product._id.toString() === pid)
            if (cartIndex !== -1) {
                cartId.products[cartIndex].quantity++
                const cartUpdate = await cartModel.updateOne({ _id: cid }, cartId)
                return cartUpdate
            }
            cartId.products.push({ product: productId._id })
            const cartUpdate = await cartModel.updateOne({ _id: cid }, cartId)
            return cartUpdate
        } catch (error) {
            throw error;
        }
    }
}