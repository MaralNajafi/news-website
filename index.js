const API_URL = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b918bb453f1340d4bb0d9eb17c37079d";

async function fetchNewsAPI() {
  const API_DATA = await fetch(API_URL);
  const API_DATA_JSON = await API_DATA.json();
  const NEWS_ARTICLES = API_DATA_JSON.articles;

  return NEWS_ARTICLES;
}

let newsListArray = [];

// DOM variables
const DOMnewsList = document.getElementById("newsList");

function UpdateDOMwithNews() {
  console.log(newsListArray);
  const news = newsListArray.map(news => {
    return (
      `
            <li class="news d-flex flex-col">
            <div class="news-img">
              <img
                src="${news.urlToImage}"
                alt="${news.title}"
              />
            </div>
            <div class="news-body">
              <h3 class="news-title">${news.title}</h3>
              <p class="news-description">
              ${news.description}
              </p>
            </div>
            <div class="news-footer">
                <button class="read-more-btn d-block">
                  <a href="${news.url}" class="hw-100">read more</a>
                </button>
            </div>
          </li>

            `
    )

  }).join("")

  DOMnewsList.innerHTML = news;
}

document.addEventListener("DOMContentLoaded", async () => {
  newsListArray = await fetchNewsAPI();
  UpdateDOMwithNews();
});