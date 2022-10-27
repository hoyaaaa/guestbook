window.onload = fetchGuestBook_Entries();

var field = {
  Timestamp: "타임스탬프",
  Name: "이름",
  Email: "이메일",
  Guestbook_Entry: "남기고 싶은 말",
};
function fetchGuestBook_Entries() {
  // Fetching Spreadsheet JSON Data
  fetch(`https://opensheet.elk.sh/${Google_Form_ID}/${Google_Form_Name}`)
    .then((res) => res.json())
    .then((data) => {
      // reversing JSON data to make things easier
      let sortedInput = data.reverse();
      /// Adding all entries to all entry section
      sortedInput.forEach((row) => {
        // Sanitize Data
        let SantizeName = encodeHTML(row[field.Name]);
        let SantizeResponses = encodeHTML(row[field.Guestbook_Entry]);

        // Split timestamp data
        var splitTime = row[field.Timestamp];
        document.getElementById("json").innerHTML += `
			<div class="entry">
				<div class="entry-info">
					<p><span class="author"> ${SantizeName}</span> | <span class="date">${splitTime}</span></p>
				</div>
				<div class="entry-text">
					<p>${SantizeResponses} </p>
				</div>
			</div>`;
      });
    });
}

// On Submit - Validating Text Before Sending For Profanities
document.getElementById("gform").addEventListener("submit", (e) => {
  //   document.gform.submit();
  setTimeout(function () {
    document.getElementById("gform").setAttribute("style", "display:none;");
    // Show the user message their entry has been added
    document.getElementById(
      "SendForm"
    ).innerHTML = `<h1 style="text-align: center;
			margin-top: 2em;">방명록 작성이 완료되었습니다.<br>감사합니다.</h1>
			<h3 style="text-align: center;
			margin-top: 2em;">시간이 소요될 수 있습니다. 새로고침 해주세요.</h3>`;
    document
      .getElementById("SendForm")
      .setAttribute(
        "style",
        "-webkit-animation: fadeIn 1s; animation: fadeIn 1s;  animation-fill-mode: forwards;"
      );
  }, 500);
  setTimeout(function () {
    document.location.replace("https://hoyaaaa.github.io/guestbook");
  }, 5000);
  return true;
});

function encodeHTML(sanizitedInput) {
  return sanizitedInput
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}
