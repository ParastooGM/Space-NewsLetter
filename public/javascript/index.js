for (var i = 0; i < document.querySelectorAll(".b").length; i++) {
  document.querySelectorAll(".b")[i].addEventListener("click", function () {
    switch (this.id) {
      case "item1":
        if (
          document
            .querySelector("#Item1Description")
            .classList.contains("hidden")
        ) {
          document
            .querySelector("#Item1Description")
            .classList.remove("hidden");
        } else {
          document.querySelector("#Item1Description").classList.add("hidden");
        }
        break;

      case "item2":
        if (
          document
            .querySelector("#Item2Description")
            .classList.contains("hidden")
        ) {
          document
            .querySelector("#Item2Description")
            .classList.remove("hidden");
        } else {
          document.querySelector("#Item2Description").classList.add("hidden");
        }
        break;

      case "item3":
        if (
          document
            .querySelector("#Item3Description")
            .classList.contains("hidden")
        ) {
          document
            .querySelector("#Item3Description")
            .classList.remove("hidden");
        } else {
          document.querySelector("#Item3Description").classList.add("hidden");
        }
        break;

      default:
        console.log("Default");
    }
  });
}

setTimeout(() => {
  document.getElementById("img1").setAttribute("href", "images/image.jpg");
  document.getElementById("img2").setAttribute("href", "images/image2.jpg");
  document.getElementById("img3").setAttribute("href", "images/image3.jpg");
}, 5500);
