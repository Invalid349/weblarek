import { ensureElement } from "../../../utils/utils"
import { IEvents } from "../../base/Events"
import { Card } from "./Card"
import { ICard } from "./Card"

interface IBasketCard extends ICard {
    cardIndex: number;
}

export class BasketCard extends Card  implements IBasketCard {
    private cardDeleteButton: HTMLButtonElement;
    private cardIndexElement: HTMLElement;


    constructor(protected events: IEvents, container: HTMLElement, private deleteButtonClick?: () => void){
        super(container);

        this.cardDeleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
        this.cardIndexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);

        
        this.cardDeleteButton.addEventListener('click', ()=> {
            if (this.deleteButtonClick) {
                this.deleteButtonClick();
            }
        });
    }

    set cardIndex(value: number){
        this.cardIndexElement.textContent = String(value);
    }

}