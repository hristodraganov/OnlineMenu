const MAX_TIMEOUT = 20000;
const webdriver = require("selenium-webdriver"),
    By = webdriver.By,
    until = webdriver.until,
    Key = webdriver.Key;
const chrome = require("selenium-webdriver/chrome");
const path = require("chromedriver").path;
chrome.setDefaultService(new chrome.ServiceBuilder(path).build());


const open_home_page = async (driver) => {
    try {
        await driver.get('http://localhost:3000')
    } catch (e) {
        throw e
    }
}
const save_results = async (type, text) => {
    const fs = require("fs");
    const path = require('path')
    try {
        let filePath = path.join(process.cwd(), 'result', `test-${type}-${Date.now()}.txt`)
        fs.writeFileSync(filePath, text);
    } catch (e) {
        console.log('Could not write to file.', e);
        process.exit(1)
    }
};

const click_by_id = async (element_id, driver, browser = "ff") => {
    try {
        let element = await driver.wait(until.elementLocated(By.id(element_id)), MAX_TIMEOUT)
        if (browser === 'chrome')
            await driver.executeScript('arguments[0].click();', element)
        else
            await element.click()
    } catch (e) {
        console.log(e);
    }
};
const add_text_by_id = async (data, field, driver) => {
    if (data) {
        try {
            let element = await driver.wait(until.elementLocated(By.id(field)), MAX_TIMEOUT);
            if (Array.isArray(data)) {
                data.map(async (item) => {
                    await element.sendKeys(item);
                });
            } else {
                await element.sendKeys(data);
            }
        } catch (e) {
            throw e;
        }
    }
};
const create_driver = (browser = "chrome", head) => {
    let driver = null;
    if (browser === "chrome") {
        let options = new chrome.Options();
        if (!head)
            options.headless();
        // options.setChromeBinaryPath(chromium.path);
        options.windowSize({ width: 1920, height: 1080 });

        driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .forBrowser("chrome")
            .setChromeOptions(options)
            .build();
    } else {
        driver = new webdriver.Builder().forBrowser("firefox").build();
    }
    return driver;
};


module.exports = {
    save_results,
    click_by_id,
    add_text_by_id,
    create_driver,
    open_home_page,
    Key
}