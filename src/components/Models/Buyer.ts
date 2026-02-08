import {IBuyer,TPayment} from "../../types/index"
import { IEvents } from "../base/Events";

export class Buyer{
    private _payment: TPayment | null=null;
    private _email: string="";
    private _phone: string="";
    private _address: string="";

    constructor(private events: IEvents){};

    setData(field: string, value: string): void {
        switch(field){
            case 'payment':
                if (value === 'online' || value === 'cash') {
                    this._payment = value as TPayment;
                } else {
                    throw new Error(`Invalid payment type: ${value}`);
                }
                break;
            case 'email':
                this._email = value;
                break;
            case 'phone':
                this._phone = value;
                break;
            case 'address':
                this._address = value;
                break;
        }
        
        let data = null;
        try {
            data = this.getData();
        } catch (error) {
            data = {
                payment: this._payment,
                email: this._email.trim(),
                phone: this._phone.trim(),
                address: this._address.trim()
            };
        }
        
        this.events.emit('buyer:changed', {
            data: data
        });
    }

    getData(): IBuyer{
        if (this._payment === null) {
            throw new Error('Payment method is not set');
        }
        return {
        payment: this._payment,
        email: this._email.trim(),
        phone: this._phone.trim(),
        address: this._address.trim()
        };
    }

    clear(): void{
        this._payment = null;
        this._email = '';
        this._phone = '';
        this._address = '';
        this.events.emit('buyer:changed', {
            data: {
                payment: null,
                email: '',
                phone: '',
                address: ''
        }
        });
    }

    validate(): Partial<Record<keyof IBuyer, string>> {
        const errors: Partial<Record<keyof IBuyer, string>> = {};

        if (this._payment === null) {
            errors.payment = 'Не выбран способ оплаты';
        }
        
        if (!this._email.trim()) {
            errors.email = 'Email не может быть пустым';
        }
        
        if (!this._phone.trim()) {
            errors.phone = 'Телефон не может быть пустым';
        }
        
        if (!this._address.trim()) {
            errors.address = 'Адрес не может быть пустым';
        }
        
        return errors;
    }
}