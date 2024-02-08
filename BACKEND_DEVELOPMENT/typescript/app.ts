const num1ele = document.getElementById('num1') as HTMLInputElement;
const num2ele = document.getElementById('num2') as HTMLInputElement;
const buttonElement = document.getElementById('addBtn') !;
function add(num1: number, num2: number) {
    return num1 + num2;
}

buttonElement.addEventListener('click',()=>{
    const num1 = num1ele.value
    const num2 = num2ele.value
    const result = add(+num1, +num2);
    console.log(result);
    
})