import React from "react";
import Grid from "React-bootstrap";

class WeatherPage extends React.Component {

    render() {
        return (
            <Grid container justify="center" alignItems="center" style={{ height: "200px", width: "400px" }}>
                <img src={require('./components/beijing.jpg')} alt="item" />

            </Grid>
        );
    }

}

export default WeatherPage;

