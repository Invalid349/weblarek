import { ensureElement } from "../../utils/utils"
import { Component } from "../base/Component"
import { IEvents } from "../base/Events"

interface IModal {
    content:HTMLElement;
}
export class Modal extends Component<IModal> {
    private closeButton: HTMLButtonElement;
    private modalContent:HTMLElement;

    constructor(private events: IEvents, container: HTMLElement){
        super(container);

        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this.modalContent = ensureElement<HTMLElement>('.modal__content', container);

        this.closeButton.addEventListener('click', ()=> {
            this.events.emit('modal:close');
        });

    }
    set content(item: HTMLElement){
        if (item) {
            this.modalContent.replaceChildren(item);
        }
    }

    open(): void {
        this.container.classList.add('modal_active');
    }

    close(): void {
        this.container.classList.remove('modal_active');
    }
}