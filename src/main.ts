import './scss/styles.scss';
// Utils
import { EventEmitter } from "./components/base/Events.ts";
import { ensureElement } from "./utils/utils.ts";
import { CDN_URL } from "./utils/constants.ts";
// Types
import { IProduct } from "./types/index.ts";
import { IBuyer } from "./types/index.ts";
import { TPayment } from "./types/index.ts";
// Models
import { ProductCatalog } from "./components/Models/ProductCatalog.ts";
import { Cart } from "./components/Models/Cart.ts";
import { Buyer } from "./components/Models/Buyer.ts";
// View
import { Header } from "./components/views/Header";
import { Gallery } from "./components/views/Gallery";
import { Modal } from "./components/views/Modal";
import { Basket } from "./components/views/Basket";
import { Success } from "./components/views/Success.ts";
import { Form } from "./components/views/Form/Form.ts";
import { OrderForm } from "./components/views/Form/OrderForm.ts";
import { ContactsForm } from "./components/views/Form/ContactsForm.ts";
import { GalleryCard } from "./components/views/Card/GalleryCard";
import { PreviewCard } from "./components/views/Card/PreviewCard";
import { BasketCard } from "./components/views/Card/BasketCard";
// API
import { Api } from './components/base/Api.ts';
import { ApiService } from "./components/communication/ApiService.ts";

const events = new EventEmitter();
const productCatalog = new ProductCatalog(events);
const cart = new Cart(events);
const buyer = new Buyer(events);

const api = new Api('https://larek-api.nomoreparties.co/api/weblarek', {
  headers: {
    'Content-Type': 'application/json'
  }
});
const apiService = new ApiService(api);

// Загружаем товары с сервера
apiService.getProducts()
.then(products => {
    productCatalog.setItems(products);
})
.catch(error => {
    console.error('Ошибка загрузки товаров:', error);
});

// Header
const contentHeader = ensureElement<HTMLElement>(".header");
const header = new Header(events,contentHeader);

// Gallery
const content = ensureElement<HTMLElement>('.page');
const gallery = new Gallery(content)

// GalleryCard
const cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

// modal
const modalContainer = ensureElement<HTMLElement>('#modal-container');
const modal = new Modal(events, modalContainer);
const modalElement = modalContainer;

// basket
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const basketElement = basketTemplate.content.firstElementChild?.cloneNode(true) as HTMLElement;
if (!basketElement) {
    throw new Error('Шаблон basketElement пуст или повреждён');
}
const basket = new Basket(events, basketElement);

// basketCard
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const cardElement = cardBasketTemplate.content.firstElementChild?.cloneNode(true) as HTMLElement;
if (!cardElement) {
    throw new Error('Шаблон basketCard пуст или повреждён');
}

// OrderForm
const orderFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const orderFormElement = orderFormTemplate.content.firstElementChild?.cloneNode(true) as HTMLElement;
if (!orderFormElement) {
    throw new Error('Шаблон orderFormElement пуст или повреждён');
}
const orderForm = new OrderForm(events, orderFormElement);

// ContactsForm
const contactsFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const contactsFormElement = contactsFormTemplate.content.firstElementChild?.cloneNode(true) as HTMLElement;
if (!contactsFormElement) {
    throw new Error('Шаблон contactsFormElement пуст или повреждён');
}
const contactsForm = new ContactsForm(events, contactsFormElement);

// success
const successTemplate =  ensureElement<HTMLTemplateElement>("#success");
const successElement = successTemplate.content.firstElementChild?.cloneNode(true) as HTMLElement;
if (!successElement) {
    throw new Error('Шаблон successContent пуст или повреждён');
}
const success = new Success(events,successElement);

// Обработчик открытия модального окна
function handleModalOpen(content: HTMLElement): void {
    if (modal && content){
        modal.content = content;
        if (modalElement) {
            modalElement.classList.add('modal_active');
        }
    }
}

// Обработчик закрытия модального окна
function handleModalClose(): void {
    if (modalElement) {
        modalElement.classList.remove('modal_active');
    }
}

// Обработчик карточек галереи
function handleCatalogChanged({ items }: {items:IProduct[]}) {
    const cardsGallery = items.map(item => {
        const cardElement = cardTemplate.content.firstElementChild?.cloneNode(true) as HTMLElement;
        if (!cardElement) {
            throw new Error('Шаблон GalleryCard пуст или повреждён');
        }
        const card = new GalleryCard(events, cardElement, () => {
            productCatalog.setPreview(item);
        });
            
        card.cardTitle = item.title;
        card.cardPrice = item.price;
        card.cardCategory = item.category;
        card.cardImageSrc = CDN_URL + item.image;

        return cardElement;
    });

    gallery.catalog = cardsGallery;

    console.log('api',productCatalog.getItems());
}

