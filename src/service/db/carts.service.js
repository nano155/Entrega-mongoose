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
            if (!cartId || !productId) {
                throw Error('asegurese que los id del carrito o productos sean validos')
            }
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
    async deleteProduct(cid, pid) {
        try {
            const cartId = await cartModel.findById(cid)
            const productId = await productModel.findById(pid)
            if (!cartId || !productId) {
                throw Error('asegurese que los id del carrito o productos sean validos')
            }
            const search = cartId.products.some(product => (product._id === pid))
            if (!search) {
                throw Error(`El producto con id ${pid} no se encuentra en el carrito`)
            }
            return await cartModel.updateOne({ _id: cid }, { $pull: { products: { product: { _id: pid } } } });
        } catch (error) {
            throw error
        }
    }
    async deleteAllProduct(cid) {
        try {
            const cartId = await cartModel.findById(cid)
            if (!cartId) {
                throw Error('asegurese que los id del carrito o productos sean validos')
            }
            return await cartModel.updateOne({ _id: cid }, { $set: { products: [] } })
        } catch (error) {
            throw error

        }
    }
    async updateCart(cid, products) {
        try {
            const cartId = await cartModel.findById(cid)
            if (!cartId) {
                throw Error('asegurese que los id del carrito o productos sean validos')
            }
            if (products.length === 0) throw Error('el producto no cumple con los parametros para insertar.')

            const updatedProducts = [];
            for (const product of products) {
                const productData = await productModel.findById(product._id);
                if (!productData) {
                    throw Error(`El producto con ID ${product._id} no existe`);
                }
                updatedProducts.push({
                    product: productData._id,
                    quantity: product.quantity ? product.quantity : 1,
                });
            }
            return await cartModel.updateOne(
                { _id: cid },
                { $set: { products: updatedProducts } }
            );
        } catch (error) {
            throw error
        }
    }
    async updateProductQuantity(cid, pid, quantity) {
        try {

            const cartId = await cartModel.findById(cid)
            const productId = await productModel.findById(pid)
            if (!cartId || !productId) {
                throw Error('asegurese que los id del carrito o productos sean validos')
            }
            if (typeof quantity !== 'number') throw Error('Si desea actualizar la cantidad asegurese que el parametro indicado sea de tipo numerico')
            if (quantity < 0) throw Error('No se pueden asignar valores negativos')
                const index = cartId.products.findIndex(product =>(product.product._id.toString() === pid))
            if(index<0)throw Error(`El producto con id ${pid} no se encuentra en el carrito`)
            cartId.products[index].quantity = quantity

            return await cartModel.updateOne({ _id: cid }, cartId)

        } catch (error) {
            throw error
        }

    }
}