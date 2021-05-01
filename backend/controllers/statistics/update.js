const updateQuantities = (duplicates, origin, property) => {
    let totalQuantity = 0
    for (let i = 0; i < duplicates.length; i++) {
        for (let j = 0; j < origin.length; j++) {
            if (duplicates[i][property] === origin[j][property]) {
                totalQuantity += origin[j].prod_quantity;
            }
        }
        duplicates[i].prod_quantity = totalQuantity
        totalQuantity = 0
    }
    return duplicates
}

const getOccurrence = (arr, value) => {
    return arr.filter(v => (v.table_number === value)).length
}

module.exports = { updateQuantities, getOccurrence }