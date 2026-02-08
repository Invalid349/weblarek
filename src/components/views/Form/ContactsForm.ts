import { ensureElement } from "../../../utils/utils"
import { IEvents } from "../../base/Events"
import { Form } from "./Form"
import { IForm } from "./Form"

interface IContactsForm extends IForm {
    inputEmail: string;
    inputPhone: string;
}

export class ContactsForm extends Form implements IContactsForm{
    protected formInputEmailElements: HTMLInputElement;
    protected formInputPhoneElements: HTMLInputElement;

    constructor(protected events: IEvents, container: HTMLElement){
        super(container);

        this.formInputEmailElements = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
        this.formInputPhoneElements = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);

        this.formButton.addEventListener('click', ()=> {
            this.events.emit('success:open');
        });

        this.formInputEmailElements.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            this.events.emit('contactsForm:field-changed', { field: 'email', value: target.value });
        });

        this.formInputPhoneElements.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            this.events.emit('contactsForm:field-changed', { field: 'phone', value: target.value });
        });
    }

    set inputEmail(value: string) {
        this.formInputEmailElements.value = value;
    }

    set inputPhone(value: string) {
        this.formInputPhoneElements.value = value;
    }
}