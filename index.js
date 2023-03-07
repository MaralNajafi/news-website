/* Mutal codes */
const API_URL =
  "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b918bb453f1340d4bb0d9eb17c37079d";

async function fetchNewsAPI() {
  const API_DATA = await fetch(API_URL);
  const API_DATA_JSON = await API_DATA.json();
  const NEWS_ARTICLES = API_DATA_JSON.articles;

  return NEWS_ARTICLES;
}

let newsListArray = [];
let newsID;
let bookmarkedNews = []; // IDs in local storage
let isBookmarked;

// DOM variables
const DOMnewsList = document.getElementById("newsList");
const DOMbookmarkedNewsList = document.getElementById("bookmarkedNewsList");
const DOMbookmarksCount = document.getElementById("bookmarksCount");

function setIDtoNews() {
  // API does not have unique numeric ID!!
  newsListArray.forEach((news) => {
    newsID++;
    news.id = newsID;
  });
}

function updateBookmark() {
  DOMbookmarksCount.innerHTML =
    bookmarkedNews.length > 9 ? "+9" : bookmarkedNews.length;
}

function updateBookmarksCountFromLocalStorage() {
  const localStorageBookmarks = localStorage.getItem("bookmarkedNewsIDList");
  bookmarkedNews = localStorageBookmarks
    ? localStorageBookmarks.split(",").map(Number)
    : [];
  updateBookmark();
}
