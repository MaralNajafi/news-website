newsID = 0;
let bookmarkedNewsListArray = []; // bookmarked news

function UpdateDOMwithBookmarkedNews() {
  const bookmarked = bookmarkedNewsListArray
    .map((bookmarked) => {
      isBookmarked = bookmarkedNews.includes(bookmarked.id);
      return `
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
        `;
    })
    .join("");

  if (bookmarkedNewsListArray.length > 0) {
    DOMbookmarkedNewsList.innerHTML = bookmarked;
  } else {
    DOMbookmarkedNewsList.classList.add("empty-news-list");
    DOMbookmarkedNewsList.innerHTML = `
      <div>
        <span style="color: #7d7d7d;">No bookmarks yet</span>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  updateBookmarksCountFromLocalStorage();
  newsListArray = await fetchNewsAPI();
  setIDtoNews();
  bookmarkedNewsListArray = newsListArray.filter((news) => {
    return bookmarkedNews.includes(news.id);
  });

  UpdateDOMwithBookmarkedNews();
});
