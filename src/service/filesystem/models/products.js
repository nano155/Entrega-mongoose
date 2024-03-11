import { v4 as uuidv4 } from 'uuid';


export class Product {
    constructor(producto) {
        if (!producto) {
            throw new Error("No se proporcionó ningún objeto 'producto'");
        }
        if (!producto.status) {
            producto.status = true;
          } else if (typeof producto.status !== 'boolean') {
            throw new Error("El valor asignado a 'status' no es del tipo 'boolean'");
          }
        if (!producto.title || typeof producto.title !== 'string') {
            throw new Error("Falta el campo 'title' o el valor asignado no es del tipo correcto");
        }
        if (!producto.description || typeof producto.description !== 'string') {
            throw new Error("Falta el campo 'description' o el valor asignado no es del tipo correcto");
        }
        if (!producto.code || typeof producto.code !== 'string') {
            throw new Error("Falta el campo 'code' o el valor asignado no es del tipo correcto");
        }
        if (!producto.price || typeof producto.price !== 'number') {
            throw new Error("Falta el campo 'price' o el valor asignado no es del tipo correcto");
        }
        if (!producto.stock || typeof producto.stock !== 'number') {
            throw new Error("Falta el campo 'stock' o el valor asignado no es del tipo correcto");
        }
        if (!producto.category || typeof producto.category !== 'string') {
            throw new Error("Falta el campo 'category' o el valor asignado no es del tipo correcto");
        }

        this.id = (producto.id)?producto.id: uuidv4();
        this.title = producto.title;
        this.description = producto.description;
        this.code = producto.code;
        this.price = producto.price;
        this.status = producto.status;
        this.stock = producto.stock;
        this.category = producto.category;
        this.thumbnails = producto.thumbnails || [];
    }
    
    
    
}