let str = '      I am learning string '
console.log(str);

// remove white space from start and end of the string
console.log(str.trim())

// substring
let subStr = str.trim().substring(0, 3)
console.log('subString :', subStr);

let name = 'Sonu'
let lastName = 'Chaudhary'
console.log(`Full Name : ${name} ${lastName}`);

// split method4
console.log(`Split the string after 'a' and convert it into array :`, lastName.split('a'));

// String concatenation
let a = 'When candles are out,';
let b = 'all cats are grey.';
let c = a + ' ' + b;
console.log(c); // 'When candles are out, all cats are grey.'

// String comparison - You can compare strings based on their alphabetical order and length using arithmetic comparison operators. The return value is a boolean.
console.log('Berry' < 'Copper');; // true
// because 'B' comes before 'C'

console.log('Berry' < 'Bingo'); // true
// because the first characters are the same and 'e' comes before 'i'

console.log('berry' < 'Copper'); // false
// because the comparison is case-sensitive and capital letters come first

// includes() method
let sentence = 'Always look on the bright side of life';
sentence.includes('look up'); // false 
sentence.includes('look on'); // true
sentence.includes('look on', 8); // false