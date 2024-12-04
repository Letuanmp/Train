interface ValidateOptions{
    form: string;
    formGroupSelector: string;
    errorSelector: string;
    rules: ValidatorRule[];
    onSubmit?: (formValues: Record<string, any>) => void;
}

interface ValidatorRule{
    selector: string;
    check: (value: string) => string | undefined;
}

class Validator{
    //khởi tạo đối tượng rules
    private selectorRules: Record<string, ((value: any) => string | undefined)[]> = {};
    private getParent(element: HTMLElement,selector:string):HTMLElement | null{
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element= element.parentElement;
        }
        return null;
    }
private validates(options: ValidateOptions,rule: ValidatorRule,inputElement:HTMLInputElement):boolean{
    const parentElement = this.getParent(inputElement,options.formGroupSelector);
    if(!parentElement) return false;
    //lấy ra các rule 
    const rules = this.selectorRules[rule.selector];
    const errorElement = parentElement?.querySelector<HTMLInputElement>(options.errorSelector) ;
    console.log('errorElement::::',errorElement);
    let errorMessage;
    //lặp qua kiểm tra rules
    for(const check of rules){
        switch (inputElement.type) {
            case 'radio':
            case 'checkbox':
                errorMessage = check(document.querySelector<HTMLInputElement>(`${rule.selector}:checked`)?.value);
                break;
            default:
                errorMessage = check(inputElement.value);
        }
        if (errorMessage) break;
    }

                                    if(errorMessage){
                                        if(errorElement){
                                            // errorElement.insertAdjacentHTML('beforeend',`<span id="error-message">${errorMessage}</span>`);
                                            errorElement.innerText = errorMessage;
                                            parentElement.classList.add('invalid');
                                        }
                                    }else{
                                        if(errorElement){
                                            errorElement.innerText='';
                                            parentElement.classList.remove('invalid');
                                        }
                                    }
    return !errorMessage;
}
    constructor(private option: ValidateOptions){
        const formElement = document.querySelector<HTMLFormElement>(this.option.form);
        if(formElement){
            formElement.onsubmit = (e)=>{
                let isFormValid= true;
                //hủy trạng thái
                e.preventDefault();

                option.rules.forEach(rule=>{
                    const inputElement = formElement.querySelector<HTMLInputElement>(rule.selector);
                    if(inputElement){
                   const isValid = this.validates(option,rule,inputElement);
                        if(!isValid){
                            isFormValid = false;
                        }
                    }
                })
                if(isFormValid){
                    if(typeof this.option.onSubmit === 'function'){
                        const enableInputs = formElement.querySelectorAll<HTMLInputElement>('[name]');
                        const formValues = Array.from(enableInputs).reduce((values,input)=>{
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
                        },{} as Record<string, any>)
                        console.log('formValues::::',formValues);
                        this.option.onSubmit(formValues);
                    }else{
                        
                        formElement.submit();
                    }
                }

            }
                    this.option.rules.forEach( rule =>{
                        // cho rỗng vô trong
                            if (!Array.isArray(this.selectorRules[rule.selector])) {
                                this.selectorRules[rule.selector] = [];
                            }
                            this.selectorRules[rule.selector].push(rule.check);
                            const inputElement = formElement.querySelector<HTMLInputElement>(rule.selector) ;
                            // console.log(inputElement);
                            if(inputElement){
                                inputElement.onblur = () =>{
                                    this.validates(option,rule,inputElement);

                                };
                                inputElement.oninput =() =>{
                                    const parentElement = this.getParent(inputElement,option.formGroupSelector);
                                    const errorElement = parentElement?.querySelector<HTMLInputElement>(option.errorSelector);
                                    if(errorElement&& parentElement){
                                        errorElement.innerText = '';
                                        parentElement.classList.remove('invalid');
                                    }
                                    
                                }
                            }
                    })
        }
    }
    

    
    static isEmail(selector: string, message: string): ValidatorRule {
        return {
            selector,
            check: (value: string) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value)? undefined : message || `Truong nay khong phai email address`;
            }
        }
    }
    static isRequired(selector: string, message: string): ValidatorRule {
        return {
            selector,
            check: (value: string) => {
                return value ? undefined : message || `Vui long nhap noi dung`;
            }
        }
    }
    static isMinLength(selector: string, minLength: number = 6, message: string): ValidatorRule {
        return {
            selector,
            check: (value: string) => {
                const valueLength = value.length ;
                return valueLength > minLength ? undefined : message || `Vui long nhap hon ${minLength} ky tu`;
            }
        }
    }
    static isConfirm(selector: string,getConfirmValue: ()=> string, message:string): ValidatorRule{
        return{
            selector,
            check: (value: string) =>
                value === getConfirmValue() ? undefined: message || `Vui long nhap dung thong tin`
        }
    }
    static isPhoneNumber(selector: string,message:string,):ValidatorRule{
        return{
            selector,
            check: (value:string)=>{
                const phoneRegex = /^[0-9]{10,11}$/;
                return phoneRegex.test(value) ? undefined: message || 'Vui long nhap dung so dien thoai';
            }
        }
    }
    static isMaxLength(selector:string,maxLength:number = 50,message:string):ValidatorRule{
        return{
            selector,
            check:(value)=> {
                return value.length < maxLength ? undefined: message || `Vui long nhap nho hon ${maxLength}`;
            },
        }
    }
    static isNumber(selector: string, message:string):ValidatorRule{
        return{
            selector,
            check: (value: string) => {
                const numberRegex = /^[0-9]+$/;
                return numberRegex.test(value) ? undefined: message || `Vui long nhap so`;
            }
        }
    }
    static isGreaterThan(selector:string,minValue: number =10, message:string):ValidatorRule{
        return{
            selector,
            check: (value: string) => {
                return Number(value) > Number(minValue)? undefined: message || `Vui long nhap so lon hon ${minValue}`;
            }
        }
    }
    static isLessThan(selector:string,maxValue: number =100, message:string):ValidatorRule{
        return{
            selector,
            check: (value: string) => {
                return Number(value) < Number(maxValue)? undefined: message || `Vui long nhap so nho hon ${maxValue}`;
            }
        }
    }
    static isInRange(selector: string, minValue: number =10, maxValue:number= 100, message:string):ValidatorRule{
        return{
            selector,
            check: (value: string) => {
                return Number(value) >= Number(minValue) && Number(value) <= Number(maxValue)? undefined: message || `Vui long nhap so trong khoang ${minValue}-${maxValue}`;
            }
        }
    }
}


