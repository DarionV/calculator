const lcdText = document.querySelector('#lcd-text');
const buttonZero = document.querySelector('#button-zero');
const buttonOne = document.querySelector('#button-one');
const buttonTwo = document.querySelector('#button-two');
const buttonThree = document.querySelector('#button-three');
const buttonFour = document.querySelector('#button-four');
const buttonFive = document.querySelector('#button-five');
const buttonSix = document.querySelector('#button-six');
const buttonSeven = document.querySelector('#button-seven');
const buttonEight = document.querySelector('#button-eight');
const buttonNine = document.querySelector('#button-nine');
const buttonDecimal = document.querySelector('#button-decimal');

const buttonClear = document.querySelector('#button-clear');
const buttonEquals = document.querySelector('#button-equals');
const buttonDelete = document.querySelector('#button-delete');

const buttonAdd = document.querySelector('#button-add');
const buttonSubtract = document.querySelector('#button-subtract');
const buttonMultiply = document.querySelector('#button-multiply');
const buttonDivide = document.querySelector('#button-divide');

const calculatorFrame = document.querySelector('#calculator-frame');

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

//used in case the user keeps pressing the = button and then presses an operator button.
//when pressing an operator button, operate() is called.
//We don't want to call operate() if the result has already been evaluated with = button.
let hasEvaluatedResult = false;

//-----NUMERICAL BUTTONS------------------//
buttonDecimal.addEventListener('click', addDecimal);
buttonZero.addEventListener('click',()=>{
        renderInput('0');
        setSecondOperand();
});
buttonOne.addEventListener('click',()=>{
    renderInput('1');
    setSecondOperand();
});
buttonTwo.addEventListener('click',()=>{
    renderInput('2');
    setSecondOperand();
});
buttonThree.addEventListener('click',()=>{
    renderInput('3');
    setSecondOperand();
});
buttonFour.addEventListener('click',()=>{
    renderInput('4');
    setSecondOperand();
});
buttonFive.addEventListener('click',()=>{
    renderInput('5');
    setSecondOperand();
});
buttonSix.addEventListener('click',()=>{
    renderInput('6');
    setSecondOperand();
});
buttonSeven.addEventListener('click',()=>{
    renderInput('7');
    setSecondOperand();
});
buttonEight.addEventListener('click',()=>{
    renderInput('8');
    setSecondOperand();
});
buttonNine.addEventListener('click',()=>{
    renderInput('9');
    setSecondOperand();
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
    if(e.key === 'Escape') reset();
    if(e.key === 'Enter' || e.key === '=') pressEqualButton();
})

//-----DELETE BUTTONS--------------------//
buttonClear.addEventListener('click', reset);
buttonDelete.addEventListener('click', backspace);

//-----OPERATOR BUTTONS------------------//
buttonAdd.addEventListener('click', ()=>{
    pressOperatorButton('add')
});
buttonSubtract.addEventListener('click', ()=>{
    pressOperatorButton('subtract');
});
buttonMultiply.addEventListener('click', ()=>{
    pressOperatorButton('multiply');
});
buttonDivide.addEventListener('click', ()=>{
    pressOperatorButton('divide');
});
buttonEquals.addEventListener('click', pressEqualButton);

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
    flashLCD();
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