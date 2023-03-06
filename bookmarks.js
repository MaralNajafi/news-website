const API_URL = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b918bb453f1340d4bb0d9eb17c37079d";

async function fetchNewsAPI() {
    const API_DATA = await fetch(API_URL);
    const API_DATA_JSON = await API_DATA.json();
    const NEWS_ARTICLES = API_DATA_JSON.articles;

    return NEWS_ARTICLES;
}

let newsID = 0;
let newsListArray = [];
let bookmarkedNews = []; // IDs in local storage
let isBookmarked;
let bookmarkedNewsListArray = [] // bookmarked news

// DOM variables
const DOMbookmarkedNewsList = document.getElementById("bookmarkedNewsList");
const DOMbookmarksCount = document.getElementById("bookmarksCount");

function setIDtoNews() { // the API does't have numeric unique ID
    newsListArray.forEach(news => {
        newsID++
        news.id = newsID;
    })
}

function UpdateDOMwithBookmarkedNews() {
    
    const bookmarked = bookmarkedNewsListArray.map(bookmarked => {
        
        isBookmarked = bookmarkedNews.includes(bookmarked.id);
        return (
            `
        <li class="news d-flex flex-col">
          <a href="${bookmarked.url}" target="_blank">
            <div class="news-img">
              <img
                src="${bookmarked.urlToImage}"
                alt="${bookmarked.title}"
              />
            </div>
            <div class="news-body">
              <h3 class="news-title">${bookmarked.title}</h3>
              <p class="news-description">
              ${bookmarked.description}
              </p>
            </div>
          </a>
          <div class="news-footer d-flex">
            <button 
            class="add-bookmark-btn d-block" 
            data-id="${bookmarked.id}"
            ${isBookmarked ? "disabled" : ""}
            >
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            fill= ${isBookmarked ? "var(--clr-primary)" : "#ddd"} 
            class="bi bi-bookmark-fill" 
            viewBox="0 0 16 16">
              <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
            </svg>
            </button>
          </div>
        </li>
        `
        )

    }).join("");

    DOMbookmarkedNewsList.innerHTML = bookmarked;
}


document.addEventListener("DOMContentLoaded", async () => {
    newsListArray = await fetchNewsAPI();
    setIDtoNews();
    const localStorageBookmarks = localStorage.getItem("bookmarkedNewsIDList");
    bookmarkedNews = localStorageBookmarks ? localStorageBookmarks.split(",").map(Number) : [];
    DOMbookmarksCount.innerHTML = bookmarkedNews.length;
    bookmarkedNewsListArray = newsListArray.filter((news) => {
        return bookmarkedNews.includes(news.id);
      });

    UpdateDOMwithBookmarkedNews();
});


