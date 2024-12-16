import chromium from "@sparticuz/chromium";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import local_puppeteer from "puppeteer";

export const maxDuration = 20;
const isProduction = process.env.NODE_ENV === "production";
const CHROMIUM_EXECUTABLE_PATH =
  "https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar";

export async function POST(req: NextRequest) {
  const { siteUrl } = await req.json();

    const browser = await puppeteer.launch({
      args: isProduction ? chromium.args : puppeteer.defaultArgs(),
      defaultViewport: chromium.defaultViewport,
      executablePath:
        process.env.CHROME_EXECUTABLE_PATH || (await chromium.executablePath(CHROMIUM_EXECUTABLE_PATH)),
    });

  // let browser;

  // if (isProduction) {
  //   browser = await puppeteer.launch({
  //     args: chromium.args,
  //     defaultViewport: chromium.defaultViewport,
  //     executablePath: await chromium.executablePath(CHROMIUM_EXECUTABLE_PATH),
  //   });
  // } else {
  //   browser = await local_puppeteer.launch({
  //     args: local_puppeteer.defaultArgs(),
  //   });
  // }

  const page = await browser.newPage();
  await page.goto(siteUrl);
  const pageTitle = await page.title();
  await browser.close();

  return NextResponse.json(
    {
      pageTitle,
    },
    { status: 200 }
  );
}
