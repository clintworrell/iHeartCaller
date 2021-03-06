String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

$(".station").on("click", function() {
  $(".fixed-bottom").removeClass("hide-player");
  var stationID = ($(this).attr('data-id'));
  $.ajax({
    url:`https://us.api.iheart.com/api/v2/content/liveStations?id=${stationID}`,
    method: 'GET',
    success: function(data) {
      var station = data.hits[0];
      $('.station-name').html(station.name);
      $(".alert-text").text(`${station.name} is ready to take requests!`)
      if (station.freq === '0.0' || station.freq === '0' || station.freq === undefined) {
        $('.station-freq').html('Online Station');
      } else {
        $('.station-freq').html(`${station.freq} ${station.band}`);
      }
      var logo = station.logo.splice(4,0,'s');
      $('.player-img').attr('src', `${logo}`);
      $(".control-play").removeClass("glyphicon-play").addClass("glyphicon-pause");
      var streams = station.streams;
      var streamArray = [];
      for (var keys in streams) {
        streamArray.push(streams[keys]);
      }
      if (streamArray[0] === '') {
        $('.no-stream').attr('hidden', false);
        $('.audio-source').attr('src', '');
      } else {
        $('.audio-source').attr('src', `${streamArray[0]}`);
        $('.no-stream').attr('hidden', true);
      }
      $('.aud').attr('autoplay', true);
      $('.aud').load();
    }
  });
});

$(".dismiss-alert").on("click", function() {
  $(".fixed-top").toggleClass("hide-alert");
});

$(".play-btn").on("click", function() {
  if ($(".control-play").hasClass("glyphicon-play")) {
    $(".control-play").removeClass("glyphicon-play").addClass("glyphicon-pause");
    $(".aud").trigger("play");
  } else {
    $(".control-play").removeClass("glyphicon-pause").addClass("glyphicon-play");
    $(".aud").trigger("pause");
  }
});

$(".start-btn").on("click", function() {
  $(this).toggleClass("stop-receiving");
  var buttonText = $(this).text() === "Start taking requests" ? "Stop taking requests" : "Start taking requests";
  $(this).text(buttonText);
  if ($(".dj-container").css("display") === "none") {
    $(".dj-container").css("display", "flex");
  } else {
    $(".dj-container").css("display", "none");
  }
});
