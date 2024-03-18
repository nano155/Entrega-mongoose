import { productModel } from "./models/products.js";


export class ProductsService {


    async addProducts(product) {
        try {
            const producto = await productModel.create(product)
            return producto
        } catch (error) {
            throw error
        }
    }

    async getProducts(objeto) {
        try {
            if (objeto.filter !== undefined && (objeto.filter.includes('category') || objeto.filter.includes('status'))) {
                let matchQuery = {};
                if (objeto.filter.includes('category')) {
                    matchQuery['category'] = objeto.filter.split('category-')[1];
                } else if (objeto.filter.includes('status')) {
                    const statusValue = objeto.filter.split('status-')[1];
                    if (statusValue === 'true' || statusValue === 'false') {
                        matchQuery['status'] = statusValue === "true";
                    }
                }
                if (objeto.sort === 'asc' || objeto.sort === 'desc') {
                    const products = await productModel.paginate(matchQuery, {limit:objeto.limit, page:objeto.page, sort:{price:(objeto.sort === 'asc' || objeto.sort === 'desc') ? (objeto.sort === 'asc') ? 1 : -1 : null}, lean:true})
                    return products
                }   
                const products = await productModel.paginate(matchQuery, {limit:objeto.limit, page:objeto.page, lean:true})
                return products
            }      
            const products = await productModel.paginate({},{limit:objeto.limit, page:objeto.page, lean:true})
            return products
        } catch (error) {
            throw error
        }
    }

    async deleteProduct(id) {
        try {
            const product = await productModel.deleteOne({ _id: id })
            if (!product) throw new Error(`No se encontro producto con id ${id}`)
            return product
        } catch (error) {
            throw error

        }

    }

    async getProductsById(id) {
        try {
            const product = await productModel.findById(id)
            if (!product) throw new Error(`No se encontro producto con id ${id}`)
            return product
        } catch (error) {
            throw error

        }

    }

    async updateProduct(id, producto) {
        try {
            const updateProduct = await productModel.updateOne({ _id: id }, producto)
            return updateProduct
        } catch (error) {
            throw error

        }
    }

}