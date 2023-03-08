newsID = 0;
let bookmarkedNewsListArray = []; // bookmarked news

function UpdateDOMwithBookmarkedNews() {
  const bookmarked = bookmarkedNewsListArray
    .map((bookmarked) => {
      isBookmarked = bookmarkedNews.includes(bookmarked.id);
      return `
        <li class="news d-flex flex-col" data-id="${bookmarked.id}">
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
    addEventListenerToBookmarkBtns();
  } else {
    DOMbookmarkedNewsList.classList.add("empty-news-list");
    DOMbookmarkedNewsList.innerHTML = `
      <div>
        <span style="color: #7d7d7d;">No bookmarks yet</span>
      </div>
    `;
  }
}

function addEventListenerToBookmarkBtns() {
  const bookmarkBtns = document.querySelectorAll(".add-bookmark-btn");
  const DOMbookmarkedNewsLists = document.querySelectorAll(".news");

  bookmarkBtns.forEach((bookmarkBtn) => {
    bookmarkBtn.addEventListener("click", (event) => {
      const bookmarkedNewsID = +event.target.closest("button").dataset.id;
      const toBeRemoved = Array.from(DOMbookmarkedNewsLists).find(
        (item) => +item.dataset.id === bookmarkedNewsID
      );
      console.log(toBeRemoved);
      toBeRemoved.classList.add("deleted-news");

      function unBookmark() {
        isBookmarked = bookmarkedNews.includes(bookmarkedNewsID);
        if (isBookmarked) {
          bookmarkBtn.firstElementChild.style.fill = "#ddd";
          const delIndex = bookmarkedNews.findIndex(
            (item) => item === bookmarkedNewsID
          );
          removeBookmark(delIndex);
          updateBookmarkedNewsListArray();
          UpdateDOMwithBookmarkedNews();
          return;
        }
      }

      //waiting for the opacity transition to end
      setTimeout(unBookmark, 510); //How can I use "transitioned eventListener" instead???
    });
  });
}

function updateBookmarkedNewsListArray() {
  bookmarkedNewsListArray = newsListArray.filter((news) => {
    return bookmarkedNews.includes(news.id);
  });
}

function removeBookmark(delIndex) {
  bookmarkedNews.splice(delIndex, 1);
  localStorage.setItem("bookmarkedNewsIDList", bookmarkedNews);
  updateBookmark();
}

document.addEventListener("DOMContentLoaded", async () => {
  updateBookmarksCountFromLocalStorage();
  newsListArray = await fetchNewsAPI();
  setIDtoNews();
  updateBookmarkedNewsListArray();
  UpdateDOMwithBookmarkedNews();
});
