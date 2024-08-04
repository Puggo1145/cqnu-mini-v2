export const getDate = (splitChar: "-" | "/" = "-") => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const transformedMonth = month > 9 ? month : '0' + month;
    const transformedDay = day > 9 ? day : '0' + day;
    return `${year}${splitChar}${transformedMonth}${splitChar}${transformedDay}`;
}

export const getCurrentTime = () => {
    const now: Date = new Date();
    let hours: number | string = now.getHours();
    let minutes: number | string = now.getMinutes();

    // 如果小时或分钟是个位数，则在前面补零
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes}`;
}