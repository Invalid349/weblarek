import { ensureElement } from "../../../utils/utils"
import { IEvents } from "../../base/Events"
import { IForm } from "./Form"
import { Form } from "./Form"
import { TPayment } from "../../../types/index"


interface IOrderForm extends IForm {
    paymentType: TPayment;
    inputAddress: string;
}

export class OrderForm extends Form implements IOrderForm{
    protected cardButton: HTMLButtonElement;
    protected cashButton: HTMLButtonElement;
    protected formInputElement: HTMLInputElement;

    constructor(protected events: IEvents, container: HTMLElement){
        super(container);

        this.cardButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
        this.cashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
        this.formInputElement = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

        this.formButton.addEventListener('click', ()=> {
            this.events.emit('contactsForm:open');
        });

        this.cardButton.addEventListener('click', ()=> {
            this.events.emit('orderForm:field-changed',{ field: 'payment', value: 'online' });
        });

        this.cashButton.addEventListener('click', ()=> {
            this.events.emit('orderForm:field-changed',{ field: 'payment', value: 'cash' });
        });
        
        this.formInputElement.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            this.events.emit('orderForm:field-changed', { field: 'address', value: target.value });
        });
    }

    set paymentType(type: TPayment) {
        this.cardButton.classList.remove('button_alt-active');
        this.cashButton.classList.remove('button_alt-active');
        
        if (type === 'online') {
            this.cardButton.classList.add('button_alt-active');
        } else if (type === 'cash') {
            this.cashButton.classList.add('button_alt-active');
        }
    }

    set inputAddress(value: string) {
        this.formInputElement.value = value;
    }
}