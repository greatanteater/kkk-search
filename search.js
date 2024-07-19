const API_KEY = `ttbwsnah05200918001`;
let bookInfo = [];
let receivedISBN = "9788934942467";

function searchBooks() {
  const url = `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${API_KEY}&itemIdType=ISBN&ItemId=${receivedISBN}&Cover=Big&output=js&Version=20131101&OptResult=ebookList,usedList,reviewList&callback=displayResults`;

  $.ajax({
    url: url,
    jsonp: "displayResults",
    dataType: "jsonp",
  });
}

function displayResults(data) {
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
