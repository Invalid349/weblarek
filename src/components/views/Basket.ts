import { ensureElement } from "../../utils/utils"
import { Component } from "../base/Component"
import { IEvents } from "../base/Events"

interface IBasket {
    basketList: HTMLElement[];
    basketPrice: number;
}
export class Basket extends Component<IBasket> {
    private basketListElement: HTMLElement;
    private basketButton: HTMLButtonElement;
    private basketPriceElement: HTMLElement;

    constructor(private events: IEvents, container: HTMLElement){
        super(container);

        this.basketListElement = ensureElement<HTMLElement>('.basket__list', this.container);
        this.basketPriceElement = ensureElement<HTMLElement>('.basket__price', this.container);
        this.basketButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);

        this.basketButton.addEventListener('click', ()=> {
            this.events.emit('orderForm:open');
        });
    }
    set basketList(items: HTMLElement[]){
        if (items) {
            this.basketListElement.replaceChildren(...items);
        }
    }

    set basketPrice(value: number){
        this.basketPriceElement.textContent = `${value} синапсов`;
        this.basketButton.disabled = value === 0;
    }
}