import Form from "../../components/form/Form";
import classes from "./home.module.scss";

function HomeView() {
  return (
    <div className={classes.wrapper}>
      <h1>Attend event</h1>
      <h3 className={classes.alert}>Early bird offer</h3>
      <p>
        Discounts are available for groups. The bigger the group, the bigger the
        discount. Prices are as follows:
      </p>
      <h3>Price per attendee</h3>
      <div className={classes.attendee__container}>
        <div className={classes.attendee__container__item}>
          <h4>1 - 3</h4>
          <h4>£50</h4>
        </div>
        <div className={classes.attendee__container__item}>
          <h4>4 - 6</h4>
          <h4>£40</h4>
        </div>
        <div className={classes.attendee__container__item}>
          <h4>6+</h4>
          <h4>£35</h4>
        </div>
      </div>
      <Form />
    </div>
  );
}
export default HomeView;
