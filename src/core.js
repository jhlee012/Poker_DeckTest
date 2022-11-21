export function Rand(x, y) {
    x = Math.ceil(x)
    y = Math.floor(y)

    return Math.floor(Math.random() * (y - x + 1 )) + x
}


/**
 * SYMBOL::
 * 1 => ♠
 * 2 => ♣
 * 3 => ♡
 * 4 => ◇
 */
/**
 * 
 * @returns deck : array
 */
export function getDeck() {
    let deck = []
    for (let i = 0; i<5; i++) {
        let num = Rand(1,13)
        let symbol = Rand(1, 4)

        let temp = {'number' : num, 'type':symbol}
        
        if(deck.find(e => JSON.stringify(e) == JSON.stringify(temp))) {
            i = i-1;
            continue;
        }
        deck.push(temp)
    }
    return deck;
}

/**
 * @returns
 * 0 => High Card
 * 1 => One Pair
 * 2 => Two Pair
 * 3 => Three of a kind
 * 4 => Four of a kind
 * 5 => Full house
 */
export function DuplicateCheck(array) {
    array = array.sort(function(a, b) {
        return a.number - b.number
    })

    let nums = []
    let syms = []
    for (let i = 0; i<5; i++) {
        nums.push(array[i].number)
        syms.push(array[i].type)
    }

    let pairCard = []
    let tripleCard = []
    let fourkind = []

    nums.forEach(e => {
        if (nums.indexOf(e) !== nums.lastIndexOf(e)) {
            switch(nums.lastIndexOf(e) - nums.indexOf(e)) {
                case 1:
                    pairCard.push(e)
                    break;
                case 2:
                    tripleCard.push(e)
                    break;
                case 3: 
                    fourkind.push(e)
                    break;
            }
        }
    })

    if (fourkind.length == 4) return 4; //Four of a kind
    else if (pairCard.length == 2 && tripleCard.length == 3) return 5; //Full house
    else if (pairCard.length == 0 && tripleCard.length == 3) return 3; // Triple (Three of a kind)
    else if (pairCard.length == 2 && tripleCard.length == 0) return 1; //One Pair
    else if (pairCard.length == 4) return 2; // Two Pair
    else return 0;
}

/**
 * 
 * @     {JSON} array 
 * @returns boolean
 */
export function isFlush(array) {
    array = array.sort(function(a, b) {
        return a.number - b.number
    })

    let nums = []
    let syms = []
    for (let i = 0; i<5; i++) {
        nums.push(array[i].number)
        syms.push(array[i].type)
    }

    if ((new Set(syms).size) == 1) return true;
    else return false;
}

