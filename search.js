async function searchBooks() {
  console.log("검색한다");
  const query = document.getElementById("query").value;
  const apiKey = "ttbwsnah05200918001";
  const url = `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${apiKey}
  &Query=${encodeURIComponent(query)}&QueryType=Title&MaxResults=10
  &start=1&SearchTarget=Book&output=JS&Version=20131101`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayResults(data.item);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
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
