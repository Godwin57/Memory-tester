const getCardNumberByLevel = levelNum => levelNum * 6;

const generateRandomNum = range => Math.floor(Math.random() * range);

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
        return generatedItems;
    }

    function hard(array, cardsNum) {
        let groupItems = array.filter(obj => obj.uniqueName);
        return groupItems;
    }

    function medium(array, cardsNum) {
        let easyPart = easy(array, cardsNum / 2);
        return easyPart;
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