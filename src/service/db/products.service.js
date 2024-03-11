import { productModel } from "./models/products.js";


export class ProductsService {


    async addProducts(product) {
        try {
            const producto =  await productModel.create(product)
            return producto           
        } catch (error) {
            throw error
        }
    }

    async getProducts() {
        try {
            const products = await productModel.find()
            return products
        } catch (error) {
            throw error
        }
    }

    async deleteProduct(id) {
        try {
            const product = await productModel.deleteOne({_id:id})
            if(!product) throw new Error(`No se encontro producto con id ${id}`)
            return product
        } catch (error) {
            throw error
            
        }

    }

    async getProductsById(id) {
        try {
            const product = await productModel.findById(id)
            if(!product) throw new Error(`No se encontro producto con id ${id}`)
            return product
        } catch (error) {
            throw error
            
        }

    }

    async updateProduct(id, producto) {
        try {
            const updateProduct = await productModel.updateOne({_id: id},producto)
            return updateProduct            
        } catch (error) {
            throw error
            
        }
    }

}