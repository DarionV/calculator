const lcdText = document.querySelector('.lcd');
const numpad = document.querySelector('.numpad');
const calculatorFrame = document.querySelector('.calculator');

const MAX_CHARACTER_LENGTH = 8;
const MULTIPLE = 100000000;

let firstOperand = 0;
let secondOperand = 0;
let result = 0;
let selectedOperator = 'add';
let a = 0;
let b = 0;

let newLine = false;
let isDecimalAdded = false;
let dividedByZero = false;


//when pressing an operator button, operate() is called.
//We don't want to call operate() if the result has already been evaluated with = button.
//used in case the user keeps pressing the = button and then presses an operator button.
let hasEvaluatedResult = false;

const buttonLayout = [7,4,1,0,8,5,2,'decimal',9,6,3,'equals','multiply','subtract','add'];

for(let i = 0; i < 2; i++) {
    let newRow = document.createElement('div');
    newRow.classList.add('container', 'row');

    if(i === 0) {
        for(let i = 0; i < 3; i++){
            let newDiv = document.createElement('div');
            newDiv.classList.add('container', 'digit');
            switch (i) {
                case 0: 
                        newDiv.classList.add('long-horizontal');
                        newDiv.textContent = 'CLEAR'
                        newDiv.addEventListener('click', reset);
                        break;
                case 1: 
                        newDiv.textContent = '◄'
                        newDiv.addEventListener('click', backspace);
                        break;
                case 2: 
                        newDiv.classList.add('shift-1', 'scale-1', 'operator');
                        newDiv.textContent = '÷'
                        newDiv.addEventListener('click', ()=>{
                            pressOperatorButton('divide');
                        });
                        break;
                default: console.log('fel');
            }
            newRow.appendChild(newDiv);
        }
    } else {
    let buttonIndex = 0;
    for(let i = 0; i < 4; i++){
        
        
        const newColumn = document.createElement('div');
        newColumn.classList.add('container', 'column');
            for(let i = 0; i < 4; i++){
                console.log(buttonLayout[buttonIndex]);
                let newDiv = document.createElement('div');
                newDiv.classList.add('container', 'digit');

                if(buttonLayout[buttonIndex] === 'decimal') {
                    newDiv.addEventListener('click', addDecimal);
                    newDiv.textContent = '.';
                    newColumn.appendChild(newDiv);
                    buttonIndex ++;
                    continue;
                }

                if(buttonLayout[buttonIndex] === 'equals') {
                    newDiv.addEventListener('click', pressEqualButton);
                    newDiv.textContent = '=';
                    newColumn.appendChild(newDiv);
                    buttonIndex ++;
                    continue;
                }

                if(buttonLayout[buttonIndex] === 'multiply') {
                    newDiv.classList.add('operator');
                    newDiv.addEventListener('click', ()=>{
                        pressOperatorButton('multiply')
                    });
                    newDiv.textContent = 'X';
                    newColumn.appendChild(newDiv);
                    buttonIndex ++;
                    continue;
                }
                
                if(buttonLayout[buttonIndex] === 'subtract') {
                    newDiv.classList.add('operator');
                    newDiv.addEventListener('click', ()=>{
                        pressOperatorButton('subtract')
                    });
                    newDiv.textContent = '-';
                    newColumn.appendChild(newDiv);
                    buttonIndex ++;
                    continue;
                }

                if(buttonLayout[buttonIndex] === 'add') {
                    newDiv.classList.add('operator', 'long');
                    newDiv.addEventListener('click', ()=>{
                        pressOperatorButton('add')
                    });
                    newDiv.textContent = '+';
                    newColumn.appendChild(newDiv);
                    buttonIndex ++;
                    break;
                }

                newDiv.textContent = buttonLayout[buttonIndex];
                const input = buttonLayout[buttonIndex];
                newDiv.addEventListener('click',()=>{
                    renderInput(input);
                    setSecondOperand();
                });
                buttonIndex ++;
                newColumn.appendChild(newDiv);
            }
            newRow.appendChild(newColumn);
    }   
}
    numpad.appendChild(newRow);
}

