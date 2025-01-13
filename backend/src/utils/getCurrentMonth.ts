const getCurrentMonth = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    return currentMonth;
}

export default getCurrentMonth;