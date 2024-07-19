$(document).ready(function () {
  console.log("캬캬캬2");
  $("#searchButton").on("click", function () {
    const query = $("#query").val();
    const apiKey = "ttbwsnah05200918001";
    const url = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${apiKey}&Query=${encodeURIComponent(
      query
    )}&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=JS&Version=20131101&callback=?`;

    $.ajax({
      url: url,
      dataType: "jsonp",
      success: function (data) {
        console.log("응답 받음", data);
        displayResults(data.item);
      },
      error: function (xhr, status, error) {
        console.error("요청 실패", status, error);
      },
    });
  });

  function displayResults(books) {
    console.log(books);
    const resultsDiv = $("#results");
    resultsDiv.empty(); // 이전 결과 초기화

    if (books && books.length > 0) {
      books.forEach((book) => {
        const bookDiv = $("<div>").addClass("book");

        const bookImg = $("<img>")
          .attr("src", book.cover)
          .attr("alt", book.title);

        const bookInfo = $("<div>");
        const bookTitle = $("<h3>").text(book.title);

        bookInfo.append(bookTitle);
        bookDiv.append(bookImg);
        bookDiv.append(bookInfo);
        resultsDiv.append(bookDiv);
      });
    } else {
      resultsDiv.text("검색 결과가 없습니다.");
    }
  }
});
