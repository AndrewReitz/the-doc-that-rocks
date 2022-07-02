import { faker } from "https://deno.land/x/deno_faker@v1.0.3/mod.ts"
import puppeteer from "https://deno.land/x/puppeteer@14.1.1/mod.ts"

const debug = false
const votes = 200

for (let vote = 0; vote < votes; vote++) {
    console.log(`Submitting Vote ${vote + 1}`)
    const randomEmail = faker.internet.email()

    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto("https://www.surveymonkey.com/r/Chandler2022")
        await page.click("button.next-button", {delay: 500})
        await page.waitForTimeout(1000)
        await page.type("input", randomEmail)

        for (let i = 0; i < 5; i++) {
            await page.waitForTimeout(1000)
            await page.click("button.next-button", {delay: 500})
        }

        await page.waitForTimeout(1000)
        await page.evaluate(() => {
            document.getElementById("73945004_593024480").checked = true
        })

        await page.waitForTimeout(1000)
        await page.click("button.next-button", {delay: 500})

        await page.waitForTimeout(1000)
        await page.click("button.done-button", {delay: 500})

        await browser.close()
    } catch(e: unknown) {
        console.log(`Error Casting Vote ${vote + 1}`)

        if (debug) {
            console.error(e)
        }
    }
}
