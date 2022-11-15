// console.log(import.meta.env.VITE_HAPPI_KEY);
const qrForm = document.querySelector('form');
const userData = document.querySelector('#qrTextInput');
const userSize = document.querySelector('#qrSizeInput');
const userBg = document.querySelector('#qrBgInput');
const userDot = document.querySelector('#qrDotsInput');

// Fetch the qr code with the api
async function fetchQrCode({ data, size, bg, dot }) {
	try {
		const response = await fetch(
			` https://api.happi.dev/v1/qrcode?data=${data}&width=${size}&dots=${dot}&bg=${bg}&apikey=${
				import.meta.env.VITE_HAPPI_KEY
			}`
		);
		return await response.json();
	} catch (err) {
		console.error(err.message);
	}
}

// Setup the QrCode
function setupQrCode(e) {
	e.preventDefault();
	// check if data input has a value
	if (userData.value.length === 0) {
		alert('please enter a valid URL');
		return;
	}

	// Format the data we want
	const dataObject = {
		data: userData.value,
		size: userSize.value,
		bg: userBg.value.slice(1),
		dot: userDot.value.slice(1)
	};

	// Display the generated qr code
	function displayQrCode(data) {
		// A simple helper to remove elements
		if (document.querySelector('.results'))
			document.querySelector('.results').remove();

		let qrWrapper = document.createElement('div');
		qrWrapper.classList = 'd-flex justify-content-center results';
		qrWrapper.innerHTML = ` <img src="${data?.qrcode}" class="img-fluid"/>`;

		qrForm.append(qrWrapper);
		// Reset the form data input here
		userData.value = '';
	}

	// Calling the data
	fetchQrCode(dataObject).then((fetchedData) => displayQrCode(fetchedData));
}

// Triggers when the form is submitted
qrForm.addEventListener('submit', (e) => setupQrCode(e));
