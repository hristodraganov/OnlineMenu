export const transformDataForPie = (data, type) => {
    if (type === 'products') {
        return data.map((item) => {
            return { name: item.prod_name, quantity: item.prod_quantity };
        });
    } else {
        return data.map(item => {
            return { table: 'Table '.concat(item.tableNumber), timesUsed: item.timesUsed }
        })
    }
}
export const transformDataForXYChart = (data, type) => {
    if (type === 'products') {
        return data.map(item => {
            return { name: item.prod_name, income: item.income }
        })
    } else {
        return data.map(item => {
            return { name: item.subCategoryName, sold: item.prod_quantity }
        })
    }
}