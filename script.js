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

const buttonAdd = document.querySelector('#button-add');
const buttonSubtract = document.querySelector('#button-subtract');
const buttonMultiply = document.querySelector('#button-multiply');
const buttonDivide = document.querySelector('#button-divide');

const MAX_CHARACTER_LENGTH = 9;

let selectedOperator = 'add';
let firstOperand = 0;
let secondOperand = 0;
let result = 0;

let newLine = false;
let isDecimalAdded = false;
let isFirstOperandSet = false;
let isResultEvaluated = false;
let isCalculating = false;
let dividedByZero = false;

//used in case the user keeps pressing the = button. 
let isIterating = false;

buttonDecimal.addEventListener('click',()=>{
    if(!isDecimalAdded) renderInput('.');
    isDecimalAdded = true;
});
buttonZero.addEventListener('click',()=>{
    if(lcdText.textContent !== '0'){ 
        renderInput('0');
        updateOperand();
    }
});
buttonOne.addEventListener('click',()=>{
    renderInput('1');
    updateOperand();
});
buttonTwo.addEventListener('click',()=>{
    renderInput('2');
    updateOperand();
});
buttonThree.addEventListener('click',()=>{
    renderInput('3');
    updateOperand();
});
buttonFour.addEventListener('click',()=>{
    renderInput('4');
    updateOperand();
});
buttonFive.addEventListener('click',()=>{
    renderInput('5');
    updateOperand();
});
buttonSix.addEventListener('click',()=>{
    renderInput('6');
    updateOperand();
});
buttonSeven.addEventListener('click',()=>{
    renderInput('7');
    updateOperand();
});
buttonEight.addEventListener('click',()=>{
    renderInput('8');
    updateOperand();
});
buttonNine.addEventListener('click',()=>{
    renderInput('9');
    updateOperand();
});



buttonClear.addEventListener('click', ()=>{
    zeroInput();
    resetMemory();
});


buttonAdd.addEventListener('click', ()=>{
    if(!isCalculating) toggleOperands();
    operate();
    setOperator('add');
    isResultEvaluated  = true;
    isCalculating = true;
});
buttonSubtract.addEventListener('click', ()=>{
    if(!isCalculating) toggleOperands();
    operate();
    setOperator('subtract');
    isResultEvaluated  = true;
    isCalculating = true;
});
buttonMultiply.addEventListener('click', ()=>{
    if(!isCalculating) toggleOperands();
    operate();
    setOperator('multiply');
    isResultEvaluated  = true;
    isCalculating = true;
});
buttonDivide.addEventListener('click', ()=>{
    if(!isCalculating) toggleOperands();
    operate();
    setOperator('divide');
    isResultEvaluated  = true;
    isCalculating = true;
});
buttonEquals.addEventListener('click', ()=>{
    operate();
    renderResult();
    // isResultEvaluated = true;
    firstOperand = result;
    if(!isIterating) secondOperand = 0;
    isIterating = true;
});
 
function add(){
    let a = Number(firstOperand);
    let b = Number(secondOperand);
    result = a + b;
    setResult();
    return result;
}

function subtract(){
    let a = Number(firstOperand);
    let b = Number(secondOperand);
    result = a - b;
    setResult();
    return result;
}

function multiply(){
    let a = Number(firstOperand);
    let b = Number(secondOperand);
    result = a * b;
    setResult();
    return result;
}

function divide(){
    let a = Number(firstOperand);
    let b = Number(secondOperand);
    if(b === 0) {
        result = 'ribbiT';
        dividedByZero = true;
    } else {
        result = a / b;
    }
    setResult();
    return result;
}

function setOperator(operator){
    flashLCD();
    selectedOperator = operator;
    newLine = true;
    isDecimalAdded = false;
}

function setFirstOperand(value = lcdText.textContent){
    firstOperand = value;
}

function setSecondOperand(value = lcdText.textContent){
    secondOperand = value;
}

function updateOperand(){
    isFirstOperandSet ? setSecondOperand() : setFirstOperand();
}

function toggleOperands(){
    isFirstOperandSet ? isFirstOperandSet = false : isFirstOperandSet = true;
}

function setResult(){
    firstOperand = result;
}

function operate(){
    if(isResultEvaluated) return;
    
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
}




function renderInput(input){
    flashLCD();
    if(newLine || lcdText.textContent == '0' || dividedByZero) clearInput();
    if(lcdText.textContent.length < MAX_CHARACTER_LENGTH ) lcdText.textContent += input;
    if(dividedByZero) resetMemory();
    newLine = false;
    isResultEvaluated = false;
}

function renderResult(){
    flashLCD();
    lcdText.textContent = result;
}




function clearInput(){
    lcdText.textContent = '';
}

function zeroInput(){
    lcdText.textContent = '0';
}

function resetMemory(){
    secondOperand = 0;
    firstOperand = 0;
    isFirstOperandSet = false;
    isCalculating = false;
    dividedByZero = false;
    result = 0;
    setOperator('add');
}

function flashLCD(){
    lcdText.classList.add('flash');
    setTimeout(()=>{
        lcdText.classList.remove('flash');
    },400);
}

zeroInput();