
const replaceDuplicates = (origin, duplicates, property) => {
    for (let i = 0; i < duplicates.length; i++) {
        var index = findElement(origin, property, duplicates[i][property])
        origin[index] = duplicates[i]
    }
    return origin
}

const findElement = (arr, propName, propValue) => {
    for (var i = 0; i < arr.length; i++)
        if (arr[i][propName] == propValue)
            return i;
}

module.exports = replaceDuplicates