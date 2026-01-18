import {IProduct} from "../../types/index"
export class ProductCatalog {
  private _items: IProduct[] = [];
  private _preview: IProduct | null = null;

  constructor() {};

  setItems(items: IProduct[]): void {
    this._items = items;
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
    } else{
      throw("Товара нет в каталоге");
    }
    
  }
  getPreview(): IProduct | null {
    return this._preview;
  }
}