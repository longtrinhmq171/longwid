import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class publicHolidayWidget extends LitElement{
    static get properties(){
        return{
            nextHolidayDate: { type: Date},
            localName: { type: String},
            globalName: { type: String},
            countryCode: { type: String},
            countryName: { type: String},
            holidays: {type: Object},
            index:  {type: Number},
            isoCountries: {type :Object},
            availCountries: {type :Object}
        };
    }

    static styles = css`
        #widget{        
            margin-top: 20px;
            display:grid;
            grid-template-columns: auto;
            width: 100%;
            height: 95%;
        }
        h3 {
            margin: 15px;
            height:50%;
        }
        h4{
            padding-top:2px;
            margin: 0px;
            height:50%;
        }
        #name-div{
            display:grid;
            grid-template-columns: auto auto;
            gap:4px;
            font-size: 14px;
            margin:0 2px 0 2px
        }
        #next-button{
            width:120px;
            height:25px;
            margin:auto;
        }
    `;

    constructor(){
        super();
        this.isoCountries = {};
        this.availCountries = {};
        this.getAvailCountries();
        this.countryCode = 'AU';
        this.countryName = 'Australia';
        this.index = 0;
        this.holiday = {};
        this.getPublicHoliday();
    }

    getCountryCode (countryName) {
        if (Object.keys(this.isoCountries).find(key => this.isoCountries[key] === countryName)) {
            return Object.keys(this.isoCountries).find(key => this.isoCountries[key] === countryName);
        } else {
            return countryName;
        }
    }

    handleButtonClick(e){
        if(this.index == this.holiday.length-1){
            this.index = 0;
        }else{
            this.index++;
        }
    }

    async handleCountryChange(event) {
        this.countryName = event.target.value;
        this.countryCode = this.getCountryCode(this.countryName);
        await this.getPublicHoliday();
        console.log(this.holiday)
    }

    async getAvailCountries(){
        await fetch('https://date.nager.at/api/v3/AvailableCountries/')
        .then(response => response.json())
        .then(countries =>{
            this.availCountries = countries;
            for(let x = 0; x < this.availCountries.length; x++){
                this.isoCountries[this.availCountries[x].countryCode] = this.availCountries[x].name;
            }
        })
    }

    async getPublicHoliday(){
        await fetch('https://date.nager.at/api/v3/publicholidays/2023/' + this.countryCode)
        .then(response => response.json())
        .then(publicHoliday =>{
            if(publicHoliday){
                this.holiday = publicHoliday;
                this.index = 0;
                let today = new Date();
                while(this.holiday[this.index].date < today.toJSON().slice(0, 10)){
                    this.index++;
                }}
            });
    }

    render() {
        return html`
            <div id="widget">
                <h3 id="title">Next Holiday in
                    <label for="current-country"></label>
                    <select id="current-country" @change=${this.handleCountryChange}>
                    ${Object.values(this.isoCountries).map(
                    country => html`
                    <option value=${country} ?selected=${country === this.countryName}>${country}</option>
                    `)} </select>
                </h3>

                <h4 id="date">Date: ${this.holiday[this.index].date}</h4>

                <div class="name" id="name-div">
                    <h4 id="local">Local Name: ${this.holiday[this.index].localName}</h4>
                    <h4 id="global">Global Name: ${this.holiday[this.index].name}</h4>
                </div>

                <button id="next-button" @click="${this.handleButtonClick}">Next Holiday</button>
            </div>
        `;
    }
}

customElements.define('next-public-holiday', publicHolidayWidget);
