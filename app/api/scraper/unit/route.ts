import chromium from "@sparticuz/chromium";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import local_puppeteer from "puppeteer";

export const maxDuration = 20;
const isProduction = process.env.NODE_ENV === "production";
const CHROMIUM_EXECUTABLE_PATH =
  "https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar";
const TAILWIND_CDN =
  "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const ReactDOMServer = (await import("react-dom/server")).default;
  const module = await import("@/app/components/info-card");
  const htmlTemplate = ReactDOMServer.renderToStaticMarkup(
    module.default(body)
  );

  const browser = await puppeteer.launch({
    args: isProduction ? chromium.args : puppeteer.defaultArgs(),
    defaultViewport: chromium.defaultViewport,
    executablePath:
      process.env.CHROME_EXECUTABLE_PATH ||
      (await chromium.executablePath(CHROMIUM_EXECUTABLE_PATH)),
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

  await page.setContent(await htmlTemplate);
   // Add Tailwind CSS
   await page.addStyleTag({
    url: TAILWIND_CDN,
});
  const screenshot: Uint8Array<ArrayBufferLike> = await page.screenshot();
  await browser.close();

  const buffer = Buffer.from(screenshot);
  const ssBlob = new Blob([buffer], { type: "image/png" });

  const response = new NextResponse(ssBlob, {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": "inline; filename=screenshot.png",
    },
    status: 200,
  });

  return response;
}
