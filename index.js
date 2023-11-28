"use-strict"
import dotenv from "dotenv"
import puppeteer from "puppeteer"

import InstaBot from "./instagram/index.js"
dotenv.config()

const browser = await puppeteer.launch()
const page = await browser.newPage()
const instaBot = await new InstaBot({ page })
instaBot.instantiate()
