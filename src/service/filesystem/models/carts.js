import { v4 as uuidv4 } from 'uuid';


export class Cart {
    constructor() {
        this.id = uuidv4()
        this.products = []
    }
}