import {IProduct} from "../../types/index"
export class ProductCatalog {
  private items: IProduct[] = [];
  private preview: IProduct | null = null;

  constructor() {};

  setItems(items: IProduct[]): void {
    this.items = items;
  }

  getItems(): IProduct[] {
    return this.items;
  }

  getItemById(id: string): IProduct | undefined {
    return this.items.find(item => item.id === id);
  }

  setPreview(item: IProduct): void {
    if(this.items.find(item => item === item)){
      this.preview = item;
    } else{
      throw("Товара нет в каталоге");
    }
    
  }
  getPreview(): IProduct | null {
    return this.preview;
  }
}