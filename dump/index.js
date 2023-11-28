import fs from "fs"
import { JSDOM } from "jsdom"
import serialize from "w3c-xmlserializer"
import Bot from "../bot.js"

export default class InstaBot extends Bot {
  currentMessagesLength = 0
  constructor(config) {
    config.cookieFile = "insta"
    super(config)
  }
  async instantiate() {
    await super.instantiate({
      un_field: "input[name='username']",
      pw_field: "input[name='password']",
      btn_submit: "button[type='submit']",
    })
    console.log("InstaBot instantiated")
    this.gotoPage(process.env.TEST_CHAT)
    await this.doSomethingLoop(
      this.extractNewMessagesFromPage,
      true,
      this.page,
      process.env.TEST_CHAT_LABEL
    )
  }

  async extractNewMessagesFromPage(page, containerLabel) {
    const chatContainer =
      'div[role="grid"][aria-label="' +
      containerLabel +
      '"] > div > div > div > div'
    await page.waitForSelector(chatContainer)
    console.log("extracting new messages")

    let dom = await page.evaluate(async (container) => {
      const chatContainer = document.querySelector(container)
      return chatContainer.innerHTML
    }, chatContainer)
    dom = new JSDOM(dom).window.document.body
    const chat = dom.querySelector("div > .x1n2onr6")
    const serializedChat = serialize(chat, { requireWellFormed: true })

    const regex = />([^<]*)</g
    let matches = serializedChat.match(regex)

    matches = matches.filter((match) => {
      if (!match.match(/>\s*</g)) return match
    })
    matches = matches.map((match) =>
      match.replace(/^>/g, "").replace(/<$/g, "")
    )
    console.log(matches)
    if (this.currentMessagesLength === matches.length) return []
    this.currentMessagesLength = matches.length
    console.log(matches)
    return matches
  }
}
