class DomHelper {
    getElements() {
        const numberKeys = [...document.querySelectorAll('.number')],
        operatorKeys = [...document.querySelectorAll('.arith')],
        braces = [...document.querySelectorAll('.brace')],
    
        delKey = document.querySelector('.delete-btn'),
        resetKey = document.querySelector('.ac'),
        equalityOperator = document.querySelector('.equality-sign'),
    
        screenDisplayElement = document.querySelector('.screen input');

        return {
            numberKeys,
            operatorKeys,
            braces,

            delKey,
            resetKey,
            equalityOperator,

            screenDisplayElement,
        }
        
    }
}

class Calculator extends DomHelper {
        
    #result = '';
    #previousValueIsAnOperator = false;
    #previousValueIsANumber = false;

    tap(element, runFn) {
        element?.addEventListener('click', runFn)
    }

    displayContentOf(button) {
        const { screenDisplayElement } = this.getElements();

        if( button?.classList?.contains('number') ||
        button?.classList?.contains('brace') || 
        ( button?.classList?.contains('arith') && !button?.classList?.contains('equality-sign') )
        && !this.#previousValueIsAnOperator ) {
            if( button?.classList?.contains('arith') ) {
                if( this.#previousValueIsANumber ) screenDisplayElement.value += button.textContent;
                else return;
            } else {
                screenDisplayElement.value += button.textContent;
            }
        } else {
            return;
        }
    }

    computeResult(hook) {
        this.#result = eval(hook.value);
        hook.value = this.#result;
    }
    
    clearScreen(hook) {
        this.#result = '';
        hook.value = this.#result;
    }
    
    deleteValue(hook) {
        const valueIndex = hook.value.length-1;
        const helperArray = [...hook.value];
    
        helperArray.splice(valueIndex, 1);
    
        hook.value = helperArray.join('');
    }

    checkPreviousValueIsAnOperator() {
        const { screenDisplayElement } = this.getElements();

        this.checkIfNumberIsInitialized();
        const operatorsRegExp = /[*-+\/]/;
        const previousValueIsAnOperator = String(screenDisplayElement.value[screenDisplayElement.value.length -1]).match(operatorsRegExp);
        if( previousValueIsAnOperator ) this.#previousValueIsAnOperator = true;
        else this.#previousValueIsAnOperator = false;
    }

    checkIfNumberIsInitialized() {
        const { screenDisplayElement } = this.getElements();

        const numbersRegExp = /\d/;
        let digitIsANumber = null;
        if( String(screenDisplayElement.value).length <= 1 ) {
            digitIsANumber = String(screenDisplayElement.value[0]).match(numbersRegExp);
        } 
        if( String(screenDisplayElement.value).length > 1 ) {
            digitIsANumber = String(screenDisplayElement.value[String(screenDisplayElement.value).length -1]).match(numbersRegExp);
        }
        if( digitIsANumber ) this.#previousValueIsANumber = true;
        else this.#previousValueIsANumber = false;
    }

    run() {
        const { delKey,
            numberKeys,
            operatorKeys,
            resetKey,
            screenDisplayElement,
            equalityOperator,
            braces } = this.getElements();

        numberKeys.forEach(numberKey => {
            this.tap(numberKey, () => {
                this.displayContentOf(numberKey);
                this.checkPreviousValueIsAnOperator();
            });
        })
        
        operatorKeys.forEach(operatorKey => {
            this.tap(operatorKey, () => {
                this.displayContentOf(operatorKey);
                this.checkPreviousValueIsAnOperator();
            })
        })

        braces.forEach(brace => {
            this.tap(brace, () => {
                this.displayContentOf(brace);
            })
        })

        this.tap(equalityOperator, () => this.computeResult(screenDisplayElement));

        this.tap(resetKey, () => this.clearScreen(screenDisplayElement));

        this.tap(delKey, () => this.deleteValue(screenDisplayElement));

    }
}

const calculator = new Calculator();
calculator.run();