let x = 10

if (x === 10) console.log('x is 10');
else console.log(false);

// else if
let num = 50;
if (num > x) console.log(`${num} is greater than ${x}`);
else if (num === x) console.log(`${num} is equal to ${x}`)
else console.log(`${num} is smaller than ${x}`);

// Terniary Operator
let result = x > num ? x : num;
console.log(result);


// Switch
let dayNum = 5;

switch(dayNum){
    case 1:
        console.log('Sunday');
        break;

    case 2:
        console.log('Monday');
        break;

    case 3:
        console.log('Tuesday');
        break;

    case 4:
        console.log('Wednesday');
        break;

    case 5:
        console.log('Thursday');
        break;

    case 6:
        console.log('friday');
        break;
    case 7:
        console.log('saturday');
        break;
}