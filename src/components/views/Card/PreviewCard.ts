import { ensureElement } from "../../../utils/utils"
import { categoryMap } from "../../../utils/constants";
import { IEvents } from "../../base/Events"
import { Card } from "./Card"
import { IGalleryCard } from "./GalleryCard"

interface IPreviewCard extends IGalleryCard {
    cardText: string;
}

export class PreviewCard extends Card  implements IPreviewCard {
    protected cardImageElement: HTMLImageElement;
    protected cardCategoryElement: HTMLElement;
    protected cardTextElement: HTMLElement;
    protected cardButton: HTMLButtonElement;


    constructor(protected events: IEvents, container: HTMLElement, private onBasketToggle?: () => void){
        super(container);

        this.cardImageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.cardCategoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.cardTextElement = ensureElement<HTMLElement>('.card__text', this.container);
        this.cardButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

        
        this.cardButton.addEventListener('click', ()=> {
            if (this.onBasketToggle) {
                this.onBasketToggle();
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

    set cardText(value: string){
        this.cardTextElement.textContent = value;
    }
    
    set cardButtonLabel(value: string) {
        if(value === 'Недоступно') {
            this.cardButton.disabled = true;
        } else {
            this.cardButton.disabled = false;
        }
        this.cardButton.textContent = value;
    }
}