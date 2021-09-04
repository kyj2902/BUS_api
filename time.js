// var cheerio = require("cheerio");
// var request = require("request");
// var module_id = require("./index.js");

// var express = require("express");
import request from "request";
import module_id from "./index.js";
import express from "express";
var app = express();

// console.log($api_url);

app.use("/", express.static(__dirname));

app.get("/index.html", function (req, res) {
  const $url = "http://api.gwangju.go.kr/xml/arriveInfo";
  const $KEY =
    "uG%2BJuWEbMSaye1aNK30LEEj7q%2FlpvJdORLSlG5xGayVkIFFsU%2FM7Tz2fEQcGP0MC1BkmhSpufCkwJOkjHVKn%2Fg%3D%3D";
  var busid = module_id.busid_print();
  const $api_url = $url + "?serviceKey=" + $KEY + "&BUSSTOP_ID=" + busid;
  request(
    {
      url: $api_url,
      method: "GET",
    },
    function (error, response, body) {
      var xmlToJson = convert.xml2json(body, { compact: true, spaces: 4 });
      var jsonObj = JSON.parse(xmlToJson);
      var bus_name = jsonObj.ARRIVE_LIST.ARRIVE.LINE_NAME;
      var bus_time = jsonObj.ARRIVE_LIST.ARRIVE.REMAIN_MIN;

      var html =
        '<div class="busname' >
        +"도착 예정 버스: " +
          bus_name +
          "</div>" +
          '<div class="bustime">' +
          "남은 시간: " +
          bus_time +
          "</div>";

      res.send(html);
    }
  );
});

app.listen(3000);
console.log("Listening on port 3000...");

// var bustimeHtml = "";
// request($api_url, function (err, res, body) {
//   $ = cheerio.load(body);

//   $("ARRIVE").each(function (idx) {
//     let busname = $(this).find("LINE_NAME").text();
//     let time = $(this).find("REMAIN_MIN").text();
//     bustimeHtml =
//       bustimeHtml + '<div class="busname' >
//       +"도착 예정 버스: " +
//         busname +
//         "</div>" +
//         '<div class="bustime">' +
//         "남은 시간: " +
//         time +
//         "</div>";
//     console.log(`도착 예정 버스: ${busname}, 남은 시간: ${time}분`);
//   });
// });
