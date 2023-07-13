const form = document.forms["url-form"]
const submitBtn = document.getElementById("submit-btn");
const copyBtn = document.getElementById("copy-btn");
const resultContainer = document.getElementById("result-container");

const submitUrl = (e) => {
  e.preventDefault();
  let formData = e.target.url.value;

  submitBtn.innerText = "Slicing..."

  fetch("/", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      url: formData
    })
  })
  .then(res => res.json())
  .then(res => {
    resultContainer.value = res.url;
    submitBtn.innerText = "Slice Away!"
  });
}

const copyUrl = () => {
  let url = resultContainer.innerText
}

form.addEventListener("submit", submitUrl);
