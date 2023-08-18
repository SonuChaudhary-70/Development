
var AAA_sort = function (sentences) {
    let aCount = []
    for (let ele of sentences) {
        let count = 0
        for (let char of ele) {
            if (char == 'a') {
                count++
            }
        }
        if (count == 0) {
            aCount.push(ele.length)
        } else {
            aCount.push(count)
        }
        console.log("A's count arr :", aCount);
    }

    // sort the original array and noOfAs
    for (let i = 1; i < sentences.length; i++) {
        for (let j = 0; j < sentences.length - i; j++) {
            if (aCount[j] < aCount[i]) {
                // sort origina array
                let temp1 = sentences[j]
                sentences[j] = sentences[j + 1];
                sentences[j + 1] = temp1;

                // sort aCount
                let temp2 = aCount[j];
                aCount[j] = aCount[j + 1];
                aCount[j + 1] = temp2
            }
        }
    }
    return sentences
};

let result = AAA_sort(["vaibhav", "almanac", "is", "fat", "button", "aabaca"])
console.log(result);