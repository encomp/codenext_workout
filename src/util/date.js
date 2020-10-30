export function getDate() {
    const currentDate = new Date();
    return currentDate.getMonth() + 1 + "-" + currentDate.getDate() + "-" + currentDate.getFullYear();
}
