const generateRandomNum = range => Math.floor(Math.random() * range);

function randomlyBuildArr(arr, limit) {
    let generatedItems = [],
        randomNo;

    for (let i = 0; i < limit; i++) {
        do {
            randomNo = generateRandomNum(arr.length)
        } while (generatedItems.includes(arr[randomNo]))
        generatedItems.push(arr[randomNo]);
    }
    return generatedItems;
}

const shuffleArray = array => randomlyBuildArr(array, array.length);

export const Difficulty = function () {
    const easy = (array, cardsLimit) => shuffleArray(randomlyBuildArr(array, cardsLimit));

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