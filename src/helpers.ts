export function generateUniqueID() {
    return Math.floor(Math.random() * 4294967295) - 2147483648
}

export function timeInMs() {
    return Date.now()
}

export function dayInMs(){
    return 1000 * 60 * 60 * 24
}