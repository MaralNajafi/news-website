const API_URL = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b918bb453f1340d4bb0d9eb17c37079d";

async function fetchNewsAPI() {
  const API_DATA = await fetch(API_URL);
  const API_DATA_JSON = await API_DATA.json();
  const NEWS_ARTICLES = API_DATA_JSON.articles;

  return NEWS_ARTICLES;
}

let newsListArray = [];
let newsID = 0;

// DOM variables
const DOMnewsList = document.getElementById("newsList");
function setIDtoNews() {
  newsListArray.forEach(news => {
    newsID++
    news.id = newsID;
  })
}

function UpdateDOMwithNews() {
  setIDtoNews();
  const news = newsListArray.map(news => {
    return (
      `
        <a href="${news.url}" target="_blank" class="news-warpperLink d-block">
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
            <div class="news-footer d-flex">
              <button 
              class="add-favorite-btn d-block" 
              data-id="${news.id}"
              >
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                fill="var(--clr-primary)" 
                class="bi bi-bookmark" 
                viewBox="0 0 16 16"
                >
                  <path 
                  d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
                  />
                </svg>
              </button>
            </div>
          </li>
        </a>

      `
    )

  }).join("");

  DOMnewsList.innerHTML = news;
}

document.addEventListener("DOMContentLoaded", async () => {
  newsListArray = await fetchNewsAPI();
  UpdateDOMwithNews();
});