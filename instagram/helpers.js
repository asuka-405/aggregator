export async function login({ page, fields, url, username, password }) {
  const { un_field, pw_field, btn_submit } = fields
  await page.goto(url, { waitUntil: "networkidle2" })
  await page.waitForSelector(un_field)
  await page.type(un_field, username)
  await page.type(pw_field, password)
  await page.click(btn_submit)
  await page.waitForNavigation({ waitUntil: "networkidle2" })
  cookies = await page.cookies()
  fs.writeFileSync(`./cookies/instagram.json`, JSON.stringify(cookies))
}

export async function gotoPage(url) {
  await this.page.goto(url, { waitUntil: "networkidle2" })
}

export async function doSomethingLoop(doSomething, condition, ...args) {
  const interval = setInterval(async () => {
    await doSomething(...args)
    if (condition) clearInterval(interval)
  }, 2000)
}
