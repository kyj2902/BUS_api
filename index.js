var busHtml = "";
var busArray;
var busstop;
var busid;
var bus;

function busid_print() {
  axios
    .get(
      "https://b252ff7f-36d3-4283-b911-570f8c6175fc.mock.pstmn.io/bus?serviceKey=uG%2BJuWEbMSaye1aNK30LEEj7q%2FlpvJdORLSlG5xGayVkIFFsU%2FM7Tz2fEQcGP0MC1BkmhSpufCkwJOkjHVKn%2Fg%3D%3D"
    )
    .then(function (result) {
      console.log("결과 : ", result);

      var busstop_list = result.data.STATION_LIST;
      for (var i = 0; i < busstop_list.length; i++) {
        busstop = busstop_list[i];
        busArray = [busstop.BUSSTOP_NAME, busstop.BUSSTOP_ID];
        bus = document.getElementById("busstop").value;
        if (bus === busArray[0]) {
          bus = busArray[0];
          busid = busArray[1];
          // console.log("정류장 이름: " + bus + ", 정류장 아이디: " + busid);
          break;
        }
      }
      return busid;
      // busHtml =
      //   busHtml +
      //   '<div class="busname">' +
      //   "정류장 이름: " +
      //   bus +
      //   "</div>" +
      //   '<div class="busid">' +
      //   "정류장 ID: " +
      //   busid +
      //   "</div>" +
      //   "</br>";
      // document.querySelector("#bus").innerHTML = busHtml;
    })
    .catch(function (error) {
      console.log("에러 : ", error);
    });
  const $url = "http://api.gwangju.go.kr/xml/arriveInfo";
  const $KEY =
    "uG%2BJuWEbMSaye1aNK30LEEj7q%2FlpvJdORLSlG5xGayVkIFFsU%2FM7Tz2fEQcGP0MC1BkmhSpufCkwJOkjHVKn%2Fg%3D%3D";

  const $api_url = $url + "?serviceKey=" + $KEY + "&BUSSTOP_ID=" + 2873;
  // console.log($api_url);
  var bustimeHtml = "";
  request($api_url, function (err, res, body) {
    $ = cheerio.load(body);

    $("ARRIVE").each(function (idx) {
      let busname = $(this).find("LINE_NAME").text();
      let time = $(this).find("REMAIN_MIN").text();
      bustimeHtml =
        bustimeHtml + '<div class="busname' >
        +"도착 예정 버스: " +
          busname +
          "</div>" +
          '<div class="bustime">' +
          "남은 시간: " +
          time +
          "</div>";
      console.log(`도착 예정 버스: ${busname}, 남은 시간: ${time}분`);
    });
  });
}
