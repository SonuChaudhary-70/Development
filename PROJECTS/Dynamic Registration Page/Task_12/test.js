let num = [2, 4, 6, 8]
let newAr4r = []
let result = num.forEach((ele) => {
    console.log(ele*ele);
    newAr4r.push(ele*ele)
})

console.log(newAr4r)