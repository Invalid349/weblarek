import { ensureElement } from "../../../utils/utils"
import { IEvents } from "../../base/Events"
import { Card } from "./Card"
import { ICard } from "./Card"

interface IBasketCard extends ICard {
    cardIndex: number;
}

export class BasketCard extends Card  implements IBasketCard {
    protected cardDeleteButton: HTMLButtonElement;
    protected cardIndexElement: HTMLElement;


    constructor(protected events: IEvents, container: HTMLElement, private deleteButton?: () => void){
        super(container);

        this.cardDeleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
        this.cardIndexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);

        
        this.cardDeleteButton.addEventListener('click', ()=> {
            if (this.deleteButton) {
                this.deleteButton();
            }
        });
    }

    set cardIndex(value: number){
        this.cardIndexElement.textContent = String(value);
    }

}