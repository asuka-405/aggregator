import fs from "fs"

const Bot = async function ({ page, cookeFileName }) {
  let cookies

  if (!fs.existsSync("./cookies")) fs.mkdirSync("./cookies")
  if (fs.existsSync(`./cookies/${cookieFile}.json`))
    cookies = JSON.parse(fs.readFileSync(`./cookies/${cookieFile}.json`))
  if (!cookies) {
    await this.login({
      url: process.env.LOGIN_INSTA,
      username: process.env.UN_INSTA,
      password: process.env.PW_INSTA,
      fields: {
        un_field,
        pw_field,
        btn_submit,
      },
    })
  }
  page.setCookie(...cookies)

  return {
    cookies,
    page,
  }
}

export default class Bott {
  #cookies
  page
  cookieFile
  constructor(config) {
    const { page, cookieFile } = config
    this.cookieFile = cookieFile
    this.page = page
  }

  async instantiate({ un_field, pw_field, btn_submit }) {}
  async login({ url, username, password, fields }) {
    let page = this.page
    const { un_field, pw_field, btn_submit } = fields
    await page.goto(url, { waitUntil: "networkidle2" })
    await page.waitForSelector(un_field)
    await page.type(un_field, username)
    await page.type(pw_field, password)
    await page.click(btn_submit)
    await page.waitForNavigation({ waitUntil: "networkidle2" })
    this.#cookies = await page.cookies()
    fs.writeFileSync(
      `./cookies/${this.cookieFile}.json`,
      JSON.stringify(this.#cookies)
    )
  }

  async doSomethingLoop(doSomething, condition, ...args) {
    const interval = setInterval(async () => {
      await doSomething(...args)
      if (condition) clearInterval(interval)
    }, 2000)
  }

  async gotoPage(url) {
    await this.page.goto(url, { waitUntil: "networkidle2" })
  }
}
