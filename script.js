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

const buttonClear = document.querySelector('#button-clear');
const buttonEquals = document.querySelector('#button-equals');

const buttonAdd = document.querySelector('#button-add');
const buttonSubtract = document.querySelector('#button-subtract');
const buttonMultiply = document.querySelector('#button-multiply');
const buttonDivide = document.querySelector('#button-divide');

const MAX_CHARACTER = 9;

lcdText.textContent = '';

let selectedOperator = '';
let storedNumber = '';

let newLine = false;

buttonZero.addEventListener('click',()=>{
    renderInput('0');
});
buttonOne.addEventListener('click',()=>{
    renderInput('1');
});
buttonTwo.addEventListener('click',()=>{
    renderInput('2');
});
buttonThree.addEventListener('click',()=>{
    renderInput('3');
});
buttonFour.addEventListener('click',()=>{
    renderInput('4');
});
buttonFive.addEventListener('click',()=>{
    renderInput('5');
});
buttonSix.addEventListener('click',()=>{
    renderInput('6');
});
buttonSeven.addEventListener('click',()=>{
    renderInput('7');
});
buttonEight.addEventListener('click',()=>{
    renderInput('8');
});
buttonNine.addEventListener('click',()=>{
    renderInput('9');
});
buttonClear.addEventListener('click', ()=>{
    clearInput();
    resetStoredNumber();
});

buttonAdd.addEventListener('click', ()=>{
    selectOperator('add');
});
buttonSubtract.addEventListener('click', ()=>{
    selectOperator('subtract');
});
buttonMultiply.addEventListener('click', ()=>{
    selectOperator('multiply');
});
buttonDivide.addEventListener('click', ()=>{
    selectOperator('divide');
});
buttonEquals.addEventListener('click', ()=>{
    renderResult(add(lcdText.textContent));
});



function add(input){
    let a = +storedNumber;
    let b = +input;
    return (a + b);
}

function subtract(a, b){
    return a - b ;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if(b == 0) return 'Ribbit!';
    return a / b;
}

function renderInput(input){
    flashLCD();
    if(newLine) clearInput();
    if(lcdText.textContent.length < MAX_CHARACTER )lcdText.textContent += input;
    newLine = false;
}

function renderResult(result){
    flashLCD();
    lcdText.textContent = result;
}

function clearInput(){
    lcdText.textContent = '';
}

function resetStoredNumber(){
    storedNumber = 0;
}

function flashLCD(){
    lcdText.classList.add('flash');
    setTimeout(()=>{
        lcdText.classList.remove('flash');
    },400);
}

function selectOperator(operator){
    selectedOperator = operator;
    flashLCD();
    newLine = true;
    storedNumber = lcdText.textContent;
}

function equals(){

}