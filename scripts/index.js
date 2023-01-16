// Screen Elements

class Calculator {

    // Screen Elements
    operationHolder = document.querySelector('.operation-holder');
    resultHolder = document.querySelector('.result-holder');
    // Screen Values
    operation = null;
    // resultDisplay = this.resultHolder.textContent;
    previousValue = null;

    // Algorithm
    result = '';
    precedingOperand = null;
    folowingOperand = null;

    // Keys
    keys = [...document.querySelectorAll('.btn')];

    updateApp() {
        this.operation = this.operationHolder.textContent;
        this.previousValue = [...this.operationHolder.textContent][this.operationHolder.textContent.length-1];

        this.resultHolder.textContent = this.result;

        console.log(this.resultHolder.textContent)
    }

    compute() {
        this.updateApp();
        console.log('computing..');

        // Getting the operand before an operator ...
        const operandBeforeOperatorRegExp = /(\d{1,})[\W]/;
        const operandBeforeOperator = this.operationHolder.textContent.match(operandBeforeOperatorRegExp);; 
        this.precedingOperand = operandBeforeOperator[1];

        // Getting the operand after an operator ...
        const operandAfterOperatorRegExp = /[\W](\d{1,})/;
        const operandAfterOperator = this.operationHolder.textContent.match(operandAfterOperatorRegExp);; 
        this.followingOperand = parseFloat(operandAfterOperator[1]);

        const operatorsRegExp = /\W/;
        const foundAnOperator =  this.operationHolder.textContent.match(operatorsRegExp);

        const operatorsAreMoreThanOne = this.areOperatorsMoreThanOne();

        if( foundAnOperator && !operatorsAreMoreThanOne ) {
            console.log(`there was no result`)

            console.log(foundAnOperator[0])
            this.operate(foundAnOperator[0])

        }

        // Checking if the operands are more than two
        if( typeof this.result == 'number' && operatorsAreMoreThanOne ) {
            console.log(`there was result`);

            // Get the new operand from the back of the operation string
            const reversedOperation = [...this.operationHolder.textContent].reverse().join('');
            const newFollowingOperandRegExp = /\d{1,}/;
            const newFollowingOperand = reversedOperation.match(newFollowingOperandRegExp);

            // Reversed the matched operand back and coereced it to a string
            this.followingOperand = parseFloat([...newFollowingOperand[0]].reverse().join(''));

            // Updated the previous value to the current result
            this.precedingOperand = parseFloat(this.result);

            const anotherOperator = this.getAnotherOperator(reversedOperation);
            console.log(this.precedingOperand, anotherOperator[0], 'anotheroperator', this.followingOperand)

            this.operate(anotherOperator);

        }

        // Escaping the value of the result when it returns NaN
        // It returns NaN when the current input is an operator, * for example,
        this.result == 'NaN' ? this.result = '': this.result = this.result;
        
    }

    getAnotherOperator(hook) {
        const anotherOperatorRegExp = /\W/;
        const reversedOperation = hook;
        const anotherOperator = reversedOperation.match(anotherOperatorRegExp);

        return anotherOperator[0];
    }

    areOperatorsMoreThanOne() {
        let operatorsAreMoreThanOneArray = [];
        const operatorsAreMoreThanOneRegExp = /\W+/g;
        const operatorsAreMoreThanOne = this.operationHolder.textContent.matchAll(operatorsAreMoreThanOneRegExp);
        for( let matchedOperator of operatorsAreMoreThanOne ) {
            operatorsAreMoreThanOneArray.push(matchedOperator);
        }
        
        return operatorsAreMoreThanOneArray.length > 1;
    }

    operate(operator) {
        operator == '/' ? this.result = this.precedingOperand / this.followingOperand : this.result = this.result;
        operator == '*' ? this.result = this.precedingOperand * this.followingOperand : this.result = this.result;
        // parseFloat() was used as the + may concatenate the operands but other operators coerce the operands to numbers
        operator == '+' ? this.result = parseFloat(this.precedingOperand) + parseFloat(this.followingOperand) : this.result = this.result;
        operator == '-' ? this.result = this.precedingOperand - this.followingOperand : this.result = this.result;

        this.resultHolder.textContent = this.result;
    }

    renderResult() {

        // this.updateApp();

        this.operationHolder.textContent = parseFloat(this.result);

        this.result = '';
        this.updateApp();
    }

    run() {
        // updateing the app before running it
        this.updateApp();

        this.keys.forEach(key => {
            key.addEventListener('click', event => {
                let keyContent = event.target.textContent;
                let btnClasses = event.target.classList;

                // Ensuring that the delete-btn content is not rendered in the screen when clicked
                if( btnClasses.contains('delete-btn') ) {
                    console.log('deleted')
                    return;
                } 

                // Ensuring that the equality-sign content is not rendered in the screen when clicked
                if( btnClasses.contains('equality-sign') ) {
                    
                    this.renderResult();
                }

                // Ensuring that the ac btn content is not rendered in the screen when clicked
                if( btnClasses.contains('ac') ) {
                    console.log('ac');
                }

                // Ensuring that the pie content is not rendered in the screen when clicked
                if( btnClasses.contains('pie') ) {
                    console.log('pie');
                }

                // Ensuring that the power btn content is not rendered in the screen when clicked
                if( btnClasses.contains('power') ) {
                    console.log('power');
                }

                // Ensuring that the square-root content is not rendered in the screen when clicked
                if( btnClasses.contains('square-root') ) {
                    console.log('square-root');
                }

                // Checking if the curent key is a number key
                if( btnClasses.contains('number') ) {

                    // Updating the the app before appending operands and computing the result
                    this.updateApp()

                    // Appending the current operand to the operation
                    this.operationHolder.textContent += keyContent;

                    // Compute the result on inputting the operands
                    this.compute(keyContent);
                }

                if( btnClasses.contains('arith') && !btnClasses.contains('equality-sign') ) {
                    
                    const numberRegExp  = /\d/;
                    const operandIsThere = this.operationHolder.textContent.match(numberRegExp);
                    const currentOperator = keyContent;

                    this.updateApp()
                    const previousOperator = this.previousValue;
                    const previousOperatorIsThisOperator = previousOperator == currentOperator;
                    
                    const previousValueWasAnOperator = this.previousValue == '/' || 
                        this.previousValue == '*' ||
                        this.previousValue == '+' ||
                        this.previousValue == '-';

                    // Avoiding immediate dupliaction of operators
                    if( previousValueWasAnOperator || previousOperatorIsThisOperator ) {
                        return;
                    }
                 
                    // Confirming the existence of an operand before appending an arith operator to the operation
                    if( operandIsThere ) {
                        this.operationHolder.textContent += keyContent;
                    }
                }
                else {
                    return;
                }
                
            })
        })
    }

}
;

const calculatorApp = new Calculator();
calculatorApp.run();
