const API_URL = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b918bb453f1340d4bb0d9eb17c37079d";

async function fetchNewsAPI() {
  const API_DATA = await fetch(API_URL);
  const API_DATA_JSON = await API_DATA.json();
  const NEWS_ARTICLES = API_DATA_JSON.articles;

  return NEWS_ARTICLES;
}

let newsListArray = [];
let newsID = 0;
let bookmarkedNews = [];
let isBookmarked;

// DOM variables
const DOMnewsList = document.getElementById("newsList");
const DOMbookmarksCount = document.getElementById("bookmarksCount");

function setIDtoNews() {
  newsListArray.forEach(news => {
    newsID++
    news.id = newsID;
  })
}

function UpdateDOMwithNews() {
  setIDtoNews();
  const news = newsListArray.map(news => {
    isBookmarked = bookmarkedNews.includes(news.id);
    return (
      `
      <li class="news d-flex flex-col">
        <a href="${news.url}" target="_blank">
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
            </a>
            <div class="news-footer d-flex">
              <button 
              class="add-bookmark-btn d-block" 
              data-id="${news.id}"
              >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill= ${isBookmarked ? "var(--clr-primary)" : "#ddd"} class="bi bi-bookmark-fill" viewBox="0 0 16 16">
              <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
            </svg>
              </button>
            </div>
          </li>
        

      `
    )

  }).join("");

  DOMnewsList.innerHTML = news;
  addEventListenerToBookmarkBtns();
}

function addEventListenerToBookmarkBtns() {
  const bookmarkBtns = document.querySelectorAll(".add-bookmark-btn");

  bookmarkBtns.forEach(bookmarkbtn =>{
    bookmarkbtn.addEventListener('click', (event) => {
      const bookmarkednNewsID = +event.target.closest("button").dataset.id;
      isBookmarked = bookmarkedNews.includes(bookmarkednNewsID);
      if (isBookmarked) {
        return
      }else{
        updateBookmarks(bookmarkednNewsID);
        event.target.closest("svg").style.fill = "var(--clr-primary)"
      }
    })
  })

}

function updateBookmarks(bookmarkednNewsID) {

    bookmarkedNews.push(bookmarkednNewsID);
    localStorage.setItem("bookmarkedNewsIDList", bookmarkedNews);
    DOMbookmarksCount.innerHTML = bookmarkedNews.length;

}


document.addEventListener("DOMContentLoaded", async () => {
  newsListArray = await fetchNewsAPI();
  const localStorageBookmarks = localStorage.getItem("bookmarkedNewsIDList");
  bookmarkedNews = localStorageBookmarks ?localStorageBookmarks.split(",").map(Number) : [];
  DOMbookmarksCount.innerHTML = bookmarkedNews.length;
  UpdateDOMwithNews();
});