/**
 * 
 * @returns formattedTime 格式化的时间 HH:mm格式
 */
export const getCurrentTime = () => {
    let currentDate: Date = new Date();
    let hours: number = currentDate.getHours();
    let minutes: number = currentDate.getMinutes();
    let hoursString: string = hours < 10 ? '0' + hours : hours.toString();
    let minutesString: string = minutes < 10 ? '0' + minutes : minutes.toString();
    let formattedTime: string = hoursString + ':' + minutesString;
    return formattedTime;
}

/**
 * 
 * @returns formattedTime 格式化的日期 YYYY-MM-DD格式
 */
export const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const transformedMonth = month > 9 ? month : '0' + month;
    const transformedDay = day > 9 ? day : '0' + day;
    return `${year}-${transformedMonth}-${transformedDay}`;
}