let browser = 'chrome'
const selenium_helpers = require('./selenium_helpers'),
    click_by_id = selenium_helpers.click_by_id,
    add_text_by_id = selenium_helpers.add_text_by_id,
    open_home_page = selenium_helpers.open_home_page,
    save_results = selenium_helpers.save_results,
    create_driver = selenium_helpers.create_driver;

const add_item_quantity = async (driver, itemName, itemQuantity) => {
    try {
        for (let j = 0; j < itemQuantity; j++) {
            await click_by_id(`${itemName}-increment`, driver)
        }
    } catch (e) {
        throw e
    }
}

const add_items_to_cart = async (driver, subcategory, data) => {
    let items = data.items
    try {
        for (let i = 0; i < items.length; i++) {
            await click_by_id(subcategory, driver)
            await add_item_quantity(driver, items[i].name, items[i].quantity)
            await click_by_id(`${items[i].name}-add-to-cart`, driver)
            await driver.navigate().back()
        }
    } catch (e) {
        throw e
    }
}

const add_items_to_order = async (driver, category, categoryName) => {
    try {
        await click_by_id(categoryName, driver, browser)
        for (let subcategory in category)
            await add_items_to_cart(driver, subcategory, category[subcategory])

        await driver.navigate().back()
    } catch (e) {
        throw e
    }
}
const navigate_to_cart = async (driver) => {
    try {
        await click_by_id('cart', driver)
    } catch (e) {
        throw e
    }
}
const add_comments = async (driver, data) => {
    let items = data.items
    try {
        for (let i = 0; i < items.length; i++)
            await add_text_by_id(items[i].comments, `${items[i].name}-comments`, driver)
    } catch (e) {
        throw e
    }
}
const add_comments_of_ordered_products = async (driver, data) => {
    let food = data.food
    let drinks = data.drinks
    try {
        for (let subcategory in food)
            await add_comments(driver, food[subcategory])

        for (let subcategory in drinks)
            await add_comments(driver, drinks[subcategory])
    } catch (e) {
        throw e
    }
}
const add_table_number = async (driver, data) => {
    try {
        await add_text_by_id(data, 'table-number', driver)
        await click_by_id('table-number-button', driver)
    } catch (e) {
        throw e
    }
}
const order = async (driver) => {
    await click_by_id('order', driver)
}
const test = async (driver, data) => {
    try {
        await open_home_page(driver)
        await add_table_number(driver, data.tableNumber)
        await add_items_to_order(driver, data.orderProducts.food, 'Food')
        await add_items_to_order(driver, data.orderProducts.drinks, 'Drinks')
        await navigate_to_cart(driver)
        await add_comments_of_ordered_products(driver, data.orderProducts)
        await order(driver)
        await driver.quit()
        await save_results('Orders', 'Passed successfully!')
        process.exit(0)
    } catch (e) {
        await driver.quit()
        await save_results('Orders', `Failed with error ${e}`)
        process.exit(1)
    }
}

const run = async (script_args) => {
    const data = require('./data/order_data.json')

    let browser_in_params = script_args.indexOf("browser");
    if (browser_in_params > -1 && script_args[browser_in_params + 1])
        browser = script_args[browser_in_params + 1];
    let head = script_args.indexOf('head')
    head !== -1 ? head = true : head = false
    try {
        let driver = create_driver(browser, head)
        await test(driver, data)
    } catch (e) {
        throw e
    }
}

module.exports = {
    run
}