var onConvertClick = function() {
  var miles = document.getElementById("miles").value;
  var outputParagraph = document.getElementById("outputParagraph");

  if (isNaN(miles)) {
    outputParagraph.innerHTML = "Sorry, you didn't enter a number.";
  } else {
    var kilo = 1.60934 * parseFloat(miles);

    outputParagraph.innerHTML = "Kilometers = " + kilo + " km.";
  }
};
