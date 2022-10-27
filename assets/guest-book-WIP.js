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
		for(var i = 0; i < 10 && i < sortedInput.length; i++) {
			// Split timestamp data
			var splitTime =  sortedInput[i][field.Timestamp]

			// Sanitize Data
			let SantizeName =  encodeHTML(sortedInput[i][field.Name]).replace(/[^\x00-\x7F]/g, "")
			let SantizeResponses =  encodeHTML(sortedInput[i][field.Guestbook_Entry]).replace(/[^\x00-\x7F]/g, "")

			// Add Entries To Main Section
			document.getElementById("json").innerHTML += `
				<div class="entry">
					<div class="entry-info">
						<p><span class="author"> ${SantizeName}</span> | <span class="date">${splitTime}</span></p>
					</div>
					<div class="entry-text">
						<p>${SantizeResponses} </p>
					</div>
				</div>`		
		}
	
		/// Adding all entries to all entry section
		data.forEach((row) => {
			// Sanitize Data
			let SantizeName =  encodeHTML(row[field.Name]).replace(/[^\x00-\x7F]/g, "")
			let SantizeResponses =  encodeHTML(row[field.Guestbook_Entry]).replace(/[^\x00-\x7F]/g, "")

			// Split timestamp data
			var splitTime =  row[field.Timestamp]			
			document.getElementById("AllEntries_Content").innerHTML += `
				<div class="entry">
					<div class="entry-info">
						<p><span class="author">${SantizeName}</span> | <span class="date">${splitTime}</span></p>
				</div>
				<div class="entry-text">
					<p>${SantizeResponses}</p>
				</div>
			</div>`          
		});
    });	
}

// On Submit - Validating Text Before Sending For Profanities
var Gform = document.getElementById("gform")
Gform.addEventListener('submit', (e) => {
	  validateRecaptcha();
})

// Validate Recaptcha
function validateRecaptcha() {
    var response = grecaptcha.getResponse();
    if (response.length === 0) {
         // if Captcha not passed - do no nothing. 
        return false;
    } else {
        return true;
    }
}

var response = grecaptcha.getResponse();
if (response.length === 0) { // if Captcha is not complete
	// do nothing
} else { // add values to guestbook
	document.gform.submit();
}
	// Timeout is needed for form to properly submit with animation
setTimeout(function() {
	// Hide the form values 
	Gform.setAttribute("style", "display:none;");  
	var subscribeForm = document.getElementById("SendForm")


	// Show the user message their entry has been added
	subscribeForm.innerHTML = `<a class="close" href="#">&times;</a>
	<h1 style="text-align: center;
	margin-top: 2em;">당신의 방명록이 추가되었습니다. 잠시 후 추가 될 예정입니다. 감사합니다.</h1>`   
}, 500);

function encodeHTML(sanizitedInput) {
    return sanizitedInput.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}
