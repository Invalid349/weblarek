import { Component } from "../base/Component"
import { ensureElement } from "../../utils/utils"

interface IGallery {
    catalog: HTMLElement[];
}
export class Gallery extends Component<IGallery> {
    protected catalogElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        
        this.catalogElement = ensureElement<HTMLElement>('.gallery', this.container);
    }

    set catalog(items: HTMLElement[]){
        if (items) {
            this.catalogElement.replaceChildren(...items);
        }
    }
}