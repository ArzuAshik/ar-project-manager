const numberList = [7, 8, 9, 10, 11];

const selectRandomElement = (list = numberList) => {
    const index = parseInt(Math.random() * (list.length - 1));
    return list[index];
};

export default selectRandomElement;