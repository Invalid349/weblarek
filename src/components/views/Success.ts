import { ensureElement } from "../../utils/utils"
import { Component } from "../base/Component"
import { IEvents } from "../base/Events"

interface ISuccess {
    counter: number;
}
export class Success extends Component<ISuccess> {
    private counterElement: HTMLElement;
    private successButton: HTMLButtonElement;

    constructor(private events: IEvents, container: HTMLElement){
        super(container);

        this.counterElement = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.successButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        this.successButton.addEventListener('click', ()=> {
            this.events.emit('modal:close');
            this.events.emit('basket:clear');
        });
    }

    set counter(value: number){
        this.counterElement.textContent = `Списано ${value} синапсов`;
    }
}