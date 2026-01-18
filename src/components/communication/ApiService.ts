import { IApi, IProduct, IOrderRequest, IOrderResponse, IProductsApiResponse } from '../../types/index';

export class ApiService {
  constructor(private api: IApi) {}

  async getProducts(): Promise<IProduct[]> {
    try {
      const response: IProductsApiResponse = await this.api.get<IProductsApiResponse>('/product/');
      return response.items;
    } catch (error) {
      console.error('Ошибка при получении товаров с сервера:', error);
      throw error;
    }
  }

  async createOrder(order: IOrderRequest): Promise<IOrderResponse> {
    try {
      return await this.api.post<IOrderResponse>('/order/', order);
    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
      throw error;
    }
  }
}