document.addEventListener('keydown',(e)=>{
    if (!isNaN(Number(e.key))) {
        renderInput(e.key);
        setSecondOperand();
    }
    if(e.key === '+') pressOperatorButton('add');
    if(e.key === '-') pressOperatorButton('subtract');
    if(e.key === '*') pressOperatorButton('multiply');
    if(e.key === '.') addDecimal();
    if(e.key === '/') { pressOperatorButton('divide'); e.preventDefault();}
    if(e.key === 'Backspace') backspace();
    if(e.key === 'Escape') reset();
    if(e.key === 'Enter' || e.key === '=') pressEqualButton();
})

//-------FUNCTIONS-----------------------//
function operate(){
    switch(selectedOperator){
        case 'add': add();
        break;
        case 'subtract': subtract();
        break;
        case 'multiply': multiply();
        break;
        case 'divide': divide();
        break;
        default:
            console.log('Nothing to evaluate');
    }
    setFirstOperand(result);
    newLine = true;
    isDecimalAdded = false;
}

function add(){
    getOperands();
    result = (a + b) / MULTIPLE;
    setFirstOperand(result);
    return result;
}

function subtract(){
    getOperands();
    result = (a - b) / MULTIPLE;
    setFirstOperand(result);
    return result;
}

function multiply(){
    getOperands();
    result = ((a * b) / MULTIPLE) / MULTIPLE;
    setFirstOperand(result);
    return result;
}

function divide(){
    getOperands();
    if(b === 0) divideByZero();
    else{
        result = (a / b) 
        setFirstOperand(result);
        return result;
    }
}

function pressOperatorButton(operator){
    if(!hasEvaluatedResult) operate();
    hasEvaluatedResult = false;
    
    setSecondOperand('0');
    setOperator(operator);
}

function divideByZero(){
    result = 'RIBBIT!';
    dividedByZero = true;
    shake();
}

function setFirstOperand(value = lcdText.textContent){
    firstOperand = value;
}

function setSecondOperand(value = lcdText.textContent){
    secondOperand = value;
}

function setOperator(operator){
    selectedOperator = operator;
    flashLCD();
}

function getOperands(){
    a = Number(firstOperand) * MULTIPLE;
    b = Number(secondOperand) * MULTIPLE;
}

function addDecimal(){
    if(!isDecimalAdded) renderInput('.');
    isDecimalAdded = true;
}

function pressEqualButton(){
    operate();
    renderResult();
    hasEvaluatedResult = true;
}
function renderInput(input){
    console.log(input);
    flashLCD();
    if(newLine || lcdText.textContent == '0' || dividedByZero) clearInput();
    if(lcdText.textContent.length < MAX_CHARACTER_LENGTH ) lcdText.textContent += input;
    if(dividedByZero) resetMemory();
    newLine = false;
}

function renderResult(){
    flashLCD();
    const resultString = result.toString();
    if(resultString.length <= MAX_CHARACTER_LENGTH) lcdText.textContent = result;
    else lcdText.textContent = result.toExponential(2);
}

function backspace(){
    let inputArray = Array.from(lcdText.textContent);
    inputArray.pop();
    let string = inputArray.join('');
    clearInput();
    renderInput(string);
    if(hasEvaluatedResult) reset();
    else setSecondOperand();
}

function reset(){
    resetMemory();
    zeroInput();
}

function clearInput(){
    lcdText.textContent = '';
}

function zeroInput(){
    lcdText.textContent = '0';
}

function welcome(){
    lcdText.textContent = 'welcome!';
    newLine = true;
}

function resetMemory(){
    firstOperand = 0;
    secondOperand = 0;
    result = 0;
    dividedByZero = false;
    hasEvaluatedResult = false;
    selectedOperator = 'add';
    isDecimalAdded = false;
}

function flashLCD(){
    lcdText.classList.add('flash');
    setTimeout(()=>{
        lcdText.classList.remove('flash');
    },400);
}

function shake(){
    calculatorFrame.classList.add('shake');
    setTimeout(()=>{
        calculatorFrame.classList.remove('shake');
    }, 5000);
}

welcome();