window.onload = fetchGuestBook_Entries();

var field = {
	Timestamp: "타임스탬프",
	Name: "이름",
	Email: "이메일",
	Guestbook_Entry: "남기고 싶은 말"	
}
function fetchGuestBook_Entries() {
// Fetching Spreadsheet JSON Data	
	fetch(
		`https://opensheet.elk.sh/${Google_Form_ID}/${Google_Form_Name}`
	)
	.then((res) => res.json())
	.then((data) => {
        // reversing JSON data to make things easier
		let sortedInput = (data.reverse())	
		/// Adding all entries to all entry section
		sortedInput.forEach((row) => {
			// Sanitize Data
			let SantizeName =  encodeHTML(row[field.Name])
			let SantizeResponses =  encodeHTML(row[field.Guestbook_Entry])

			// Split timestamp data
			var splitTime =  row[field.Timestamp]			
			document.getElementById("json").innerHTML += `
			<div class="entry">
				<div class="entry-info">
					<p><span class="author"> ${SantizeName}</span> | <span class="date">${splitTime}</span></p>
				</div>
				<div class="entry-text">
					<p>${SantizeResponses} </p>
				</div>
			</div>`		         
		});
    	});	
}

// On Submit - Validating Text Before Sending For Profanities
document.getElementById('gform').addEventListener("submit", (e) => {
	e.preventDefault();
	document.gform.submit();
	setTimeout(function() {
		Gform.setAttribute("style", "display:none;");  
		var subscribeForm = document.getElementById("SendForm")
		// Show the user message their entry has been added
		subscribeForm.innerHTML = `<h1 style="text-align: center;
			margin-top: 2em;">방명록이 추가되었습니다.<br>감사합니다.</h3>`
		subscribeForm.setAttribute("style", "-webkit-animation: fadeIn 1s; animation: fadeIn 1s;  animation-fill-mode: forwards;");  
	}, 500);
	return true
});

function encodeHTML(sanizitedInput) {
    return sanizitedInput.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}
