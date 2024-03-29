import "./ToolProfile.css";
import logo from "./logo1.png";
import { useState, useEffect } from "react";
import hAPI from "../../api/hAPI";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AuthContext from "../../providers/AuthProvider";
import { useContext } from "react";

function ToolProfile(props) {
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();
  const { toolID } = useParams();

  const [bookinginputs, setBookinginputs] = useState({});
  const [reportinputs, setReportinputs] = useState({});
  const [bookings, setBookings] = useState([]);
  const [display, setDisplay] = useState("");


  useEffect(() => {
    // setDisplay(false)

    hAPI.tools.getBookings().then((response) => {
      setBookings(response.data);
    });
  }, []);

  const handleBookingChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBookinginputs((values) => ({ ...values, [name]: value }));
  };

  const handleReportChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setReportinputs((values) => ({ ...values, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    console.log(bookinginputs.startdate, bookinginputs.enddate);

    hAPI.tools
      .bookTool(props.data._id, bookinginputs.startdate, bookinginputs.enddate)
      .then(
        (data) => {
          // Successfully booked
          console.log(data);
        },
        (error) => {
          // Failed booking
          console.log(error);
        }
      );
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    const image = e.target.image.files ? e.target.image.files[0] : null;

    hAPI.tools.reportTool(props.data._id, reportinputs.report, image).then(
      (data) => {
        // Successfully reported
        console.log(data);
      },
      (error) => {
        // Failed reporting
        console.log(error);
      }
    );

    // I wouldn't recommend actually doing this (doing multiple requests for a thing the server could handle with just one)
    // I would rather create a markBroken endpoint that performs both (to save data, and use less requests)
    hAPI.tools.markBroken(props.data._id, 1).then(
      (data) => {
        // Successfully marked as unavailable
        console.log(data);
        navigate("/tools");
      },
      (error) => {
        // Failed to mark as unavailable
        console.log(error);
      }
    );
  };

  const markFixed = (e) => {
    e.preventDefault();

    hAPI.tools.markFixed(props.data._id, 0).then(
      (data) => {
        // Successfully marked as unavailable
        console.log(data);
        navigate("/tools");
      },
      (error) => {
        // Failed to mark as unavailable
        console.log(error);
      }
    );
  };

  const handleDeleteTool = (e) => {
    e.preventDefault();

    hAPI.tools.deleteTool(props.data._id).then(
      (data) => {
        // Successfully reported
        console.log(data);
        navigate("/tools");
      },
      (error) => {
        // Failed reporting
        console.log(error);
      }
    );
  };

  const showEditForm = (e) => {
    e.preventDefault();

    display === false ? setDisplay(true) : setDisplay(false);
  };

  const handleEditTool = (e) => {
    e.preventDefault();

    let name = e.target.name.value;
    let information = e.target.information.value;
    let location = e.target.location.value;
    let quantity = e.target.quantity.value;
    let courses = e.target.courses.value;
    let image = e.target.image.value;

    console.log(name, information, quantity, courses, toolID, location);

    hAPI.tools
      .updateTool(name, information, quantity, location, courses, image, toolID)
      .then(
        (data) => {
          // Successfully reported
          console.log(data);
        },
        (error) => {
          // Failed reporting
          console.log(error);
        }
      );
  };

  // const handleDeleteBooking = (bookingID) => {

  //   hAPI.tools
  //     .deleteBooking(bookingID)
  //     .then(
  //       (data) => {
  //         // Successfully reported
  //         console.log(data);
  //       },
  //       (error) => {
  //         // Failed reporting
  //         console.log(error);
  //       }
  //     )
  // }

  // https://stackoverflow.com/questions/17446466/add-15-minutes-to-string-in-javascript
  const calculateTime = (mins, time) => {
    const newTime = new Date(
      new Date("1970/01/01 " + time).getTime() + mins * 60000
    ).toLocaleTimeString("en-UK", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return newTime;
  };

  // https://linuxhint.com/get-the-hours-and-minutes-from-a-date-in-javascript/
  const date = new Date();
  let hoursMin = date.getHours() + ":" + date.getMinutes();
  // https://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date
  let currDate =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2);

  // https://stackoverflow.com/questions/41296950/convert-hours-and-minute-to-millisecond-using-javascript-or-jquery
  const timeStamp = (time) => {
    var timeParts = time.split(":");
    return +timeParts[0] * (60000 * 60) + +timeParts[1] * 60000;
  };

  // Expects a return value...

  bookings.map((booking) => {
    if (
      (props.data.tool === 0) &
      (booking.startTime.toLocaleString() === currDate.toLocaleString())
    ) {
      if (
        timeStamp(hoursMin) <= timeStamp(calculateTime(120, booking.endTime))
      ) {
        console.log(
          timeStamp(hoursMin),
          timeStamp(calculateTime(120, booking.endTime))
        );
        console.log("True?" + currDate === booking.startTime);
      } else {
        console.log("Expired");
        // handleDeleteBooking(booking._id)
      }
    } else if (
      (props.data.tool !== 0) &
      (booking.startTime.toLocaleString() === currDate.toLocaleString())
    ) {
      if (
        timeStamp(hoursMin) <= timeStamp(calculateTime(240, booking.endTime))
      ) {
        console.log(
          timeStamp(hoursMin),
          timeStamp(calculateTime(240, booking.endTime))
        );
      } else {
        console.log("Expired");
        // handleDeleteBooking(booking._id)
      }
    }
  });

  console.log(props.data);

  return (
    <>
      <section className="toolprofile--container">
        <div className="toolprofile--btn-container">
          <a href="#toolprofile--broken-container">
            <button>Report issue</button>
          </a>
          <button
            className={authContext.isAdmin ? "user--btn" : "hide"}
            onClick={handleDeleteTool}
          >
            Delete tool
          </button>
          <button
            className={authContext.isAdmin ? "user--btn" : "hide"}
            onClick={showEditForm}
          >
            Edit tool
          </button>
          <button
            className={authContext.isAdmin ? "user--btn" : "hide"}
            onClick={markFixed}
          >
            Mark as fixed
          </button>
        </div>
        <div
          className={
            display === true
              ? "toolprofile--showEditTool"
              : "toolprofile--hideEditTool"
          }
        >
          <form onSubmit={handleEditTool} className="tool--profile--edit">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
            <label htmlFor="information">Information</label>
            <input type="text" name="information" id="information" />
            <label htmlFor="location">Location</label>
            <input type="text" name="location" id="location" />
            <label htmlFor="quantity">Quantity</label>
            <input type="number" name="quantity" id="quantity" />
            <label htmlFor="courses">Required courses</label>
            <input type="text" name="courses" id="courses" />
            <label htmlFor="toolimage">Image</label>
            <input type="text" name="toolimage" id="toolimage" />
            <button type="submit" name="submit" id="submit">
              Edit tool
            </button>
          </form>
        </div>
        {/* db.img */}
        <img src={logo} alt="react logo" className="tool--image--img" />
        <div className="toolprofile">
          <h1>{props.data.name}</h1>
          <div class="toolprofile--info-and-avail">
            <p>
              <span className="span--bold">Information: </span>
              {props.data.information}
            </p>
            {/* db.location */}
            <p>
              <span className="span--bold">Location: </span>
              {props.data.location}
            </p>
            <p>
              <span className="span--bold">Available for booking: </span>
              {/* {props.data.broken > 0 ? "NO" : props.data.availability - props.data.broken} */}
              {typeof props.data.availability === "number" &&
              typeof props.data.broken === "number"
                ? props.data.availability - props.data.broken
                : "-"}
            </p>
            <div className="toolprofile--bookings"></div>
            <p>
              <span className="span--bold">Registered bookings:</span>
            </p>
            <div>
              {bookings.map((booking) => {
                if (booking.tool._id === props.data._id) {
                  return (
                    <p className="booking--li" key={booking._id}>
                      Booking begins at {booking.startTime} {booking.endTime}{" "}
                      and ends at {booking.startTime}{" "}
                      {props.data.type === 0
                        ? calculateTime(120, booking.endTime)
                        : calculateTime(240, booking.endTime)}
                    </p>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className="toolprofile--booking--container">
          <h2>Book tool</h2>
          <p>
            Book this tool by choosing a time period to book the item for and
            press the button below.
          </p>
          <p>
            This tool can be booked up to{" "}
            {props.data.type === 0 ? "2 hours" : "4 hours"} at a time
          </p>
          <form
            method="POST"
            className="toolprofile--booking-form"
            onSubmit={handleBookingSubmit}
          >
            <label for="startdate">Start date:</label>
            <input
              type="date"
              id="startdate"
              name="startdate"
              value={bookinginputs.startdate || ""}
              onChange={handleBookingChange}
            />
            <label for="enddate">Start time:</label>
            <input
              type="time"
              id="enddate"
              name="enddate"
              value={bookinginputs.enddate || ""}
              onChange={handleBookingChange}
            />
            <button
              type="submit"
              disabled={
                typeof props.data.availability === "number" &&
                typeof props.data.broken === "number" &&
                props.data.availability - props.data.broken === 0
                  ? true
                  : false
              }
            >
              Book tool
            </button>
          </form>
        </div>

        <div id="toolprofile--broken-container">
          <h2>Report issue</h2>
          <p>
            Here you can send a report on the tool if it's broken, missing or
            that you'd like it replaced.
          </p>
          <form
            method="POST"
            className="toolprofile--broken-form"
            onSubmit={handleReportSubmit}
            enctype="multipart/form-data"
          >
            <label for="report">
              Write here why/how the tool is broken or needs replacing.
            </label>
            <input
              type="text"
              id="report"
              name="report"
              value={reportinputs.report || ""}
              onChange={handleReportChange}
            ></input>
            <label for="image">Upload image of broken tool:</label>
            <input type="file" id="image" name="image"></input>
            <button>Submit report</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ToolProfile;
