import React, { useState, useEffect } from "react";
import classes from "./Form.module.scss";

const defaultTicketPrice = 50;
const defaultUnavailableDates = ["2019-09-01", "2019-08-07", "2019-08-20"];

const Form = () => {
  const [firstName, setFirstName] = useState();
  const [familyName, setFamilyName] = useState();
  const [date, setDate] = useState();
  const [attendees, setAttendees] = useState(0);
  const [companyName, setCompanyName] = useState();
  const [email, setEmail] = useState();
  const [telephone, setTelephone] = useState();
  const [wcAccess, setWcAccess] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [dateError, setDateError] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = {
      firstName,
      familyName,
      date,
      attendees,
      companyName,
      email,
      telephone,
      wcAccess,
    };
    console.log("formData", formData);
    fetch("https://www.mocky.io/v2/5d00cfff3200007d00f9d809")
      .then((response) => response.json())
      .then((data) => alert(data.message))
      .catch((error) => console.log(error));
  };

  const calculateTotalCost = () => {
    let unitCost = defaultTicketPrice;
    if ((attendees > 3) & (attendees < 6)) {
      unitCost = 40;
    } else if (attendees >= 6) {
      unitCost = 35;
    }
    setTotalCost(attendees * unitCost);
  };

  const handleUnavailbleDate = () => {
    setDateError(defaultUnavailableDates.includes(date));
  };

  useEffect(() => {
    calculateTotalCost();
  }, [attendees]);

  useEffect(() => {
    handleUnavailbleDate();
  }, [date]);

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <label htmlFor="form__input__firstName">FIRST NAME</label>
      <input
        type="text"
        className={classes.form__input}
        required
        id="form__input__firstName"
        value={firstName}
        onChange={(event) => setFirstName(event.currentTarget.value)}
      />
      <label htmlFor="form__input__familyName">FAMILY NAME</label>
      <input
        type="text"
        className={classes.form__input}
        required
        id="form__input__familyName"
        value={familyName}
        onChange={(event) => setFamilyName(event.currentTarget.value)}
      />
      <label htmlFor="form__input__calendar">CHOOSE A DAY</label>
      {dateError && (
        <span className={classes.alert}>
          Sorry, but the date you have selected is unavailable. Please select
          another.
        </span>
      )}
      <input
        type="date"
        className={classes.form__input}
        id="form__input__calendar"
        min="2019-08-05"
        max="2019-09-13"
        value={date}
        onChange={(event) => setDate(event.currentTarget.value)}
      />
      <label htmlFor="form__input__attendees">NUMBER OF ATTENDEES</label>
      <select
        className={classes.form__input}
        id="form__input__attendees"
        value={attendees}
        onChange={(event) => setAttendees(event.currentTarget.value)}
      >
        {[...Array(10).keys()].map((count, index) => {
          return (
            <option value={count} key={"attendeeSelect-" + count}>
              {count}
            </option>
          );
        })}
      </select>
      <label
        className={classes.label__optional}
        htmlFor="form__input__companyName"
      >
        COMPANY NAME <span>OPTIONAL</span>
      </label>
      <input
        type="text"
        className={classes.form__input}
        id="form__input__companyName"
        value={companyName}
        onChange={(event) => setCompanyName(event.currentTarget.value)}
      />
      <label htmlFor="form__input__email">EMAIL</label>
      <input
        type="text"
        className={classes.form__input}
        required
        id="form__input__email"
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
      />
      <label
        className={classes.label__optional}
        htmlFor="form__input__telephone"
      >
        TELEPHONE<span>OPTIONAL</span>
      </label>
      <input
        type="text"
        className={classes.form__input}
        id="form__input__telephone"
        value={telephone}
        onChange={(event) => setTelephone(event.currentTarget.value)}
      />
      <label
        className={classes.form__input__checkbox__label}
        htmlFor="wheelchairCheck"
      >
        <input
          type="checkbox"
          className={classes.form__input__checkbox}
          id="wheelchairCheck"
          value={wcAccess}
          onClick={(event) => setWcAccess(event.target.checked)}
          checked={wcAccess}
        />
        Do you need wheelchair access?
      </label>
      <div className={classes.attendee__total}>
        <h4>Attendees</h4>
        <h4>{attendees}</h4>
      </div>
      <h2 className={classes.attendee__total__price}>
        {"£" + totalCost + ".00"}
      </h2>
      <input
        type="submit"
        className={classes.form__input__submit}
        id="form__input__submit"
        value="BUY"
      />
    </form>
  );
};

export default Form;
