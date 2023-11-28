import fs from "fs"
import { loginConfig } from "./config.js"
import { doSomethingLoop, gotoPage, login } from "./helpers.js"

/**
 *
 * @param {*} page
 * @returns {object{loadPage: function(url), doSomethingLoop: function(function, condition, ...args)}}
 */
export default async function Bot(page) {
  let cookies
  if (fs.existsSync(`./cookies/instagram.json`))
    cookies = JSON.parse(fs.readFileSync(`./cookies/instagram.json`))

  if (!cookies) login(loginConfig)
  page.setCookie(...cookies)
  console.log("InstaBot instantiated")
  page.goto(process.env.TEST_CHAT)

  return {
    loadPage: gotoPage,
    doSomethingLoop,
  }
}
