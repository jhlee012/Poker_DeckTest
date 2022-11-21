function isStraight(array) {
    array = array.sort(function(a, b) {
        return a.number - b.number
    })

    let nums = []
    let syms = []
    for (let i = 0; i<5; i++) {
        nums.push(array[i].number)
        syms.push(array[i].type)
    } 

    for (let  i = 0; i< nums.length; i++) {
        if (i == 0) continue;
        if ((nums[i] - 1) == nums[i-1]) continue;
        else return false
    }
    return true
}

let testarr = [
    { number: 1, type: 2 },
    { number: 2, type: 2 },
    { number: 2, type: 2 },
    { number: 4, type: 3 },
    { number: 5, type: 2 }
]

console.log(isStraight(testarr))