const generateRandomNumber = (maxValue = 1000) => {
    return Math.round(Math.random() * maxValue);
}

export default generateRandomNumber;