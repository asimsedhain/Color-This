function uploadImage (element) {
	element.preventDefault();
	// This assumes the form's name is `myForm`
	var form = document.getElementById("form");
	var formData = new FormData(form);
	fetch('http://localhost:5000/upload', {
	  method: 'POST',
	  body: formData
	});
  }

  document.getElementById("formLogin").addEventListener("submit", uploadImage);

  