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
        
        if( operation.indexOf('*') != -1 ) {
           this.renderUI('*', operation);
        }
        if( operation.indexOf('+') != -1 ) {
            this.renderUI('+', operation);
        }
        if( operation.indexOf('-') != -1 ) {
            this.renderUI('-', operation);
        }
        if( operation.indexOf('/') != -1 ) {
            this.renderUI('/', operation);
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
                else {
                    this.currentResultHolder.textContent += keyContent;
                }
            })
        })
    }

}

const calculatorApp = new Calculator();
calculatorApp.run();