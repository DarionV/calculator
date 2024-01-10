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

const MAX_CHARACTER_LENGTH = 8;
const MULTIPLE = 100000000;

let firstOperand = 0;
let secondOperand = 0;
let result = 0;
let selectedOperator = 'add';

let newLine = false;
let isDecimalAdded = false;
let dividedByZero = false;

//used in case the user keeps pressing the = button and then presses an operator button.
//when pressing an operator button, operate() is called.
//We don't want to call operate() if the result has already been evaluated with = button.
let hasEvaluatedResult = false;

//-----NUMERICAL BUTTONS------------------//
buttonDecimal.addEventListener('click',()=>{
    if(!isDecimalAdded) renderInput('.');
    isDecimalAdded = true;
});
buttonZero.addEventListener('click',()=>{
    if(lcdText.textContent !== '0'){ 
        renderInput('0');
        setSecondOperand();
    }
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

//-----DELETE BUTTONS--------------------//
buttonClear.addEventListener('click', ()=>{
    zeroInput();
    resetMemory();
});
buttonDelete.addEventListener('click', backspace);

//-----OPERATOR BUTTONS------------------//
buttonAdd.addEventListener('click', ()=>{
    if(!hasEvaluatedResult) operate();
    hasEvaluatedResult = false;
    
    setSecondOperand('0');
    setOperator('add');
});
buttonSubtract.addEventListener('click', ()=>{
    if(!hasEvaluatedResult) operate();
    hasEvaluatedResult = false;

    setSecondOperand('0');
    setOperator('subtract');
});
buttonMultiply.addEventListener('click', ()=>{
    if(!hasEvaluatedResult) operate();
    hasEvaluatedResult = false;

    setSecondOperand('0');
    setOperator('multiply');
});
buttonDivide.addEventListener('click', ()=>{
    if(!hasEvaluatedResult) operate();
    hasEvaluatedResult = false;

    setSecondOperand('0');
    setOperator('divide');
});
buttonEquals.addEventListener('click', ()=>{
    operate();
    renderResult();
    hasEvaluatedResult = true;
});

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
    let a = Number(firstOperand) * MULTIPLE;
    let b = Number(secondOperand) * MULTIPLE;
    result = (a + b) / MULTIPLE;
    setFirstOperand(result);
    return result;
}

function subtract(){
    let a = Number(firstOperand) * MULTIPLE;
    let b = Number(secondOperand) * MULTIPLE;
    result = (a - b) / MULTIPLE;
    setFirstOperand(result);
    return result;
}

function multiply(){
    let a = Number(firstOperand) * MULTIPLE;
    let b = Number(secondOperand) * MULTIPLE;
    result = ((a * b) / MULTIPLE) / MULTIPLE;
    setFirstOperand(result);
    console.log(result);
    return result;
}

function divide(){
    let a = Number(firstOperand) * MULTIPLE;
    let b = Number(secondOperand) * MULTIPLE;

    if(b === 0) divideByZero();

    result = (a / b) / MULTIPLE;
    setFirstOperand(result);
    return result;
}

function divideByZero(){
    result = 'RIBBIT!';
    dividedByZero = true;
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
    updateOperand();
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
}

function flashLCD(){
    lcdText.classList.add('flash');
    setTimeout(()=>{
        lcdText.classList.remove('flash');
    },400);
}

welcome();