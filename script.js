

var api = (function () {

  let workingHours = ["9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
  let currentHour = moment().format("H");
  let currentDay = moment().format("dddd, MMMM Do YYYY");

  function init() {
    updateCurrentDay();
    decideIfItsAnewDay();
    generateTiles();
    saveData();
  }

  function updateCurrentDay() {
    $('#currentDay').text(currentDay);
  }

  function decideIfItsAnewDay() {
    console.log(currentDay);
    // In case it's a new day we'd want to clear the results.
    if (localStorage.getItem("today") != currentDay) {
      localStorage.clear(); // This is a new day, clear the results
    }
    localStorage.setItem("today", currentDay);
  }

  function generateTiles() {
    let tilesContainer = $(".container");
    let tiles = "";
    for (let i = 0; i < workingHours.length; i++) {
      let text;
      let readOnly = false;
      let indexedHour = parseInt(workingHours[i]);
      console.log(indexedHour);
      tiles += "<div class='row time-block ";
      if (currentHour > indexedHour) {
        tiles += "past";
        readOnly = true;
      } else if (currentHour < indexedHour) {
        tiles += "future";
      } else if (currentHour == indexedHour) {
        tiles += "present"
      }
      tiles += "'>";

      tiles += "<div class='hour col-2'>";
      tiles += workingHours[i];
      tiles += "</div>";

      tiles += "<textarea class='col-8 description'";
      if (readOnly) {
        tiles += " readonly ";
      }
      tiles += ">";

      text = localStorage.getItem(indexedHour);
      console.log(indexedHour, text);
      if (text && text.length) {
        tiles += text;
      }

      tiles += "</textarea>";

      tiles += "<button class='saveBtn col-2'><i class='fas fa-save'></i></button>";

      tiles += "</div>";
    }
    tilesContainer.html(tiles);
  }

  function saveData() {
    $('.saveBtn').on('click', function () {
      let $this = $(this);
      let hour = $this.parent().find('.hour').text();
      let text = $this.parent().find('.description').val();
      console.log(hour, text);
      localStorage.setItem(hour, text);
    });
  }

  return { init: init };

})();

$(function () {
  api.init();
});