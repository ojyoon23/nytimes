let news = [];

const getLatestNews = async () => {
  let url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business`
  );
  let header = new Headers({
    "x-api-key": "5ajRmfTRgAmgtKgdW9YLBXW7JhXbhtalP4nPdlGt7OM",
  });

  let response = await fetch(url, { headers: header });
  let data = await response.json();
  news = data.articles;
};

getLatestNews();

const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};