export function instantStraight(array) {
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

/**
 * 
 * @param {JSON} array 
 * @returns 
 * 0 => none
 * 1 => Straight (excludes all)
 * 2 => Royal Straight
 * 3 => Straight Flush
 * 4 => Royal Straight Flush
 */
export function isStraight(array) {
    if(!instantStraight(array)) {
        array = array.sort(function(a, b) {
            return a.number - b.number
        })
    
        let nums = []
        for (let i = 0; i<5; i++) {
            nums.push(array[i].number)
        }

        
        if (JSON.stringify(nums) !== '[1,10,11,12,13]') return 0;
        else if ((JSON.stringify(nums) == '[1,10,11,12,13]') && isFlush(array)) return 4
        else return 2; 
    }
    else {
        if (isFlush(array)) return 3
        else return 1;
    }
}


/*     if ((nums[4] - nums[0]) == 4) {
        if (isFlush(array)) return 3 //Straight Flush
        else return 1 //straight
    }
    if ((nums[4] - nums[1]) == 3 && (nums[0] == 1) && (nums[4] == 13)) {
        if (isFlush(array)) return 4 //Royal Straight Flush
        else return 2 //Royal Straight
    }
    else return 0; //none */


/* let testarr = [
    { number: 1, type: 2 },
    { number: 10, type: 2 },
    { number: 11, type: 2 },
    { number: 12, type: 3 },
    { number: 13, type: 2 }
]

console.log(DuplicateCheck(testarr))
console.log(isFlush(testarr))
console.log(isStraight(testarr)) */

export function evalRes(array) {
    let dup = DuplicateCheck(array)
    let flush = isFlush(array)
    let straight = isStraight(array)

    let res;

    switch(dup) {
        case 0:
            res = '1. High Card'
            break;
        case 1:
            res = '2. One Pair'
            break;
        case 2:
            res = '3. Two Pair'
            break;
        case 3:
            res = '4. Three of a Kind'
            break;
        case 4: 
            res = '9. Four of a kind'
            break;
        case 5:
            res = '8. **Full house**'
            break;
    }
    if (flush && (straight == 0)) {
        res = '7. Flush'
    }
    switch(straight) {
        case 0: 
            break;
        case 1:
            res = '5. Straight'
            break;
        case 2: 
            res = '6. Royal Straight'
            break;
        case 3:
            res = '10. Straight Flush'
            break;
        case 4: 
            res = '11. Royal Straight Flush'
    }

    return res;
}

let total=0, high=0, one=0, two=0, three=0, four=0, flush=0, straight=0, r_straight=0, r_s_flush=0, fullhouse=0, s_flush = 0
export function resChecker(res) {
    let arr = res.split('.')
    total++
    switch(Number(arr[0])) {
        case 1:
            high++
            break;
        case 2:
            one++
            break;
        case 3: 
            two++
            break;
        case 4:
            three++
            break;
        case 5:
            straight++
            break;
        case 6:
            r_straight++
            break;
        case 7:
            flush++
            break;
        case 8:
            fullhouse++
            break;
        case 9:
            four++
            break;
        case 10:
            s_flush++
            break;
        case 11:
            r_s_flush++
            break;
    }
}

export function design(array) {
    let temp = array;
    let res = []
    temp.forEach(e => {
        switch(e.number) {
            case 1: 
                e.number = 'A'
                break;
            case 11:
                e.number = 'J'
                break;
            case 12: 
                e.number = 'Q'
                break;
            case 13:
                e.number = 'K'
                break;
        }
        switch(e.type) {
            case 1 : 
                e.type = '♠'
                break;
            case 2:
                e.type = '♣'
                break;
            case 3:
                e.type = '♡'
                break;
            case 4: 
                e.type = '◇'
                break;
        }
        res.push(`${e.number}${e.type}`)
    })
    return `${res[0]} ${res[1]} ${res[2]} ${res[3]} ${res[4]}`
}

class Prob {
    constructor(name, res, tot) {
        this.name = name
        this.totalRes = res
        this.total = tot
        this.prob = (((res / tot)*100).toFixed(5)) + '%'
    }
    doTotalRes() {
        if(this.name == 'Total') {
            this.prob = '100%'
        }
    }
}

export function doTest(param) {
    let total = 0;
    for (let i = 0; i < param; i++) {
        let subject = getDeck()
        let evals = evalRes(subject)
        let designres= design(subject)
        resChecker(evals)
        console.log(`Formatted : ${designres} | ${evals}`)
        total++
    }
    let totalCons = new Prob('Total', total, total)
    totalCons.doTotalRes()
    let highP = new Prob('High Card', high, total)
    let oneP = new Prob('One Pair', one, total)
    let twoP = new Prob('Two Pair', two, total)
    let threeP = new Prob('Three of a kind', three, total)
    let straightP = new Prob('Straight', straight, total)
    let r_straightP = new Prob('Royal Straight', r_straight, total)
    let flushP = new Prob('Flush', flush, total)
    let fhouseP = new Prob('Full house', fullhouse, total)
    let fourP = new Prob('Four of a Kind', four, total)
    let s_fP = new Prob('Straight Flush', s_flush, total)
    let r_s_flushP = new Prob('Royal Straight Flush', s_flush, total)

    console.log(`Done : ${total} Tries.`)
    console.table([totalCons, highP, oneP, twoP, threeP, straightP, r_straightP, flushP, fhouseP, fourP, s_fP, r_s_flushP], ["Name", "totalRes", "prob"])

/*     console.log(`Total : ${total}\nHigh Card : ${high} | ${(high/total).toFixed(7) *100}%\nOne Pair : ${one} | ${(one/total).toFixed(7) *100}%\nTwo Pair : ${two} | ${(two/total).toFixed(7) *100}%\nThree of a Kind : ${three} | ${(three/total).toFixed(7) *100}%`)
    console.log(`Straight : ${straight} | ${(straight/total).toFixed(7) *100}%\nRoyal Straight : ${r_straight} | ${(r_straight/total).toFixed(7) *100}%\nFlush : ${flush} | ${(flush/total).toFixed(7) *100}%\nFull House : ${fullhouse} | ${(fullhouse/total).toFixed(7) *100}%\nFour of a kind : ${four} | ${(four/total).toFixed(7) *100}%\nStraight Flush : ${s_flush} | ${(s_flush/total).toFixed(7) *100}%\nRoyal Straight Flush : ${r_s_flush} | ${(r_s_flush/total).toFixed(7) *100}%.`)
 */}


export function waitRS() {
    let total = 0;
    for (let i = 0; i < 100; i++) {
        let subject = getDeck()
        let evals = evalRes(subject)
        let designres= design(subject)
        resChecker(evals)
        console.log(`Formated : ${designres} | ${evals}`)
        if (evals == '11. Royal Straight Flush') break;
        total++

        i = i-1;
    }

    let totalCons = new Prob('Total', total, total)
    totalCons.doTotalRes()
    let highP = new Prob('High Card', high, total)
    let oneP = new Prob('One Pair', one, total)
    let twoP = new Prob('Two Pair', two, total)
    let threeP = new Prob('Three of a kind', three, total)
    let straightP = new Prob('Straight', straight, total)
    let r_straightP = new Prob('Royal Straight', r_straight, total)
    let flushP = new Prob('Flush', flush, total)
    let fhouseP = new Prob('Full house', fullhouse, total)
    let fourP = new Prob('Four of a Kind', four, total)
    let s_fP = new Prob('Straight Flush', s_flush, total)
    let r_s_flushP = new Prob('Royal Straight Flush', s_flush, total)

    console.table([totalCons, highP, oneP, twoP, threeP, straightP, r_straightP, flushP, fhouseP, fourP, s_fP, r_s_flushP], ["Name", "totalRes", "prob"])
    console.log(`Done : ${total} Tries.`)
  /*   console.log(`Total : ${total}\nHigh Card : ${high} | ${(high/total).toFixed(7) *100}%\nOne Pair : ${one} | ${(one/total).toFixed(7) *100}%\nTwo Pair : ${two} | ${(two/total).toFixed(7) *100}%\nThree of a Kind : ${three} | ${(three/total).toFixed(7) *100}%`)
    console.log(`Straight : ${straight} | ${(straight/total).toFixed(7) *100}%\nRoyal Straight : ${r_straight} | ${(r_straight/total).toFixed(7) *100}%\nFlush : ${flush} | ${(flush/total).toFixed(7) *100}%\nFull House : ${fullhouse} | ${(fullhouse/total).toFixed(7) *100}%\nFour of a kind : ${four} | ${(four/total).toFixed(7) *100}%\nStraight Flush : ${s_flush} | ${(s_flush/total).toFixed(7) *100}%\nRoyal Straight Flush : ${r_s_flush} | ${(r_s_flush/total).toFixed(7) *100}%.`)
*/
} 
