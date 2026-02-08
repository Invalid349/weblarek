import {IProduct} from "../../types/index"
import { IEvents } from "../base/Events";

export class ProductCatalog {
  private _items: IProduct[] = [];
  private _preview: IProduct | null = null;

  constructor(private events: IEvents) {}

  setItems(items: IProduct[]): void {
    this._items = items;
    this.events.emit('catalog:changed', { items: this._items });
  }

  getItems(): IProduct[] {
    return this._items;
  }

  getItemById(id: string): IProduct | undefined {
    return this._items.find(item => item.id === id);
  }

  setPreview(item: IProduct): void {
    if(this._items.find(item => item === item)){
      this._preview = item;
      this.events.emit('catalog:preview-changed', { item: this._preview });
    } else{
      throw("Товара нет в каталоге");
    }
  }

  getPreview(): IProduct | null {
    return this._preview;
  }
}