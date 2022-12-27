const puppeteer = require("puppeteer")

module.exports = class MediaFileExporter {
    mpfs_g = []

    constructor(intercept_flag = false, headless_flag) {
    }

    clean() {
        this.mpfs_g = []
    }

    async intercept_requests(web_link, filter, req_limit) {
        this.clean()
        const browser = await puppeteer.launch({headless: false, args: ["--no-sandbox", "--disable-site-isolation-trials"]})
        const req_count = 0
        const mpfs = []
        const page = await browser.newPage() 
        await page.goto(web_link)
        //const [btn] = await page.$x('//*[@id="oframeplayer"]/pjsdiv[15]/pjsdiv[1]/pjsdiv');
        //if(btn) await btn.click();
        const test = await page.evaluate('document.querySelector("#oframeplayer > pjsdiv:nth-child(3) > video").getAttribute("src")')
        let blob = await fetch(test.replace(':hls:manifest.m3u8', '')).then(r => r.blob());
        console.log(blob)
        //if(test) await browser.close()
        return blob
    } 
}
 