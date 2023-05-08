import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class weatherForecastWidget extends LitElement {
    static get properties() {
        return {
            latitude: {type: Object},
            longitude: {type: Object},
            _time: {type: Object},
            _classDay: {type: Object},
            _current_weather: {state: true},
            _location: {state: true}
        };
    }

    static styles = css`
        :host {
            display: block;
            width: 250px;
            height: 250px;
            filter: drop-shadow(4px 4px 4px #A4BBFF);
        }

        h3 {
            border: 1px solid black;
            border-radius: 20px;
            background-color: rgba(240, 255, 255, 0.9);
            margin: 4px;
            padding: 5px;
        }
        .day {
            display: block;
            width: 250px;
            height: 250px;
            padding-top: 5px;
            background-image: url(https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTExZDcyYTM3NzAxZWJlY2YxYTI2MGM1N2U2OGE4OWJkYzFlYjc1NCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/0H0IfQ56Bj240DIMtC/giphy.gif);
        }
        .night {
            display: block;
            width: 250px;
            height: 250px;
            padding-top: 5px;
            background-image: url(https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDM0ODEwOGM2NDYxNDQ0YTJlMmYwNjAxYTAxZjg0MjBkYzc3ZTg2NiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/ZljqVe4iBAS1DHsmEM/giphy.gif);
        }
        p {
            font-size: 18px;
            text-align: center;
            margin: 10px auto;
            padding: 10px;
            font-weight: bolder;
            width: 220px;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            box-shadow: 2px 2px 2px #000;
        }
    `;

    constructor() {
        super();
        this.getLocation();
        this._current_weather = {};
    }
    
    getLocation() {
        const errorCallback = (error) => {
            console.error('Error:', error);
            this.latitude = -33.75;
            this.longitude = 151.125;
            this._location = "Macquarie University";
            this.getWeather();
        };
    
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((loc) => {
                    this.latitude = loc.coords.latitude;
                    this.longitude = loc.coords.longitude;
                    this._location = "your location";
                    this.getWeather();
            },
                errorCallback
            );
        } else {
            errorCallback();
        }
    }

    getWeather() {
        fetch("https://api.open-meteo.com/v1/forecast?latitude=" + this.latitude + "&longitude=" + this.longitude + "&current_weather=true")
            .then(response => response.json())
            .then(weather => {
                console.log('callback', weather);
                this._current_weather = weather.current_weather;
                this._time = this._current_weather.time.substring(0, 10);
                if(this._current_weather.is_day != 1) {
                    this._classDay = "night";
                } else this._classDay = "day";
            });
    }

    render() {
        return html`
            <div class=${this._classDay}>
                <h3>Current Weather at ${this._location}</h3>
                <p id="temperature">Temperature: ${this._current_weather.temperature}&#8451; / ${((this._current_weather.temperature)*9/5 + 32).toFixed(1)}&#8457;</p>
                <p id="windspeed">Wind Speed: ${this._current_weather.windspeed} km/h</p>
                <p id="localdate">Local Date: ${this._time}</p>
            </div>
        `;
    }
}

customElements.define('weather-forecast', weatherForecastWidget);
