// You are playing a puzzle game , where you have to create a Number by appending 2 parts of that number array.
// You have given a array of integers and a number X .
// you have to create X by appending 2 integers in the array next to each other .
// You have to return how many ways is possible to make X by the array elements

function puzzleGame(numbers, target) {
    let possible_ways = 0;
    for (let i = 0; i < numbers.length - 1; i++) {
        if ((`${numbers[i]}` + `${numbers[i + 1]}`) == target) possible_ways++
    }
    for(let i = numbers.length - 1; i>0; i--){
        if((`${numbers[i]}`+`${numbers[i-1]}`) == target) possible_ways++
    }
    return possible_ways
}

// console.log(puzzleGame([1, 212, 12, 12],1212));
console.log(puzzleGame([1, 11, 110], 11011));