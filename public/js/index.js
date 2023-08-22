const form = document.forms["url-form"]
const submitBtn = document.getElementById("submit-btn");
const copyBtn = document.getElementById("copy-btn");
const resultContainer = document.getElementById("result-container");
const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

const validateUrl = (url) => {
  const validatedUrl = urlPattern.test(url);
  if(!validatedUrl) {
    return false;
  } else {
    return url;
  }
}


const submitUrl = (e) => {
  e.preventDefault();

  let formData = e.target.url.value;
  submitBtn.innerText = "Slicing..."
  copyBtn.innerText = "Copy"

  let validatedUrl = validateUrl(formData);

  if(!validatedUrl) {
    alert("Not a valid url.");
    submitBtn.innerText = "Slice Away!";
    e.target.url.value = '';
    return;
  }

  setTimeout(() => {
    fetch("/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        url: validatedUrl
      })
    })
    .then(res => res.json())
    .then(res => {
      resultContainer.value = res.url;
      submitBtn.innerText = "Slice Away!"
    })
    .catch(error => {
      console.log(error)
    });
  
  }, 1000);
  
}

const copyUrl = () => {
  let url = resultContainer.value
  copyBtn.innerText = "Copying...";
  setTimeout(() => {
    navigator.clipboard.writeText(url);
    copyBtn.innerText = "Copy";
  }, 1000)
}

form.addEventListener("submit", submitUrl);
copyBtn.addEventListener("click", copyUrl);
