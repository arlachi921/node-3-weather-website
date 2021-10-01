// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });

//js representation of an element
const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = searchElement.value;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                console.log(data.error);
            } else {
                messageOne.textContent = "📌 " + data.location;
                messageTwo.textContent = data.forecast;
                console.log(data.location);
                console.log(data.forecast);
            }
        });
    });
    //console.log(location);
});

//migrate fetch call into submit callback
