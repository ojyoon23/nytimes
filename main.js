let news = [];
let navbarMenus = document.querySelectorAll(".nav-bar button");
navbarMenus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByTopic(event))
);

let searchButton = document.getElementById("search-button");
let url;
const getURL = async () => {
  let header = new Headers({
    //"x-api-key": "5ajRmfTRgAmgtKgdW9YLBXW7JhXbhtalP4nPdlGt7OM",
    "x-api-key": "9f59e5d808ff4e5bb49c8ee92f191b8d",
  });

  let response = await fetch(url, { headers: header });
  let data = await response.json();
  news = data.articles;
  render();
};

const getLatestNews = async () => {
  url = new URL(
    //`https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business`
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=9f59e5d808ff4e5bb49c8ee92f191b8d`
  );
  getURL();
};

getLatestNews();

const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display == "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};

const getNewsByTopic = async (event) => {
  let topic = event.target.textContent.toLowerCase();
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&category=${topic}&apiKey=9f59e5d808ff4e5bb49c8ee92f191b8d`
  );

  getURL();
};

const getNewsByKeyword = async () => {
  //1.read the keyword
  //2. put keyword into url
  //3. header
  //4. bring url
  //5. get data
  //6. show data
  let keyword = document.getElementById("search-input").value.toLowerCase();
  console.log("keyword is", keyword);
  url = new URL(
    `https://newsapi.org/v2/everything?q=${keyword}&apiKey=9f59e5d808ff4e5bb49c8ee92f191b8d`
  );

  getURL();
};

const render = () => {
  let newsHTML = "";
  newsHTML = news
    .map((item) => {
      return `        <div class="row news">
      <div class="col-lg-2">
      <div>${
        //(moment(item.publishedAt) - moment()).valueOf() < 86400000
        moment().diff(moment(item.publishedAt), "minutes") < 1440
          ? moment(item.publishedAt).fromNow()
          : moment(item.publishedAt).format("MMM Do YY")
      }</div>
    </div>
  <div class="col-lg-7">
    <h2>${item.title.substring(0, item.title.indexOf("-"))}</h2>
    <p>${
      item.description == null || item.description == ""
        ? "No Description"
        : item.description.length > 200
        ? item.description.substring(0, 200) + " ..."
        : item.description
    }</p>
    <div>By ${item.author || "no author"} </div>
  </div>

  <!--image-->
  <div class="col-lg-3">
    <img
      class="news-img-size"
      src="${
        item.urlToImage ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
      }"
    />
  </div>
</div>`;
    })
    .join("");
  document.getElementById("news-board").innerHTML = newsHTML;
};

searchButton.addEventListener("click", getNewsByKeyword);
getLatestNews();
