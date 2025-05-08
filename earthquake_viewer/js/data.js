const maxHistory = 50;
let historyData = [];

function addHistory(item) {
  if (historyData.length >= maxHistory) historyData.pop();
  historyData.unshift(item);
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById("history-list");
  list.innerHTML = "";
  historyData.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = item.title + " - " + new Date(item.time).toLocaleString();
    const btn = document.createElement("button");
    btn.textContent = "再現";
    btn.onclick = () => simulateQuake(item);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function downloadHistory() {
  const text = historyData.map(i => `${i.title} (${i.time})`).join("\n");
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "earthquakes.txt";
  a.click();
}
