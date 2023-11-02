const getCardNumberByLevel = levelNum => levelNum * 6;

const generateRandomNum = range => Math.floor(Math.random() * range);


const shuffleArray = array => {
    let newArray = [],
        storeRandomNo = [];

    for (let i = 0; i < array.length; i++) {
        let random;
        do {
            random = generateRandomNum(array.length)
        } while (storeRandomNo.includes(random))

        newArray = newArray.concat(array[random]);
        storeRandomNo.push(random);
    }

    return newArray;
}

export const Difficulty = function () {
    function easy(array, cardsNum) {
        let generatedItems = [],
            randomNo;

        for (let i = 0; i < cardsNum; i++) {
            do {
                randomNo = generateRandomNum(array.length)
            } while (generatedItems.includes(array[randomNo]))
            generatedItems.push(array[randomNo]);
        }
        return shuffleArray(generatedItems);
    }

    // Returns an array of arrays with the inner array containing objects which have similar values of
    // the property which was passed in as the second argument
    class GroupingError extends Error { };
    function Grouper(array, prop) {
        const groupedObjects = new Map();
        array.forEach(obj => {
            const property = obj[`${prop}`];
            if (!property) throw new GroupingError("Where's the prop you want me to use?")
            if (!groupedObjects.has(property)) {
                groupedObjects.set(property, []);
            }
            groupedObjects.get(property).push(obj);
        })
        return Array.from(groupedObjects.values());
    }

    // Returns 1-dimensional arr from an arr of arrs. Removes extra elements when returned arr length > itemsLimit
    function getOneDimensionSimilarArray(array, itemsLimit) {
        let oneDimensionGroupedItems = [],
            storeRandomNum = [];

        for (; ;) {
            console.log("We move")
            if (oneDimensionGroupedItems.length >= itemsLimit) break;
            let randomNo;
            do {
                randomNo = generateRandomNum(array.length);
            } while (storeRandomNum.includes(randomNo))
            oneDimensionGroupedItems.push(...array[randomNo])
            storeRandomNum.push(randomNo);
        }

        while (oneDimensionGroupedItems.length > itemsLimit) oneDimensionGroupedItems.pop();
        return oneDimensionGroupedItems;
    }

    function hard(array, cardsNum) {
        const similarObj = array.filter(obj => obj.uniqueName),
            groupedItems = Grouper(similarObj, 'uniqueName');

        return shuffleArray(getOneDimensionSimilarArray(groupedItems, cardsNum));
    }

    function medium(array, cardsNum) {
        const easyPart = easy(array, cardsNum / 2),
            hardPart = hard(array, cardsNum / 2);
        return shuffleArray(easyPart.concat(hardPart));
    }

    return { easy, medium, hard }
}();

// console.log(Difficulty.medium([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 6));
// console.log(Difficulty.hard(animalEmojis))

/* 
Objective
    Accept an arrayList and the number of items to produce
Constraint
    No card can be repeated for the same level
Pseudo-code
    Accept an arrayList and the number of cards to produce from it
    Create an array to store the indexes of the array-items that have been produced
    Randomly select items to be selected. Store their index so they're not repeated.
*/