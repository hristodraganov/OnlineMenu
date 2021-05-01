const removeDuplicates = (arr, property) => {

    var clean = arr.filter((arr, index, self) =>
        index === self.findIndex((t) => (t[property] === arr[property])))
    return clean

}
module.exports = removeDuplicates