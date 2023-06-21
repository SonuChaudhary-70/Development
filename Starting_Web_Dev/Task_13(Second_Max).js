// LOGIC - 1
function secondMax(arr) {
    let idx = 0
    let max = arr[idx]
    for (let i = 1; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i]
            idx = i
        }
    }
    arr.splice(idx, 1)
    max = arr[0]
    for (let i = 1; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i]
        }
    }
    return max
}
secondMax([1, 2, 4, 1, 5, 6])

// let months = ["January", "February", "Monday", "Tuesday"];
// let days = months.splice(2);

// console.log(months); // ["Monday", "Tuesday"]