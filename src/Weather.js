import React from "react";
//import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import styled from "styled-components";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import "typeface-roboto";

import Forecast from "./components/forecast";
//import { lightBlue } from "@material-ui/core/colors";

const DEFAULT_CITY = "Beijing";
const MODE = "forecast";
const paperStyle = {
  Paper: { padding: 20, margin: 10, height: 100, minWidth: 100 }
};

class WeatherPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      city: DEFAULT_CITY,
      mode: MODE
    };
  }

  async componentDidMount() {
    await this.getUrl(MODE, DEFAULT_CITY);
  }

  /**
   * Get weather data using api key from apixu.com
   * using given dataMode and city
   * @param {*} dataMode can be current and forecast
   * @param {*} city
   */
  getUrl = async (MODE, city) => {
    const url =
      "http://api.apixu.com/v1/" +
      MODE +
      ".json?key=fd2d244e208d40319a154648191108&q=" +
      city +
      "&days=5";
    const { data } = await axios.get(url);
    await this.setState({ data });
    console.log(data);
  };

  /**
   * Handle change of selected city
   * @param {*} event selector change
   */
  handleChange = async event => {
    await this.setState({ city: event.target.value });
    await this.getUrl(MODE, event.target.value);
  };

  render() {
    const { data } = this.state;
    if (!data) {
      return null;
    }

    const forecastList = data.forecast;

    return (
      <Container style={{ minWidth: 450 }} >
        <Grid xs={{ span: 2, offset: 8 }}>
          <Grid container justify="center" alignItems="center" >
            <Grid item xs={10}>
              <Paper style={{ margin: 10, padding: 10 }}>
                <img style={{ height: "300px", width: "100%", justifyContent: "center" }} src={require(`./components/${data.location.name}.jpg`)} alt="item" />
                <div>{data.location.localtime}</div>

                <form autoComplete="off" /*onSubmit={this.handleSubmit}*/>
                  <FormControl>
                    <InputLabel
                      htmlFor="countries"
                      style={{ marginTop: 5, marginBottom: 5, fontSize: 20 }}
                    >
                      countries
                  </InputLabel>
                    <Select value={this.state.city} onChange={this.handleChange}>
                      <MenuItem value={"Beijing"}>Beijing</MenuItem>
                      <MenuItem value={"London"}>London</MenuItem>
                      <MenuItem value={"Paris"}>Paris</MenuItem>
                      <MenuItem value={"Sydney"}>Sydney</MenuItem>
                      <MenuItem value={"Tokyo"}>Tokyo</MenuItem>
                    </Select>
                  </FormControl>
                </form>
              </Paper>
            </Grid>
          </Grid>

          <Grid container justify="center" alignItems="center">
            <Grid item xs={8} sm={4}>
              <Paper style={paperStyle.Paper}>
                <Typography
                  variant="h3"
                  gutterBottom
                  style={{ textAlign: "center", color: "lightBlue" }}
                >
                  {data.current.temp_c}°C
              </Typography>
                <div>Humidity: {data.current.humidity}%</div>
                <div>
                  Wind_degree: {data.current.wind_degree} degree, {data.current.wind_dir}
                </div>
              </Paper>
            </Grid>
            <Grid item xs={8} sm={4} alignContent="center">
              <Paper style={paperStyle.Paper}>
                <Typography
                  variant="h3"
                  gutterBottom
                  style={{ textAlign: "center" }}
                >
                  {data.location.name}
                  {/* , {data.location.country} */}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Forecast forecasts={forecastList} />

        </Grid>


        {/*  <Grid item sm={2}>
            <Paper style={paperStyle.Paper}>Twitter</Paper>
          </Grid> */}


      </Container>
    );
  }
}

export default WeatherPage;

const Container = styled.div``;
