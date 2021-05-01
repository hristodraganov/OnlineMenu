const findDuplicates = (arr, property) => {
    let duplicates = [],
        counts = {};
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i][property];
        counts[item] = counts[item] >= 1 ? counts[item] + 1 : 1;
        if (counts[item] === 2) {
            duplicates.push(arr[i]);
        }
    }
    return duplicates;
}
module.exports = findDuplicates