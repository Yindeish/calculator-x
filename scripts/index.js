class Calculator {

    // Screen Elements
    priorResultHolder = document.querySelector('.prior-result');
    currentResultHolder = document.querySelector('.current-result');

    // Keys
    keys = [...document.querySelectorAll('.btn')];

    // Algorithm
    priorResult  = null;
    currentResult = null;

    compute() {
        let operation = this.currentResultHolder.textContent;
        
        // if( operation.indexOf('*') > -1 ) {
            // console.log('multiplication');
           this.getIndixesOfOperator('*');
        // } else {
            // console.log('not multiplication');
        // }
        // if( operation.indexOf('+') != -1 ) {
        //     this.renderUI('+', operation);
        // }
        // if( operation.indexOf('-') != -1 ) {
        //     this.renderUI('-', operation);
        // }
        // if( operation.indexOf('/') != -1 ) {
        //     this.renderUI('/', operation);
        // }


        // console.log(operation);
    }

    getIndixesOfOperator(operator) {
        // console.log(this.currentResultHolder.textContent)
        const indexes = [];

        // if( operator == '*' ) {
            const operandsRegexp = /\d+/g;   
            const operatorsRegexp = /!\d+/g;
            console.log(this.currentResultHolder.textContent);
            const matches = this.currentResultHolder.textContent.matchAll(operandsRegexp);
            const matchedOperators = this.currentResultHolder.textContent.matchAll(operatorsRegexp);
            console.log(matchedOperators);
            for (let match of matches ) {
                console.log(match[0]);
                console.log(matchedOperators[match][0])
            }
            // console.log(regexp.exec(this.currentResultHolder.textContent));
            
        // }
    }

    performOperation(operator, indexes) {
        console.log('perforoming operation' +operator+'..');
        if( operator == '*' ) {
            for (let match of indexes ) {
                console.log(this.currentResultHolder.textContent[match+1]);
            }
        }

    }

    renderUI(operand, operation) {
        const multiplicationSignIndex = operation.indexOf(operand);
        const firstOperand  = operation.slice(0, multiplicationSignIndex);
        const secondOperand = operation.slice(multiplicationSignIndex+1);
        this.priorResult  = firstOperand * secondOperand;
        this.priorResultHolder.textContent = this.priorResult;
        this.currentResultHolder.textContent = '';
    }

    run() {

        this.keys.forEach(key => {
            key.addEventListener('click', event => {
                let keyContent = event.target.textContent;
              
                // Ensuring that Eqaul sign and the delete btns are not rendered in the screen when clicked
                if( event.target.classList.contains('delete-btn') ) {
                    console.log('deleted')
                    return;
                } 
                if( event.target.classList.contains('equality-sign') ) {
                    this.compute();
                }
                // Not delete and equality-sign btns
                else {
                    this.currentResultHolder.textContent += keyContent;


                    // if( event.target.classList.contains('arith') ) {
                    //     console.log(`It's an arith operator`);  
                    //     if( event.target.classList.contains('multiplication') ) {
                    //         console.log("It's a * operation");
                    //         this.performOperation('*');
                    //     }
                    // } else {
                    //     console.log(`It's not an arith operator`);
                    // }
                }
            })
        })
    }

}

const calculatorApp = new Calculator();
calculatorApp.run();


