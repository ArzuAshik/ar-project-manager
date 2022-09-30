const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getCurrentDate = () => {
    const date = new Date();
    return `${date.getDate()} ${monthList[date.getMonth()]} ${date.getFullYear()}`
}

export default getCurrentDate;