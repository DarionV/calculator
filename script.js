const lcdText = document.querySelector('.lcd');
const numpad = document.querySelector('.numpad');
const calculatorFrame = document.querySelector('.calculator');

const MAX_CHARACTER_LENGTH = 8;
const MULTIPLE = 100000000;
const NR_OF_COLUMNS = 4;
const BUTTONS_PER_COLUMN = 4;

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

//The numpad consists of two rows, the top row has 3 buttons - clear, delete and divide.
//The bottom row consists of 4 columns.
//They are ordered that way because it made it easier placing the long buttons.
const topRowLayout = ['clear', 'delete', 'divide'];
const buttonLayout = [7,4,1,0,8,5,2,'decimal',9,6,3,'equals','multiply','subtract','add'];
let buttonIndex = 0;

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


function addTopRow(){
    let newRow = document.createElement('div');
    newRow.classList.add('container', 'row');

    topRowLayout.forEach((e)=> {
        let newButton = document.createElement('div');
        newButton.classList.add('container', 'digit');
        switch (e) {
            case 'clear': 
                    newButton.classList.add('long-horizontal');
                    newButton.textContent = 'CLEAR'
                    newButton.addEventListener('click', reset);
                    break;
            case 'delete': 
                    newButton.textContent = '◄'
                    newButton.addEventListener('click', backspace);
                    break;
            case 'divide': 
                    newButton.classList.add('shift-1', 'scale-1', 'operator');
                    newButton.textContent = '÷'
                    newButton.addEventListener('click', ()=>{
                        pressOperatorButton('divide');
                    });
                    break;
        }
        newRow.appendChild(newButton);
    })
    numpad.appendChild(newRow);
}

function addButtons(){
    let newRow = document.createElement('div');
    newRow.classList.add('container', 'row');

    for(let i = 0; i < NR_OF_COLUMNS; i++){
        
        let newColumn = document.createElement('div');
        newColumn.classList.add('container', 'column');

            for(let i = 0; i < BUTTONS_PER_COLUMN; i++){

                let newButton = document.createElement('div');
                newButton.classList.add('container', 'digit');

                switch(buttonLayout[buttonIndex]){

                    case 'decimal': newButton.addEventListener('click', addDecimal);
                                    newButton.textContent = '.';
                                    newColumn.appendChild(newButton);
                                    buttonIndex++;
                                    continue;

                    case 'equals':  newButton.addEventListener('click', pressEqualButton);
                                    newButton.textContent = '=';
                                    newColumn.appendChild(newButton);
                                    buttonIndex++;
                                    continue;

                    case 'multiply': newButton.classList.add('operator');
                                    newButton.addEventListener('click', ()=>{ pressOperatorButton('multiply') });
                                    newButton.textContent = 'X';
                                    newColumn.appendChild(newButton);
                                    buttonIndex++;
                                    continue;
                
                    case 'subtract': newButton.classList.add('operator');
                                    newButton.addEventListener('click', ()=>{ pressOperatorButton('subtract')});
                                    newButton.textContent = '-';
                                    newColumn.appendChild(newButton);
                                    buttonIndex++;
                                    continue;
                    
                    case 'add':     newButton.classList.add('operator', 'long');
                                    newButton.addEventListener('click', ()=>{ pressOperatorButton('add') });
                                    newButton.textContent = '+';
                                    newColumn.appendChild(newButton);
                                    buttonIndex++;
                                    continue;

                    case  undefined:      continue;
                }
        
                newButton.textContent = buttonLayout[buttonIndex];
                const input = buttonLayout[buttonIndex];

                newButton.addEventListener('click',()=>{
                    renderInput(input);
                    setSecondOperand();
                });

                newColumn.appendChild(newButton);
                buttonIndex++;
            }
        newRow.appendChild(newColumn);
    }   
    numpad.appendChild(newRow);
}

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

addTopRow();
addButtons();
welcome();