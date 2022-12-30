// fetch("http://localhost:3000/weather?address=").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log({ error: data.error });
//     } else {
//       console.log(data.location);
//       console.log(data.forecast);
//     }
//   });
// });

const weatherForm = document.querySelector(".form-class");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // console.log("testing");
  // this won't work because of the script tag in the hbs file. to rectify the situation, you have to take the script tag in the hbs file to bottom of the body.

  // error: TypeError: Cannot read properties of null (reading 'addEventListener')

  // in addition, the error happens because the javacript file is loaded before the form even parsed. take note

  const location = search.value;
  const realLocation = location.toString();

  const renderLink = 'localhost:3000'

  fetch(`weather?address=${realLocation}`).then(
    // for heroku
    (response) =>
      response.json().then((data) => {
        // console.log(data.forecast);
        // console.log(data.location);
        setTimeout(() => {
          messageOne.textContent = "Loading...";
          setTimeout(() => {
            messageOne.textContent = "";
            setTimeout(() => {
              if (data.error) {
                messageOne.textContent = data.error;
              } else {
                result = `temperature: ${data.forecast.temperature}, weatherDescription: ${data.forecast.weatherDescription}`;
                console.log(result);
                messageOne.textContent = `location: ${data.location}`;
                messageTwo.textContent = result;
              }
            }, 500);
          }, 500);
        }, 500);
      })
  );
});
