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
const open_orders_page = async (driver) => {
    try {
        await click_by_id('orders-button', driver)
    } catch (e) {
        throw e
    }
}
const query_by_date = async (driver, data) => {
    try {
        //FROM
        await add_text_by_id(Key.CONTROL + "a", 'date-from', driver)
        await add_text_by_id(Key.CLEAR, 'date-from', driver)
        await add_text_by_id(data.from, 'date-from', driver)
        //TO
        await add_text_by_id(Key.CONTROL + "a", 'date-to', driver)
        await add_text_by_id(Key.CLEAR, 'date-to', driver)
        await add_text_by_id(data.to, 'date-to', driver)

        await click_by_id('search-by-date', driver, browser)
    } catch (e) {
        throw e
    }
}
const query_by_table_number = async (driver, data) => {
    try {
        await add_text_by_id(data + Key.DOWN + Key.ENTER, 'table-number', driver)
        await click_by_id('search-by-table-number', driver, browser)
    } catch (e) {
        throw e
    }
}
const show_all = async (driver) => {
    try {
        await click_by_id('show-all', driver, browser)
    } catch (e) {
        throw e
    }
}
const test = async (driver, data, loginCredentials) => {
    try {
        await open_home_page(driver)
        await log_in_admin(driver, loginCredentials)
        await open_orders_page(driver)
        await query_by_date(driver, data)
        await query_by_table_number(driver, data.tableNumber)
        await show_all(driver)
        await driver.quit()
        await save_results('Orders query', 'Passed successfully!')
        process.exit(0)
    } catch (e) {
        await driver.quit()
        await save_results('Orders query', `Failed with error ${e}`)
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