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

    }

    compute() {
        this.updateApp();
        console.log('computing..');

        // Getting the operand before an operator ...
        let operandBeforeOperatorRegExp = /(\d{1,})[\/\*\+-]/;
        const dotOperandBeforeOperatorRegExp = /\./;
        let dotOperandBeforeOperator = this.operationHolder.textContent.match(dotOperandBeforeOperatorRegExp)

        const dotOperandAfterOperatorRegExp = /\./;
        let dotOperandAfterOperator = [...this.operationHolder.textContent].reverse().join('').match(dotOperandAfterOperatorRegExp);

        let operandBeforeOperator = this.operationHolder.textContent.match(operandBeforeOperatorRegExp);
        if( dotOperandBeforeOperator && !dotOperandAfterOperator ) {
            console.log('theres a dot for operand before  operator')
            // console.log('matched a dot for operandBeforeOperator')
            operandBeforeOperatorRegExp = /\d{1,}?[\.]\d{1,}[\/\*\+-]/;

            operandBeforeOperator = this.operationHolder.textContent.match(operandBeforeOperatorRegExp)
            console.log(operandBeforeOperator);
            this.precedingOperand = parseFloat(operandBeforeOperator[0].slice(0, operandBeforeOperator[0].length-1));
            console.log(this.precedingOperand);
        }

        operandBeforeOperator = this.operationHolder.textContent.match(operandBeforeOperatorRegExp);
        if( !dotOperandBeforeOperator ) {
            // console.log('theres no dot for operand before operator');
            this.precedingOperand = operandBeforeOperator[1];
        }

        // Getting the operand after an operator ...
        // Matching a whole numer or a floatimg point number
        let operandAfterOperatorRegExp = /[\/\*\+-](\d{1,})/;

        let operandAfterOperator = this.operationHolder.textContent.match(operandAfterOperatorRegExp);

        // If precedigng and following operands have a dot in them
        if( dotOperandAfterOperator && dotOperandBeforeOperator ) {
            
            // console.log("there's dot for operandAfterOperator");
            operandAfterOperatorRegExp = /[\/\*\+-]\d{1,}?[\.]\d{1,}/;
            
            operandAfterOperator = this.operationHolder.textContent.match(operandAfterOperatorRegExp);
            console.log(operandAfterOperator, operandAfterOperator[0].slice(1));
            this.followingOperand = parseFloat(operandAfterOperator[0].slice(1));
            console.log(this.followingOperand, this.precedingOperand);
        }
        
       if( !(dotOperandAfterOperator && dotOperandBeforeOperator) ) {

        // console.log("there's no dot for both operands");
        this.followingOperand = parseFloat(operandAfterOperator[1]);
        // console.log(this.followingOperand);
       }

       if( (dotOperandAfterOperator && dotOperandBeforeOperator)  ) {
        // console.log("there's dot for both operands");
       }
       if( !dotOperandBeforeOperator  ) {
        console.log("there's no dot for operandBeforeOperator -new");
       }

        const operatorsRegExp = /[\/\*\+-]/;
        const foundAnOperator =  this.operationHolder.textContent.match(operatorsRegExp);

        const operatorsAreMoreThanOne = this.areOperatorsMoreThanOne();

        if( foundAnOperator && !operatorsAreMoreThanOne || foundAnOperator ) {
            console.log(`there was no result`)

            console.log(foundAnOperator[0])
            this.operate(foundAnOperator[0])

        }

        // Checking if the operands are more than two
        if( typeof this.result == 'number' && operatorsAreMoreThanOne ) {
            console.log(`there was result`);

            // Get the new operand from the back of the operation string
            const reversedOperation = [...this.operationHolder.textContent].reverse().join('');
            // Matching a whole numer or a floatimg point number
            const newFollowingOperandRegExp = /[\/\*\+-](\d{1,})/ || /[\/\*\+-]\d{1,}?[\.]\d{1,}/;
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
        const anotherOperatorRegExp = /[\/\*\+-]/;
        const reversedOperation = hook;
        const anotherOperator = reversedOperation.match(anotherOperatorRegExp);

        return anotherOperator[0];
    }

    dotIsMoreThanOne() {

    }

    areOperatorsMoreThanOne() {
        let operatorsAreMoreThanOneArray = [];
        const operatorsAreMoreThanOneRegExp = /[\/\*\+-]/g;
        const operatorsAreMoreThanOne = this.operationHolder.textContent.matchAll(operatorsAreMoreThanOneRegExp);
        for( let matchedOperator of operatorsAreMoreThanOne ) {
            operatorsAreMoreThanOneArray.push(matchedOperator);
        }
        
        return operatorsAreMoreThanOneArray.length > 1;
    }

    operate(operator) {
        console.log(this.precedingOperand, this.followingOperand);
        operator == '/' ? this.result = this.precedingOperand / this.followingOperand : this.result = this.result;
        operator == '*' ? this.result = this.precedingOperand * this.followingOperand : this.result = this.result;
        // parseFloat() was used as the + may concatenate the operands but other operators coerce the operands to numbers
        operator == '+' ? this.result = parseFloat(this.precedingOperand) + parseFloat(this.followingOperand) : this.result = this.result;
        // parseFloat() was used as the - may concatenate the operands but other operators coerce the operands to numbers
        operator == '-' ? this.result = parseFloat(this.precedingOperand) - parseFloat(this.followingOperand) : this.result = this.result;

        this.resultHolder.textContent = this.result;
    }

    renderResult() {

        this.operationHolder.textContent = parseFloat(this.result);

        this.result = '';

        // Updating the app about changes made
        this.updateApp();
    }

    run() {
        // updating the app before running it
        this.updateApp();

        this.keys.forEach(key => {
            key.addEventListener('click', event => {
                let keyContent = event.target.textContent;
                let btnClasses = event.target.classList;

                // Ensuring that the delete-btn content is not rendered in the screen when clicked
                if( btnClasses.contains('delete-btn') ) {

                    const operation = [...this.operationHolder.textContent];
                    operation.pop();
                    this.operationHolder.textContent = operation.join('');
                    
                    this.updateApp();
                } 

                // Ensuring that the equality-sign content is not rendered in the screen when clicked
                if( btnClasses.contains('equality-sign') ) {
                    
                    this.renderResult();
                }

                // Ensuring that the ac btn content is not rendered in the screen when clicked
                if( btnClasses.contains('ac') ) {

                    this.result = '';
                    this.operationHolder.textContent = '';
                    this.resultHolder.textContent = '';

                    this.updateApp();
                }

                // Ensuring that the pie content is not rendered in the screen when clicked
                if( btnClasses.contains('pie') ) {
                    console.log('pie');

                    // Updating the the app before appending operands and computing the result
                    this.updateApp()

                    // Appending the current operand to the operation
                    this.operationHolder.textContent += '3.142';

                    // Compute the result on inputting the operands
                    this.compute();
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
                    this.compute();
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
