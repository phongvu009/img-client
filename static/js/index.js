const submitBtn = document.querySelector(".sbm-btn");
const iptImage = document.querySelector("#ipt-img");
const imgDisplay = document.querySelector("#img-preview");
const result = document.querySelector("#result");

const baseURL = "http://127.0.0.1:5000";
// using render server end-point
const baseURL = 'https://img-service.onrender.com'
let imgFile = "";

const fet = async (url, verb, data) => {
  const resp = await fetch(url, {
    method: verb,

    body: data,
  });
  const resp_data = await resp.json();
  return resp_data;
};
//  show the prediction result
const updateUI = (data) => {
  if (data.class) {
    // console.log(data.class)
    result.innerHTML = `<p>The prediction is : ${data.class} <p/>`;
  }
};

iptImage.addEventListener("change", (e) => {
  result.innerHTML = ``;
  // update the image  src tag to privew the image
  const imgPath = URL.createObjectURL(e.target.files[0]);
  // console.log(imgPath)
  imgDisplay.src = imgPath;

  //save the image object :

  // console.log(iptImage.files)
  // console.log( e.target.files[0].name)
  imgFile = e.target.files[0];
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const formData = new FormData();
  // !add name for the form
  if (imgFile !== "") {
    // console.log(imgFile)
    formData.append("img", imgFile);
    fet(baseURL + "/predict", "POST", formData)
      .then((data) => updateUI(data))
      .catch((e) => console.log(e));
  }
});
