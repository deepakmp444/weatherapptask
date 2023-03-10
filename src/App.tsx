import axios from "axios";
import { useEffect, useState } from "react";
import { StyleButton } from "./components/styled/Button.styled";
import { Card } from "./components/styled/Card.styled";
import { Container, Heading } from "./components/styled/Container.styled";
import { Dash } from "./components/styled/Dash.styled";
import { StyledInput } from "./components/styled/Input.styled";
import { PTagMuted } from "./components/styled/PTagMuted.styled";
import { TempContained } from "./components/styled/TempContained.styled";
import { TempContainedData } from "./components/styled/TempContainedData.styled";
import { TextInputFiled } from "./components/styled/TextInputFiled.styled";
import { TextMuted } from "./components/styled/TextMuted.styled";

type WeaterData = {
  name: string;
  weatherTemp: string;
  weatherTime: string;
  weatherStatus: string;
  high_low: string;
  wind: string;
  humidity: string;
  wind_dir: string;
  pressure: string;
  sunrise: string;
  visibility: string;
  sunset: string;
};

type city = {
  name: string;
};

function App() {
  const [weatherData, setWeatherData] = useState<WeaterData>({
    name: "",
    weatherTemp: "",
    weatherTime: "",
    weatherStatus: "",
    high_low: "",
    wind: "",
    humidity: "",
    wind_dir: "",
    pressure: "",
    sunrise: "",
    visibility: "",
    sunset: "",
  });

  const [cityName, setCityName] = useState<city>({
    name: "mumbai",
  });
  console.log("cityName:", cityName);

  useEffect(() => {
    getWeatherData();
  }, [cityName.name]);

  const getWeatherData = async () => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName.name}&appid=d2414419d3af28d1842e009e01eb2845`
    );

    setWeatherData({
      name: data.name,
      weatherTemp: data.main.temp,
      weatherTime: Date.now().toLocaleString(),
      weatherStatus: data.weather[0].main,
      high_low: data.main.temp_max,
      wind: data.wind.speed,
      humidity: data.main.humidity,
      wind_dir: data.wind.deg,
      pressure: data.main.pressure,
      sunrise: data.sys.sunrise,
      visibility: data.visibility,
      sunset: data.sys.sunset,
    });

    console.log("data:", data);
  };

  return (
    <Container>
      <Heading>Weater App</Heading>
      <TextInputFiled>
        <StyledInput
          type="search"
          placeholder="Mumbai"
          onChange={(e) => setCityName({ name: e.target.value })}
        />
        <StyledInput type="text" placeholder="India" disabled />
        <StyleButton type="button">Submit</StyleButton>
      </TextInputFiled>
      <Card>
        <h4>{weatherData.name}</h4>
        <TextMuted>{weatherData.weatherTime}</TextMuted>
        <Heading>{weatherData.weatherTemp}</Heading>
        <h4>{weatherData.weatherStatus}</h4>
      </Card>
      <TempContained>
        <TempContainedData>
          <div style={{ display: "flex" }}>
            <div>
              <h4>Low/High</h4>
            </div>
            <div>
              <PTagMuted>
                {weatherData.weatherTemp} / {weatherData.weatherTemp}
              </PTagMuted>
            </div>
          </div>
          <Dash />
        </TempContainedData>
        <TempContainedData style={{ marginLeft: "150px" }}>
          <div style={{ display: "flex" }}>
            <div>
              <h4>Wind</h4>
            </div>
            <div>
              <PTagMuted>{weatherData.wind}Km/hr</PTagMuted>
            </div>
          </div>
          <Dash />
        </TempContainedData>
      </TempContained>
      <TempContained>
        <TempContainedData>
          <div style={{ display: "flex" }}>
            <div>
              <h4>Humidity</h4>
            </div>
            <div>
              <PTagMuted>{weatherData.humidity}%</PTagMuted>
            </div>
          </div>
          <Dash />
        </TempContainedData>
        <TempContainedData style={{ marginLeft: "150px" }}>
          <div style={{ display: "flex" }}>
            <div>
              <h4>Wind Direction</h4>
            </div>
            <div>
              <PTagMuted>{weatherData.wind_dir} deg</PTagMuted>
            </div>
          </div>
          <Dash />
        </TempContainedData>
      </TempContained>
      <TempContained>
        <TempContainedData>
          <div style={{ display: "flex" }}>
            <div>
              <h4>Pressure</h4>
            </div>
            <div>
              <PTagMuted>{weatherData.pressure} hPa</PTagMuted>
            </div>
          </div>
          <Dash />
        </TempContainedData>
        <TempContainedData style={{ marginLeft: "150px" }}>
          <div style={{ display: "flex" }}>
            <div>
              <h4>Sunshine</h4>
            </div>
            <div>
              <PTagMuted>{weatherData.sunrise}</PTagMuted>
            </div>
          </div>
          <Dash />
        </TempContainedData>
      </TempContained>
      <TempContained>
        <TempContainedData>
          <div style={{ display: "flex" }}>
            <div>
              <h4>Visibility</h4>
            </div>
            <div>
              <PTagMuted>{weatherData.visibility}KM</PTagMuted>
            </div>
          </div>
          <Dash />
        </TempContainedData>
        <TempContainedData style={{ marginLeft: "150px" }}>
          <div style={{ display: "flex" }}>
            <div>
              <h4>Sunset</h4>
            </div>
            <div>
              <PTagMuted>{weatherData.sunset}</PTagMuted>
            </div>
          </div>
          <Dash />
        </TempContainedData>
      </TempContained>
    </Container>
  );
}

export default App;
