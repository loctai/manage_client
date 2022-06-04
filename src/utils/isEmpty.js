function isEmpty(obj) {
    return JSON.stringify(obj) === JSON.stringify({});
}

export default isEmpty;