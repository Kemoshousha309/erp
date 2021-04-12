export const getParam = (searchParam) => {
    const string = searchParam.replace("?key=", "");
    return string
}
