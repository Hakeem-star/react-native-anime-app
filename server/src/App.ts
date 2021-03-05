import puppeteer from "puppeteer";
import fs from "fs";

// Use Xpath to select by text content
// https://riptutorial.com/xpath/example/6209/find-all-elements-with-certain-text
// $x("//*[contains(text(), 'expression')]");
// https://stackoverflow.com/questions/48448586/how-to-use-xpath-in-chrome-headlesspuppeteer-evaluate

let foundEpisodes: (string | null)[];

async function getEpisodes() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://onepace.net");
  await page.waitForSelector(".torrent-link", { visible: true });
  await page.screenshot({ path: "loaded.png" });

  foundEpisodes = await page.evaluate(() => {
    const links = document.querySelectorAll("tr td:first-child a");
    let episodes = Array.from(links).map((v) => {
      return v.textContent;
    });
    return episodes;
  });

  await browser.close();
}

//compare to last time
const previousScrape = "./previousScrape.txt";
getEpisodes().then(() => {
  try {
    if (fs.existsSync(previousScrape)) {
      fs.readFile("./previousScrape.txt", "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const previousScrapeArray = data.split(",\n");

        const newEps = foundEpisodes.filter((val) => {
          return val ? !previousScrapeArray.includes(val) : false;
        });

        console.log({ newEps });
      });
    }
    //file does exist - make file then leave
    const file = fs.createWriteStream("previousScrape.txt");
    file.on("error", function (err) {
      console.error(err);
    });

    file.write(foundEpisodes.join(",\n"));
    file.end();
  } catch (err) {}

  return foundEpisodes;
});
