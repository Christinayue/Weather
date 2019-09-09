import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import moment from "moment";

class Forecast extends Component {
  render() {
    const daily = this.props.forecasts.forecastday;

    /**
     * Use forecasted daily data to generate view
     * @param {*} daily
     */
    const days = daily.map(forecast => (
      <Grid item sm={2} xs={4} key={forecast.date_epoch}>
        <Paper
          style={{
            margin: 10,
            padding: 20,
            minHeight: 180,
            minWidth: 70
          }}
        >
          <div>
            <div>{moment(forecast.date_epoch).format("dddd")}</div>
            <img src={forecast.day.condition.icon} alt="" />
            <p style={{ fontSize: 12 }}>{forecast.day.condition.text}</p>
          </div>
          <div style={{ fontSize: 14 }}>
            {forecast.day.mintemp_c}°C~{forecast.day.maxtemp_c}°C
          </div>
        </Paper>
      </Grid>
    ));
    return (
      <Grid container spacing={0} justify="center" alignItems="center">
        {days}
      </Grid>

      //leave for further study
      //why not keep alignment?
      /*       <Grid container justify="center" alignItems="center">
      <Paper style={{ marginTop: 20 }}>
        <Grid
          container
          spacing={16}
          justify="center"
          alignItems="center"
          direction="row"
        >
          {days}
        </Grid>
      </Paper>
    </Grid> */
    );
  }
}

export default Forecast;
