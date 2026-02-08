import { ensureElement } from "../../../utils/utils"
import { Component } from "../../base/Component"

export interface IForm {
    formErrors: string;
}

export class Form extends Component<IForm> {
    protected formButton: HTMLButtonElement;
    protected formErrorsElement: HTMLElement;

    constructor(container: HTMLElement){
        super(container);

        this.formErrorsElement = ensureElement<HTMLElement>('.form__errors', this.container);
        this.formButton = ensureElement<HTMLButtonElement>('.modal__actions .button', this.container);

    }

    set formErrors(value: string){
        this.formErrorsElement.textContent = value;
        this.formButton.disabled = value.trim().length > 0;
    }
}