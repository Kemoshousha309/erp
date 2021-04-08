export const date = () =>{
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day =  new Date().getDate();
    const date = ` ${year} / ${month + 1} / ${day}`;
    return [date, year]
}