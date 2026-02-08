import { ensureElement } from "../../../utils/utils"
import { categoryMap } from "../../../utils/constants";
import { IEvents } from "../../base/Events"
import { Card } from "./Card"
import { IGalleryCard } from "./GalleryCard"

interface IPreviewCard extends IGalleryCard {
    cardText: string;
    cardButtonText: string;
    cardButtonDisabled: boolean;
}

export class PreviewCard extends Card  implements IPreviewCard {
    private cardImageElement: HTMLImageElement;
    private cardCategoryElement: HTMLElement;
    private cardTextElement: HTMLElement;
    private cardButton: HTMLButtonElement;


    constructor(protected events: IEvents, container: HTMLElement, private basketToggleButtonClick?: () => void){
        super(container);

        this.cardImageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.cardCategoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.cardTextElement = ensureElement<HTMLElement>('.card__text', this.container);
        this.cardButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

        
        this.cardButton.addEventListener('click', ()=> {
            if (this.basketToggleButtonClick) {
                this.basketToggleButtonClick();
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
    
    set cardButtonText(value: string) {
        this.cardButton.textContent = value;
    }

    set cardButtonDisabled(value: boolean) {
        this.cardButton.disabled = value;
    }
}