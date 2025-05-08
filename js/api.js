async function fetchEarthquakeData() {
  const url = "https://www.data.jma.go.jp/developer/xml/feed/eqvol.xml";
  const response = await fetch(url);
  const text = await response.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "application/xml");
  const items = [...xml.querySelectorAll("entry")];
  return items.map(item => ({
    title: item.querySelector("title").textContent,
    link: item.querySelector("link").getAttribute("href"),
    time: item.querySelector("updated").textContent
  }));
}
