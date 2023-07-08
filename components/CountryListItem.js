import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Link from "next/link";

export default function CountryBox(props) {
  const [countryData, setCountryData] = useState(props?.country);

  // const getDT = (timeZone) => {
  //   const dt = moment().tz(timeZone).format("DD MMM YYYY, HH:mm");

  //   return dt;
  // };
  const getDT = (timezone) => {
    var currentTime = new Date();

    var offsetMinutes = currentTime.getTimezoneOffset();

    var utcOffset = timezone.replace("UTC", "").trim();

    var desiredOffsetMinutes =
      parseInt(utcOffset.split(":")[0]) * 60 +
      parseInt(utcOffset.split(":")[1]);

    var totalOffsetMinutes = offsetMinutes + desiredOffsetMinutes;

    if (isNaN(totalOffsetMinutes)) {
      return "";
    } else {
      var offsetMilliseconds = totalOffsetMinutes * 60 * 1000;

      var convertedTime = new Date(currentTime.getTime() + offsetMilliseconds);

      // Extract the date, month, and year from the converted time

      var convertedDate = convertedTime.getDate();

      var convertedMonthIndex = convertedTime.getMonth();

      var convertedYear = convertedTime.getFullYear();

      // Format the date with "th" or "st" suffix

      var dateSuffix = getNumberWithSuffix(convertedDate);

      var formattedDate = convertedDate + dateSuffix;

      // Get the month name

      var monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      var convertedMonth = monthNames[convertedMonthIndex];


      var convertedHour = ("0" + convertedTime.getHours()).slice(-2);

      var convertedMinute = ("0" + convertedTime.getMinutes()).slice(-2);

      var convertedDateTime =
        formattedDate +
        " " +
        convertedMonth +
        " " +
        convertedYear +
        ", " +
        convertedHour +
        ":" +
        convertedMinute;
      return convertedDateTime;
      function getNumberWithSuffix(number) {
        var suffix = "th";

        if (number === 1 || number === 21 || number === 31) {
          suffix = "st";
        } else if (number === 2 || number === 22) {
          suffix = "nd";
        } else if (number === 3 || number === 23) {
          suffix = "rd";
        }

        return suffix;
      }
    }
  };

  useEffect(() => {
    setCountryData(props?.country);
  }, [props]);
  return (
    <div className="box">
      <div className="img-box">
      <div className="img-fluid p-1 ">
        <img src={countryData.flags.svg} className="countryboximage" alt="" />
        </div>
      </div>
      <div className="country-info">
        <h6>{countryData?.name?.common}</h6>
        {/* {console.log(countryData?.currencies)} */}
        <p>
          Currencies :{" "}
          {countryData?.currencies
            ? Object.values(countryData.currencies)[0].name
            : "-"}
          {console.log(countryData?.currencies, "currencies")}
        </p>

        <p>Current date and time: {getDT(countryData.timezones[0])}</p>
        <button className="showmapbtn">
          <Link
            href={countryData.maps.googleMaps}
            target="_blank"
            className="showfont"
          >
            Show Map
          </Link>
        </button>
        <button className="showmapbtn">
          <Link
            href={`/details/${countryData?.cca3}`}
            target="_blank"
            className="showfont"
          >
            Detail
          </Link>
        </button>
      </div>
    </div>
  );
}
