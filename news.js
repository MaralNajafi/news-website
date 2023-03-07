newsID = 0;

function UpdateDOMwithNews() {
  setIDtoNews();
  const news = newsListArray
    .map((news) => {
      isBookmarked = bookmarkedNews.includes(news.id);
      return `
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

  DOMnewsList.innerHTML = news;
  addEventListenerToBookmarkBtns();
}

function addEventListenerToBookmarkBtns() {
  const bookmarkBtns = document.querySelectorAll(".add-bookmark-btn");

  bookmarkBtns.forEach((bookmarkbtn) => {
    bookmarkbtn.addEventListener("click", (event) => {
      const bookmarkednNewsID = +event.target.closest("button").dataset.id;
      isBookmarked = bookmarkedNews.includes(bookmarkednNewsID);
      if (isBookmarked) {
        return;
      } else {
        addBookmark(bookmarkednNewsID);
        bookmarkbtn.firstElementChild.style.fill = "var(--clr-primary)";
        bookmarkbtn.disabled = true;
      }
    });
  });
}

function addBookmark(bookmarkednNewsID) {
  bookmarkedNews.push(bookmarkednNewsID);
  localStorage.setItem("bookmarkedNewsIDList", bookmarkedNews);
  updateBookmark();
}

document.addEventListener("DOMContentLoaded", async () => {
  updateBookmarksCountFromLocalStorage();
  newsListArray = await fetchNewsAPI();
  UpdateDOMwithNews();
});