// Обработчик выбора карточки
function handlePreviewChanged({ item }: { item: IProduct }): void {
    const previewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
    const previewElement = previewTemplate.content.firstElementChild?.cloneNode(true) as HTMLElement;
    
    const previewCard = new PreviewCard(events, previewElement, () => {
        if(cart.hasItem(item.id)) {
            cart.removeItem(item.id);
        } else {
            cart.addItem(item);
        }
            previewCard.cardButtonLabel = cart.hasItem(item.id) 
                ? 'Удалить из корзины' 
                : 'Купить';
    });

    previewCard.cardTitle = item.title;
    previewCard.cardImageSrc = CDN_URL + item.image;
    previewCard.cardCategory = item.category;
    previewCard.cardPrice = item.price;
    previewCard.cardText = item.description;
    
    if(item.price === null){
        previewCard.cardButtonLabel = 'Недоступно';
    } else {
        previewCard.cardButtonLabel = cart.hasItem(item.id) 
            ? 'Удалить из корзины' 
            : 'Купить';
    }
    
    handleModalOpen(previewElement);
}

// Обработчик обновления корзины
function handleChangedBasket({ items, total, count }: { items: IProduct[], total: number, count: number }): void {
    header.counter = count;

    if (basket) {
        const basketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
        const basketCards = items.map((item, index) => {
            const cardElement = basketTemplate.content.firstElementChild?.cloneNode(true) as HTMLElement;
            if (!cardElement) {
                throw new Error('Шаблон карточки корзины пуст или повреждён');
            }
            const card = new BasketCard(events, cardElement, () => {
                cart.removeItem(item.id);
            });
            card.cardTitle = item.title;
            card.cardPrice = item.price;
            card.cardIndex = index + 1;
            
            return cardElement;
        });
        
        basket.basketList = basketCards;
        basket.basketPrice = total;
        success.counter = total;
    }
}

// Обновление ошибок и кнопок
function handleFieldChange(
    form: Form | null,
    errorFields: { primary: keyof IBuyer, secondary: keyof IBuyer },
    { field, value}: {field:string, value:string}
): void {
    
    if (field === 'payment' && orderForm) {
        orderForm.paymentType = value as TPayment;
    }

    buyer.setData(field, value);

    const errors = buyer.validate();

    const errorMessages: string[] = [];
    if (errors[errorFields.primary] && errors[errorFields.secondary]) {
        errorMessages.push(errors[errorFields.primary]!);
    } else if (errors[errorFields.secondary]) {
        errorMessages.push(errors[errorFields.secondary]!);
    } else if (errors[errorFields.primary]) {
        errorMessages.push(errors[errorFields.primary]!);
    }

    if (form) {
        form.formErrors = errorMessages.join('\n');
    }
    
    console.log(buyer.getData());
}

// Обновление данных пользователя
function handleBuyerChanged({ data }: { data:IBuyer }): void {
    if (data.payment !== undefined && orderForm && data.payment !== orderForm.paymentType) {
        orderForm.paymentType = data.payment;
    }

    if (data.address !== undefined && orderForm && data.address !== orderForm.inputAddress) {
        orderForm.inputAddress = data.address;
    }

    if (data.email !== undefined && contactsForm && data.email !== contactsForm.inputEmail) {
        contactsForm.inputEmail = data.email;
    }

    if (data.phone !== undefined && contactsForm && data.phone !== contactsForm.inputPhone) {
        contactsForm.inputPhone = data.phone;
    }
    
    console.log('Данные покупателя обновлены:', data);
}

// Подписки на события

// catalog
events.on('catalog:changed', handleCatalogChanged.bind(null));
events.on('catalog:preview-changed', handlePreviewChanged.bind(null));
// modal
events.on('modal:close', handleModalClose.bind(null));
// basket
events.on('basket:open', () => handleModalOpen(basketElement));
events.on('basket:clear', () => {
    cart.clear();
    buyer.clear();
});
events.on('cart:changed', handleChangedBasket.bind(null));
events.on('buyer:changed', handleBuyerChanged.bind(null));
// orderForm
events.on('orderForm:open', () => handleModalOpen(orderFormElement));
events.on('orderForm:field-changed', handleFieldChange.bind(null, orderForm, { primary: 'payment', secondary: 'address' })); 
// contactsForm
events.on('contactsForm:open', () => handleModalOpen(contactsFormElement));
events.on('contactsForm:field-changed', handleFieldChange.bind(null, contactsForm, { primary: 'email', secondary: 'phone' })); 
  // success
events.on('success:open', () => handleModalOpen(successElement));
cart.clear();
buyer.clear();