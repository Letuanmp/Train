function Validator(options) {
    formElement = document.querySelector(options.form);
    console.log(formElement);
}

Validator.isEmail = function(selector) {
    return{
        selector:selector,
        test: function(){

        }
    }
}