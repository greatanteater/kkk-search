const API_KEY = `ttbwsnah05200918001`;
let bookInfo = [];
let receivedISBN = "9788934942467";
let aaaaa = `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${API_KEY}&Query=aladdin&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=xml&Version=20131101&callback=displayResults`;

function searchBooks() {
  const url = `https://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${API_KEY}&itemIdType=ISBN&ItemId=${receivedISBN}&Cover=Big&output=js&Version=20131101&OptResult=ebookList,usedList,reviewList&callback=displayResults`;
  const url1 = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttbwsnah05200918001&Query=bonobono&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101&OptResult=ebookList,usedList,fileFormatList&callback=displayResults`;

  $.ajax({
    url: url1,
    jsonp: "displayResults",
    dataType: "jsonp",
  });
}

function displayResults(data) {
  console.log("뭐하냐");
  console.log(data);
  const books = data.item;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // Clear previous results

  if (books && books.length > 0) {
    books.forEach((book) => {
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("book");

      const bookImg = document.createElement("img");
      bookImg.src = book.cover;
      bookImg.alt = book.title;

      const bookInfo = document.createElement("div");
      const bookTitle = document.createElement("h3");
      bookTitle.textContent = book.title;

      bookInfo.appendChild(bookTitle);
      bookDiv.appendChild(bookImg);
      bookDiv.appendChild(bookInfo);
      resultsDiv.appendChild(bookDiv);
    });
  } else {
    resultsDiv.textContent = "검색 결과가 없습니다.";
  }
}
