let browser = 'chrome'
const selenium_helpers = require('./selenium_helpers'),
    click_by_id = selenium_helpers.click_by_id,
    add_text_by_id = selenium_helpers.add_text_by_id,
    open_home_page = selenium_helpers.open_home_page,
    save_results = selenium_helpers.save_results,
    Key = selenium_helpers.Key,
    create_driver = selenium_helpers.create_driver;


const log_in_admin = async (driver, data) => {
    try {
        await driver.get('http://localhost:3000/admin')
        await add_text_by_id(data.username, 'username', driver)
        await add_text_by_id(data.password, 'password', driver)
        await click_by_id('login-button', driver)
    } catch (e) {
        throw e
    }
}
const open_reports_page = async (driver) => {
    try {
        await click_by_id('reports-button', driver)
    } catch (e) {
        throw e
    }
}
const query_most_sold_products = async (driver, data) => {
    try {
        //FROM
        await add_text_by_id(Key.CONTROL + "a", 'product-from', driver)
        await add_text_by_id(Key.CLEAR, 'product-from', driver)
        await add_text_by_id(data.from, 'product-from', driver)
        //TO
        await add_text_by_id(Key.CONTROL + "a", 'product-to', driver)
        await add_text_by_id(Key.CLEAR, 'product-to', driver)
        await add_text_by_id(data.to, 'product-to', driver)

        await click_by_id('search-by-product', driver)
    } catch (e) {
        throw e
    }
}
const query_most_popular_table = async (driver, data) => {
    try {
        //FROM
        await add_text_by_id(Key.CONTROL + "a", 'table-from', driver)
        await add_text_by_id(Key.CLEAR, 'table-from', driver)
        await add_text_by_id(data.from, 'table-from', driver)
        //TO
        await add_text_by_id(Key.CONTROL + "a", 'table-to', driver)
        await add_text_by_id(Key.CLEAR, 'table-to', driver)
        await add_text_by_id(data.to, 'table-to', driver)

        await click_by_id('search-by-table', driver)
    } catch (e) {
        throw e
    }
}
const query_overall_food = async (driver) => {
    try {
        await click_by_id('food', driver, browser)
        await click_by_id('search-overall', driver, browser)
    } catch (e) {
        throw e
    }
}
const query_overall_drinks = async (driver) => {
    try {
        await click_by_id('drinks', driver, browser)
        await click_by_id('search-overall', driver, browser)
    } catch (e) {
        throw e
    }
}
const query_overall_income = async (driver) => {
    try {
        await click_by_id('income', driver, browser)
        await click_by_id('search-overall', driver, browser)
    } catch (e) {
        throw e
    }
}
const query_overall = async (driver) => {
    try {
        await query_overall_food(driver)
        await query_overall_drinks(driver)
        await query_overall_income(driver)
    } catch (e) {
        throw e
    }
}
const test = async (driver, data, loginCredentials) => {
    try {
        await open_home_page(driver)
        await log_in_admin(driver, loginCredentials)
        await open_reports_page(driver)
        await query_most_sold_products(driver, data)
        await query_most_popular_table(driver, data)
        await query_overall(driver)
        await driver.quit()
        await save_results('Reports', 'Passed successfully!')
        process.exit(0)
    } catch (e) {
        await driver.quit()
        await save_results('Reports', `Failed with error ${e}`)
        process.exit(1)
    }
}

const run = async (script_args) => {
    const data = require('./data/query_data.json')
    const loginCredentials = require('./data/login_credentials.json')
    let browser_in_params = script_args.indexOf("browser");
    if (browser_in_params > -1 && script_args[browser_in_params + 1])
        browser = script_args[browser_in_params + 1];
    let head = script_args.indexOf('head')
    head !== -1 ? head = true : head = false
    try {
        let driver = create_driver(browser, head)
        await test(driver, data, loginCredentials)
    } catch (e) {
        throw e
    }
}

module.exports = {
    run
}