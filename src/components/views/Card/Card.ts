import { ensureElement } from "../../../utils/utils"
import { Component } from "../../base/Component"

export interface ICard {
    cardTitle: string;
    cardPrice: number | null;
}

export class Card extends Component<ICard> {
    protected cardTitleElement: HTMLElement;
    protected cardPriceElement: HTMLElement;

    constructor(container: HTMLElement){
        super(container);

        this.cardTitleElement = ensureElement<HTMLElement>('.card__title', this.container);
        this.cardPriceElement = ensureElement<HTMLElement>('.card__price', this.container);
    }

    set cardTitle(value: string){
        this.cardTitleElement.textContent = value;
    }

    set cardPrice(value: number | null){
        if(value === null){
            this.cardPriceElement.textContent = "Бесценно";
        } else {
            this.cardPriceElement.textContent = `${value} синапсов`;
        }
    }
}