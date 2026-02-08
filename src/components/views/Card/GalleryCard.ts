import { ensureElement } from "../../../utils/utils"
import { IEvents } from "../../base/Events"
import { Card } from "./Card"
import { ICard } from "./Card"
import { categoryMap } from "../../../utils/constants";

export interface IGalleryCard extends ICard {
    cardImage: HTMLImageElement;
    cardImageSrc: string;
    cardCategory: string;
}

export class GalleryCard extends Card  implements IGalleryCard {
    protected cardImageElement: HTMLImageElement;
    protected cardCategoryElement: HTMLElement;
    protected cardButton: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement, private onClick?: () => void){
        super(container);

        this.cardImageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.cardCategoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.cardButton = container as HTMLButtonElement;

        this.cardButton.addEventListener('click', () => {
            if (this.onClick) {
                this.onClick();
            }
        });
    }

    set cardImage(item: HTMLImageElement){
        this.cardImageElement = item;
    }

    set cardImageSrc(value: string){
        this.setImage(this.cardImageElement, value, '');
    }

    set cardCategory(value: string){
        this.cardCategoryElement.textContent = value;

        Object.values(categoryMap).forEach(className => {
            this.cardCategoryElement.classList.remove(className);
        });

        const categoryClass = categoryMap[value as keyof typeof categoryMap];
        if (categoryClass) {
            this.cardCategoryElement.classList.add(categoryClass);
        }
    }
}