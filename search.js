function searchBooks() {
  const query = $("#query").val();
  const apiKey = "ttbj01022761248001";
  const url = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${apiKey}
    &Query=${encodeURIComponent(query)}&QueryType=Title&MaxResults=10
    &start=1&SearchTarget=Book&output=JS&Version=20131101`;

  $.ajax({
    url: url,
    type: "GET",
    dataType: "jsonp", // JSONP를 사용할 경우, dataType을 jsonp로 설정해야 함
    success: function (data) {
      console.log("API 응답:", data); // API 응답을 콘솔에 출력하여 확인
      if (data && data.item) {
        displayResults(data.item);
      } else {
        console.error("API 응답에 item 필드가 없습니다.");
      }
    },
    error: function (xhr, status, error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    },
  });
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
