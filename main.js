//const proxyUrl = "https://nytimes-ojyoon23.netlify.app/";
//const API_KEY = "";

let news = [];

let navbarMenus = document.querySelectorAll("#menu-list button");
navbarMenus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByTopic(event))
);

let searchButton = document.getElementById("search-button");
let url = new URL(`https://newsapi.org/v2/top-headlines?country=us`);

const getURL = async () => {
  try {
    let header = new Headers();
    header.append("x-api-key", API_KEY);
    //header.append("Access-Control-Allow-Origin", "*");
    let response = await fetch(url, { headers: header });
    let data = await response.json();

    if (response.status == 200) {
      if (data.totalResults == 0) {
        throw new Error("No results found");
      }
      console.log("What data im getting", data);
      news = data.articles;

      console.log(news);
      render();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log("Error is", error.message);
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(
    //`https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business`
    `https://newsapi.org/v2/top-headlines?country=us`
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
    `https://newsapi.org/v2/top-headlines?country=us&category=${topic}&pageSize=100`
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
  url = new URL(`https://newsapi.org/v2/everything?q=${keyword}`);

  getURL();
};

const searchNews = () => {
  let keyword = document.getElementById("search-input").value;
  page = 1;
  url = new URL(
    `https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`
  );
  getNews();
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

const errorRender = (message) => {
  let errorHTML = `<div class="alert alert-danger text-center" role="alert">
  ${message}
</div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};

searchButton.addEventListener("click", getNewsByKeyword);
getLatestNews();
