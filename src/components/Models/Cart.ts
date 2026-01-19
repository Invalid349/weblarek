import {IProduct} from "../../types/index"
export class Cart{
    private items: IProduct[]=[];

    constructor(){};

    getItems(): IProduct[]{
        return this.items;
    }

    addItem(item: IProduct): void {
        this.items.push({...item});
    }

    removeItem(id: string): void {
        this.items = this.items.filter(item => item.id !== id);
    }

    clear(): void{
        this.items = [];
    }

    getTotal(): number {
        return this.items.reduce((total, item) => {
        return item.price !== null ? total + item.price : total;
        }, 0);
    }

    getCount(): number{
        return this.items.length;
    }
    
    hasItem(id: string): boolean {
        return this.items.some(item => item.id === id);
    }
}