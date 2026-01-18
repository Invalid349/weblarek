import './scss/styles.scss';
import {ProductCatalog} from "./components/Models/ProductCatalog.ts";
import {Cart} from "./components/Models/Cart.ts";
import {Buyer} from "./components/Models/Buyer.ts";
import { Api } from './components/base/Api.ts';
import {ApiService} from "./components/communication/ApiService.ts"
import {apiProducts} from "./utils/data.ts";
const productCatalog = new ProductCatalog();
const cart = new Cart();
const buyer = new Buyer();

// Тесты для ProductCatalog

// Тест добавления и вывода элементов в каталоге
productCatalog.setItems(apiProducts.items);
const allProducts = productCatalog.getItems();
console.log('Товары в каталоге:', allProducts);

// Тест получения элемента по id
const testProductId = apiProducts.items[0].id;
const foundProduct = productCatalog.getItemById(testProductId);
console.log(`Товар по ID ${foundProduct}`);

// Тест preview
if (foundProduct) {
    productCatalog.setPreview(foundProduct);
    const previewItem = productCatalog.getPreview();
    console.log('Товар для preview', previewItem);
} else {
    console.warn('товар не найден');
}

// Тесты для Cart

// Добавляем товары в корзину
const firstProduct = apiProducts.items[0];
const secondProduct = apiProducts.items[1];
    
cart.addItem(firstProduct);
console.log(`"${firstProduct.title}" добавлен в корзину`);
    
cart.addItem(secondProduct);
console.log(`"${secondProduct.title}" добавлен в корзину`);
    
// Проверяем содержимое корзины
const cartItems = cart.getItems();
console.log(`Товаров в корзине: ${cart.getCount()}`);
console.log('Содержимое корзины:', cartItems);
    
// Проверяем стоимость
console.log(`Общая стоимость: ${cart.getTotal()} ₽`);
    
// Проверяем наличие товаров
console.log(`isContained "${firstProduct.title}": ${cart.hasItem(firstProduct.id)}`);
console.log(`isContained несуществующий товар: ${cart.hasItem('non-id')}`);
    
// Удаляем товар
cart.removeItem(secondProduct.id);
console.log(`"${secondProduct.title}" удален из корзины`);
console.log(`Оставшиеся товары:`, cart.getItems());
    
// Очищаем корзину
cart.clear();
console.log(`Корзина очищена. Товаров: ${cart.getCount()}`);

// Тесты для Buyer

// Устанавливаем данные по одному полю
buyer.setData('payment', 'card');
buyer.setData('email', 'test@example.com');
buyer.setData('phone', '+79991234567');
buyer.setData('address', 'г. Москва, ул. Пушкина, д. 10');
    
 // Проверяем получение данных
const buyerData = buyer.getData();
console.log('Данные покупателя:', buyerData);
    
// Проверяем валидацию
const validation = buyer.validate();
console.log('Валидация успешна', validation);
    
// Тестируем частичное заполнение
buyer.clear();
buyer.setData('payment', 'cash');
const partialValidation = buyer.validate();
console.log('Ошибки валидации', partialValidation);
    
// Тестируем невалидные данные
buyer.setData('email', '');
buyer.setData('phone', ' ');
buyer.setData('address', '');
const invalidValidation = buyer.validate();
console.log('Ошибки валидации:', invalidValidation);

// Тест api

const api = new Api('https://larek-api.nomoreparties.co/api/weblarek', {
  headers: {
    'Content-Type': 'application/json'
  }
});
const apiService = new ApiService(api);

// Загружаем товары с сервера
apiService.getProducts()
  .then(products => {
    // Сохраняем товары в модель каталога
    productCatalog.setItems(products);
    
    // Выводим сохраненный каталог в консоль
    console.log(productCatalog.getItems());
  })
  .catch(error => {
    console.error('Ошибка загрузки товаров:', error);
  });
