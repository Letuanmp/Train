interface ValidateOptions{
    form: string;
    formGroupSelector: string;
    errorSelector: string;
    rules: ValidatorRule[];
}

interface ValidatorRule{
    selector: string;
    validate: (value: string) => string | undefined;
}

class Validator{
private validates(options: ValidateOptions,rule: ValidatorRule,inputElement:HTMLInputElement):void{
    const errorMessage = rule.validate(inputElement.value);
                                    const errorElement = inputElement.parentElement?.querySelector<HTMLInputElement>(options.errorSelector) ;
                                    console.log('errorElement::::',errorElement);
                                    console.log('errorMessage::::',errorMessage);

                                    if(errorMessage){
                                        if(errorElement){
                                            // errorElement.insertAdjacentHTML('beforeend',`<span id="error-message">${errorMessage}</span>`);
                                            errorElement.innerText = errorMessage;
                                        }
                                    }else{
                                        if(errorElement){
                                            errorElement.innerText='';
                                        }
                                    }
}
    constructor(private option: ValidateOptions){
        const formElement = document.querySelector<HTMLInputElement>(this.option.form);
        if(formElement){
                    this.option.rules.forEach(
                        rule =>{
                            const inputElement = formElement.querySelector<HTMLInputElement>(rule.selector) ;
                            // console.log(inputElement);
                            if(inputElement){
                                inputElement.onblur = () =>{
                                    this.validates(option,rule,inputElement);

                                };
                                inputElement.oninput =() =>{
                                    const errorElement = inputElement.parentElement?.querySelector<HTMLInputElement>(option.errorSelector) ;
                                    if(errorElement){
                                        errorElement.innerText = '';
                                    }
                                }
                            }
                        }
                    )
                }
    }
    

    
    static isEmail(selector: string, message: string): ValidatorRule {
        console.log(selector + ' is');
        return {
            selector,
            validate: (value: string) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value)? undefined : message || `truong nay khong phai email address`;
            }
        }
    }
    static isRequired(selector: string, message: string): ValidatorRule {
        return {
            selector,
            validate: (value: string) => {
                return value ? undefined : message || `vui long nhap noi dung`;
            }
        }
    }
    static isMinLength(selector: string, minLength: number = 6, message: string): ValidatorRule {
        return {
            selector,
            validate: (value: string) => {
                const valueLength = value.length ;
                return valueLength > minLength ? undefined : message || `vui long nhap hon 6 ky tu`;
            }
        }
    }
}

