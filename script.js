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

var distance = function() {
  var x1 = parseFloat(document.getElementById("x1").value);
  var y1 = parseFloat(document.getElementById("y1").value);
  var x2 = parseFloat(document.getElementById("x2").value);
  var y2 = parseFloat(document.getElementById("y2").value);

  var outputParagraph = document.getElementById("outputParagraph");

  if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
    outputParagraph.textContent = "You entered bad input";
  } else {
    var d = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2).toFixed(2);

    outputParagraph.textContent =
      "The distance will show up here " + d + " units.";
  }
};