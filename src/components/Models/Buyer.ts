import { IBuyer, TPayment } from "../../types/index";

export class Buyer {
    private payment: TPayment = "";
    private email: string = "";
    private phone: string = "";
    private address: string = "";

    constructor() {}

    setData(field: string, value: string): void {
        switch (field) {
            case 'payment':
                if (value === 'online' || value === 'cash') {
                    this.payment = value as TPayment;
                } else {
                    this.payment ='';
                }
                break;
            case 'email':
                this.email = value;
                break;
            case 'phone':
                this.phone = value;
                break;
            case 'address':
                this.address = value;
                break;
        }
    }

    getData(): IBuyer {        
        return {
            payment: this.payment,
            email: this.email.trim(),
            phone: this.phone.trim(),
            address: this.address.trim()
        };
    }

    clear(): void {
        this.payment = "";
        this.email = '';
        this.phone = '';
        this.address = '';
    }

    validate(): Partial<Record<keyof IBuyer, string>> {
        const errors: Partial<Record<keyof IBuyer, string>> = {};
        
        if (this.payment === '') {
            errors.payment = 'Не выбран способ оплаты';
        }
        
        if (!this.email.trim()) {
            errors.email = 'Email не может быть пустым';
        }
        
        if (!this.phone.trim()) {
            errors.phone = 'Телефон не может быть пустым';
        }
        
        if (!this.address.trim()) {
            errors.address = 'Адрес не может быть пустым';
        }
        
        return errors;
    }
}