

let lastTimer = null
export const timer = (thisK) => {
    var timerId = setTimeout(() => {
        thisK.setState({message: false})
    }, 3000);

    if(!(lastTimer === timerId)){
        if(lastTimer){
            clearTimeout(lastTimer)
        }   
    }
    lastTimer = timerId
}

export  const trigerEnterButton = (id, func) => {
    const input = document.getElementById(id);
    input.addEventListener("keyup", event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            input.blur()
            func()
        }
    });
}

