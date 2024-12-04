interface ValidatorOptions {
    form: string;
    formGroupSelector: string;
    errorSelector: string;
    rules: ValidatorRule[];
    onSubmit?: (formValues: Record<string, any>) => void;
}

interface ValidatorRule {
    selector: string;
    test: (value: any) => string | undefined;
}

class Validator {
    private selectorRules: Record<string, ((value: any) => string | undefined)[]> = {};

    constructor(private options: ValidatorOptions) {
        const formElement = document.querySelector<HTMLFormElement>(this.options.form);
        if (formElement) {
            this.setupForm(formElement);
        }
    }

    private getParent(element: HTMLElement, selector: string): HTMLElement | null {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
        return null;
    }

    private validate(inputElement: HTMLInputElement, rule: ValidatorRule): boolean {
        const parentElement = this.getParent(inputElement, this.options.formGroupSelector);
        if (!parentElement) return false;

        const errorElement = parentElement.querySelector<HTMLElement>(this.options.errorSelector);
        const rules = this.selectorRules[rule.selector];
        let errorMessage;

        for (const test of rules) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = test(document.querySelector(`${rule.selector}:checked`)?.value);
                    break;
                default:
                    errorMessage = test(inputElement.value);
            }
            if (errorMessage) break;
        }

        if (errorElement) {
            if (errorMessage) {
                errorElement.innerText = errorMessage;
                parentElement.classList.add('invalid');
            } else {
                errorElement.innerText = '';
                parentElement.classList.remove('invalid');
            }
        }

        return !errorMessage;
    }


    private setupForm(formElement: HTMLFormElement): void {
        formElement.onsubmit = (e) => {
            e.preventDefault();

            let isFormValid = true;

            this.options.rules.forEach((rule) => {
                const inputElement = formElement.querySelector<HTMLInputElement>(rule.selector);
                if (inputElement) {
                    const isValid = this.validate(inputElement, rule);
                    if (!isValid) isFormValid = false;
                }
            });

            if (isFormValid) {
                if (typeof this.options.onSubmit === 'function') {
                    const enableInputs = formElement.querySelectorAll<HTMLInputElement>('[name]');
                    const formValues = Array.from(enableInputs).reduce((values, input) => {
                        switch (input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector<HTMLInputElement>(
                                    `input[name="${input.name}"]:checked`
                                )?.value;
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                (values[input.name] as string[]).push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }
                        return values;
                    }, {} as Record<string, any>);
                    this.options.onSubmit(formValues);
                } else {
                    formElement.submit();
                }
            }
        };

        this.options.rules.forEach((rule) => {
            if (!Array.isArray(this.selectorRules[rule.selector])) {
                this.selectorRules[rule.selector] = [];
            }
            this.selectorRules[rule.selector].push(rule.test);

            const inputElements = formElement.querySelectorAll<HTMLInputElement>(rule.selector);
            inputElements.forEach((inputElement) => {
                inputElement.onblur = () => this.validate(inputElement, rule);

                inputElement.oninput = () => {
                    const parentElement = this.getParent(inputElement, this.options.formGroupSelector);
                    if (!parentElement) return;

                    const errorElement = parentElement.querySelector<HTMLElement>(this.options.errorSelector);
                    if (errorElement) errorElement.innerText = '';
                    parentElement.classList.remove('invalid');
                };
            });
        });
    }

    static isRequired(selector: string, message?: string): ValidatorRule {
        return {
            selector,
            test: (value) => (value ? undefined : message || 'Vui lòng nhập trường này'),
        };
    }

    static isEmail(selector: string, message?: string): ValidatorRule {
        return {
            selector,
            test: (value) =>
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
                    ? undefined
                    : message || 'Trường này phải là email',
        };
    }

    static minLength(selector: string, min: number, message?: string): ValidatorRule {
        return {
            selector,
            test: (value) =>
                value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`,
        };
    }

    static isConfirmed(
        selector: string,
        getConfirmValue: () => string,
        message?: string
    ): ValidatorRule {
        return {
            selector,
            test: (value) =>
                value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác',
        };
    }
}
