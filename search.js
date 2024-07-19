function searchBooks() {
  console.log("검색 중입니다...");

  const query = document.getElementById("query").value;
  const apiKey = "ttbwsnah05200918001";
  const callbackName = `jsonpCallback_${Date.now()}`;
  const url = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${apiKey}&Query=${encodeURIComponent(
    query
  )}&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=JS&Version=20131101&callback=${callbackName}`;

  console.log(`Request URL: ${url}`); // URL 확인용 로그

  // JSONP 콜백 함수 정의
  window[callbackName] = function (data) {
    console.log("응답 받음");
    displayResults(data.item);
    // 콜백 함수 제거
    delete window[callbackName];
    document.body.removeChild(script); // script 태그 제거
  };

  // script 태그 생성 및 삽입
  const script = document.createElement("script");
  script.src = url;
  script.onerror = function () {
    console.error("Script load error");
    delete window[callbackName];
    document.body.removeChild(script); // script 태그 제거
  };
  document.body.appendChild(script);
}

function displayResults(books) {
  console.log(books);
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
