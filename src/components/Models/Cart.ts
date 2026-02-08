import {IProduct} from "../../types/index"
import { IEvents } from "../base/Events";

export class Cart{
    private _items: IProduct[]=[];

    constructor(private events: IEvents){};

    getItems(): IProduct[]{
        return this._items;
    }

    addItem(item: IProduct): void {
        this._items.push({...item});
        this.events.emit('cart:changed', {
            items: this._items,
            total: this.getTotal(),
            count: this.getCount(),
        });
    }

    removeItem(id: string): void {
        const beforeCount = this._items.length;
        this._items = this._items.filter(item => item.id !== id);

        if (this._items.length !== beforeCount) {
            this.events.emit('cart:changed', {
                items: this._items,
                total: this.getTotal(),
                count: this.getCount()
        });
    }
    }

    clear(): void{
        this._items = [];
        this.events.emit('cart:changed', {
            items: this._items,
            total: this.getTotal(),
            count: this.getCount()
        });
    }

    getTotal(): number {
        return this._items.reduce((total, item) => {
        return item.price !== null ? total + item.price : total;
        }, 0);
    }

    getCount(): number{
        return this._items.length;
    }

    hasItem(id: string): boolean {
        return this._items.some(item => item.id === id);
    }
}