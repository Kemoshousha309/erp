export const date = () =>{
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day =  new Date().getDate();
    const date = ` ${day} / ${month + 1} / ${year}`;
    return [date, year]
}
export const formatDate = (rawDate, type) => {
    const year = new Date(rawDate).getFullYear();
    const month = new Date(rawDate).getMonth();
    const day =  new Date(rawDate).getDate();
    const seconds =  new Date(rawDate).getSeconds();
    let hours = new Date(rawDate).getHours();
    let time = null
    if(type === 12){
    if(hours > 0 && hours < 12){
        time = "AM"
    }else if(hours === 0){
        time = "AM"
        hours = 12
    }
    else if(hours === 12){
        time = "PM"
    }
    else{
        time = "PM"
        hours = hours - 12
    }
    }
    const minutes =  new Date(rawDate).getMinutes();
    const date = ` ${day} / ${month + 1} / ${year}    ${hours}:${minutes}:${seconds} ${time ? time : ""}`;
    return rawDate ? date : ""
}


// "2014-09-08T08:02:17-05:00" (ISO 8601, no fractional seconds)
// "Sunday, February 14th 2010, 3:25:50 pm"
// "Sun, 3PM"
// "Today is Sunday"
