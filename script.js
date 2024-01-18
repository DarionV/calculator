const lcdText = document.querySelector('.lcd');
const numpad = document.querySelector('.numpad');
const calculatorFrame = document.querySelector('.calculator');
const row2 = document.querySelector('#row-2');
const operatorColumn = document.querySelector('#operator-column');
const clearButton = document.querySelector('#clear-button');
const deleteButton = document.querySelector('#delete-button');
const divideButton = document.querySelector('#divide-button');
const multiplyButton = document.querySelector('#multiply-button');
const subtractButton = document.querySelector('#subtract-button');
const addButton = document.querySelector('#add-button');

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

const buttonLayout = [9,6,3,'=',8,5,2,0,7,4,1,'.'];
let buttonIndex = 0;

function addButtons(){
    for(let i = 0; i < 3; i++){   

        let newColumn = document.createElement('div');
        newColumn.classList.add('container', 'column');

            for(let i = 0; i < 4; i++){
                let newButton = document.createElement('div');
                newButton.classList.add('container', 'digit');
                newButton.textContent = buttonLayout[buttonIndex];
                const input = buttonLayout[buttonIndex];

                if(buttonLayout[buttonIndex] === '='){
                    newButton.addEventListener('click', pressEqualButton);
                } else if (buttonLayout[buttonIndex] === '.'){
                    newButton.addEventListener('click', addDecimal);
                } else {
                    newButton.addEventListener('click',()=>{
                        renderInput(input);
                        setSecondOperand();
                    });
                }
                newColumn.appendChild(newButton);
                buttonIndex++;
            }
         row2.prepend(newColumn);
    }   
}

clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', backspace);
multiplyButton.addEventListener('click',()=>{
    pressOperatorButton('multiply');
});
subtractButton.addEventListener('click',()=>{
    pressOperatorButton('subtract');
});
divideButton.addEventListener('click',()=>{
    pressOperatorButton('divide');
});
addButton.addEventListener('click',()=>{
    pressOperatorButton('add');
});

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
    if(e.key === 'Escape') clear();
    if(e.key === 'Enter' || e.key === '=') pressEqualButton();
})

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
    if(hasEvaluatedResult) clear();
    else setSecondOperand();
}

function clear(){
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

addButtons();
welcome();