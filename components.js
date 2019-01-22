
class CMPLeftNav {
    constructor(navName, navIcon, navHolder = null) {
        this.parent_e = navHolder
        this.e = document.createElement('li')
        this.e.classList.add('nav-item')
        this.e.classList.add('left-nav-item')
        this.e.innerHTML = `
                <a class="left-nav-link" href="#${navName}" title="${navName}" id="${navName}-btn">
                    <img src="index/resources/svg/${navIcon}" alt="${navName}" />
                    ${navName}
                </a>
        `
        this.li_e = this.e.getElementsByClassName('left-nav-link')[0]

        if (navHolder != null) {
            navHolder.appendChild(this.e)
        }

        this.select = () => {
            this.li_e.classList.add('active')
            this._selected = true
        }

        this.deselect = () => {
            this.li_e.classList.remove('active')
            this._selected = false
        }

        this.li_e.onclick = (e) => {
            this.on_click(this, this.e.value)
        }
    }
}


// Calendar datetime picker input box
// depends: 
//  jquery.js
//  moment.js
//  daterangepicker.js
class CMPDateTimeInput {
    constructor(parentElement, config) {
        this.e = document.createElement('div');
        this.e.innerHTML = `
            <input id="date-range0" size="40" value="">
            <div class="showme"></div>
        `
        this.config = config
        this.parent_e = parentElement
        this.input_e = this.e.getElementsByTagName('input')[0]
        this.parent_e.appendChild(this.e)
        this.jq_e = $(this.e)
        this.jq_e.dateRangePicker(this.config)

        // fires on picked date
        var onDate = (event, obj) => {
            // set component input element
            this.input_e.value = obj.value
        }
        this.jq_e.bind('datepicker-change', onDate)
    }
}
//  CMPDateTimeInput }


// Timeline and Revenue labels
class CMPLabel {
    constructor(labelName, labelText, labelHolder) {
        this.parent_e = labelHolder
        this.e = document.createElement('div')
        this.e.innerHTML = `${labelName}: <strong class="label-type-timeline">${labelText}</strong>`
        //this._labelName_e = labelName
        //this._labelText_e = labelText
        this._label_e = this.e.getElementsByTagName('strong')[0]
        labelHolder.appendChild(this.e)
    }

    get text() {
        return this._label_e.innerHTML
    }

    set text(v) {
        this._label_e.innerHTML = v
    }
} // end CMPLabel


// Units labels
class CMPBuildingsLabel {
    constructor(buildings_number, units_number, buildings_label_holder) {
        this.parent_e = buildings_label_holder

        this.e = document.createElement('div')
        this.e.classList.add('CMPBuildingsLabel_element')
        this.e.innerHTML = `Units Selected: <strong>${buildings_number} Buildings, ${units_number} Units </strong>`
        this.label_e = this.e.getElementsByClassName('CMPBuildingsLabel_element')[0]
        this.update = (buildings_number, units_number) => {
            this.e.innerHTML = `Units Selected: <strong>${buildings_number} Buildings, ${units_number} Units </strong>`
        }
        buildings_label_holder.appendChild(this.e)
    }
} // end CMPBuildingsLabel


// Timeline button 
class CMPTimelineBtn {
    constructor(value, timeline_btn_label, timeline_btn_holder = null) {
        this.on_click = (o, d) => { ; }
        // this._value = value
        this.parent_e = timeline_btn_holder
        this.e = document.createElement('div')
        this.e.classList.add('col-sm-4')
        this.e.classList.add('col-7')
        this.e.classList.add('m-auto')
        this._selected = false
        this.e.innerHTML =
            `<button value=${value} class="CMPTimelineBtn_btn white-btn brand-color-text timeline-btn" type="button">
            ${timeline_btn_label}</button>`
        this._timeline_btn_label = timeline_btn_label
        this.button_e = this.e.getElementsByClassName('CMPTimelineBtn_btn')[0]
        // add if there is a parent
        if (timeline_btn_holder != null) {
            timeline_btn_holder.appendChild(this.e)
        }

        this.select = () => {
            //this.e.getElementsByClassName('timeline-btn')[0].classList.add('active')
            this.button_e.classList.add('active')
            this._selected = true
        }

        this.deselect = () => {
            //this.e.getElementsByClassName('timeline-btn')[0].classList.remove('active')
            this.button_e.classList.remove('active')
            this._selected = false
        }

        this.toggle_select = () => {
            if (this._selected) {
                this.deselect()
            } else {
                this.select()
            }
        }

        this.button_e.onclick = () => {
            this.on_click(this, this.value)
        }
    }
    get value() {
        return this.button_e.value
    }
    set value(v) {
        this.button_e.value = v
    }

    get selected() {
        return this._selected
    }

    get timeline_btn_label() {
        return this._timeline_btn_label
    }
    set timeline_btn_label(v) {
        this._timeline_btn_label.innerHTML = v
    }
} // end CMPTimelineBtn


// Class to hold radio buttons group CMPTimelineBtn
class CMPTimelineRadioGroup {
    constructor(buttons_cmp, holder_e, on_selected = null) {
        this.buttons = buttons_cmp
        this.holder_e = holder_e
        this._value = 'alt'
        // external event handling function should have (o=called, d=expected data)
        if (on_selected) {
            // default
            this.on_selected = on_selected
        } else {
            //default empty call
            this.on_selected = (o, d) => { ; }
        }
        // internal event handling
        this._on_selected = (o, d) => {
            // aply value from btns
            this._value = d
            // call external event
            this.on_selected(o, d)
        }
        this.buttons.forEach((btn) => {
            this.holder_e.appendChild(btn.e)
            // bind internal event to btn.on_click to get btn value when btn clicked
            btn.on_click = this._on_selected
        })
    }
    // value read only property selected value
    get value() {
        return this._value
    }
}
// end CMPTimelineRadioButtons


// Revenue cards - CMPFinancialIndicatorCard
class CMPFinancialIndicatorCard {
    constructor(cardValue, cardTitle, cardFullName, cardIcon, cardHolder) {
        this.parent_e = cardHolder
        this._cardTitle = cardTitle
        this.cardFullName = cardFullName
        // this._cardValue = 0 
        // this._cardTitle = 0
        // todo this make this chart-wrapper
        this.e = document.createElement('div')
        this.e.classList.add('col-6')
        this.e.classList.add('col-md-3')
        this._selected = false
        this.e.innerHTML =
            `<div class="chart-wrapper mb10">
                <div class="chart-type-card subtitle" aria-label="${cardFullName}">
                    <div class="text">
                        <div class="CMPFinancialIndicatorCard_cardValue"><strong >${cardValue}</strong></div>
                        <div class="CMPFinancialIndicatorCard_cardTitle">${cardTitle}</div>
                    </div>
                    <div class="img d-none d-sm-block d-lg-none d-xl-block">
                        <img class="CMPFinancialIndicatorCard_cardIcon" src="${cardIcon}">
                    </div>
                </div>
            </div>`
        this._wrapper_e = this.e.getElementsByClassName('chart-wrapper')[0]
        this._inside_wrapper_e = this.e.getElementsByClassName('chart-type-card')[0]
        this._cardValue_e = this.e.getElementsByClassName('CMPFinancialIndicatorCard_cardValue')[0]
        this._cardTitle_e = this.e.getElementsByClassName('CMPFinancialIndicatorCard_cardTitle')[0]
        this._cardIcon_e = this.e.getElementsByClassName('CMPFinancialIndicatorCard_cardIcon')[0]
        this._inside_wrapper_e.addEventListener('click', () => {
            if (this._inside_wrapper_e.classList.contains('funky')) {
                this._inside_wrapper_e.classList.remove('funky')
            } else {
                this._inside_wrapper_e.classList.add('funky')
            }
        })
        cardHolder.appendChild(this.e)

    }

    get cardValue() {
        return this._cardValue_e.innerHTML
    }

    set cardValue(v) {
        this._cardValue_e.innerHTML = v
    }

    get cardTitle() {
        return this._cardTitle_e.innerHTML
    }

    set cardTitle(v) {
        this._cardTitle_e.innerHTML = v
    }
} // enc CMPFinancialIndicatorCard


// Chart
// depends: 
//  jquery.js
//  chartist.min.js
//  chartist.min.css
class CMPFinancialChart {
    constructor(dataset, chartHolder) {
        this.parent_e = chartHolder
        this.row_container = document.getElementById('stk-container-chart-container')
        this.e = document.createElement('div')
        this.e.classList.add('ct-chart')
        // this.e.classList.add('ct-perfect-fourth')   

        chartHolder.appendChild(this.e)
        this._dataset = dataset
        this._chartistConfig = {
            axisY: {
                labelInterpolationFnc: (v) => {
                    return '£' + (v / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 }) + 'k'
                }
            },
            fullWidth: true,
            showArea: true,
            height: 400,
            //lineSmooth: true,
            // chartPadding: {
            //     right: 40
            // }

        }
        this.chartist = new Chartist.Line('.ct-chart', this._dataset, this._chartistConfig)
    }

    get dataset() {
        return this._dataset
    }

    set dataset(v) {
        this._dataset = v
        this.chartist.update(this._dataset)
    }
} // end CMPFinancialChart


//CMPListing - listings 
//depends: 
//data_storage.js
class CMPListing {
    constructor(parent_e, data) {
        this.parent_e = ''
        this.holder = parent_e
        this.e = document.createElement('div')
        this.e.classList.add('CMPListings_container')
        this.e.setAttribute('id', 'listing_' + data.id)
        // UNCOMMENT PRICE AND STATE WHEN CORRECT DATA IS READY
        this.e.innerHTML =
            `
            <div class="row m-0">
                <div class="col-12 col-sm-6 col-md-3 col-lg-6 col-xl-3 CMPListings_img_holder p-0">
                    <div class="CMPListings_img" style="background-image: url('${data.thumbnail_file}'); 
                                                            background-repeat: no-repeat;
                                                            background-size:cover;
                                                            background-position: center;">
                    </div>
                </div>

                <div class="col-6 col-sm-6 col-md-3 col-lg-6 col-xl-3 CMPListing_section section_name">
		            <div id="debugtool${data.id}"></div>
                    <div class="CMPListings_name"><strong>Name</strong></div>
                    <div class="CMPListings_description">${data.name}</div>
                    <div class="listing-price">
                        <strong>Price: 
                            <span class="CMPListings_symbol">${data.symbol}</span>
                            <span class="pt-1 CMPListings_price">${data.default_daily_price}</span> per night
                        </strong>
                    </div>  
                    <a class="d-none d-sm-block CMPListings_show_listings" role="button"
                            data-toggle="collapse"
                            data-target="#lsiting-collapse${data.id}"
                            aria-expanded="false"
                            aria-controls="lsiting-collapse${data.id}">
                    Show location
                    </a>
                </div>

                <div class="col-6 col-sm-6 col-md-3 col-lg-6 col-xl-3 CMPListing_section location">
                    <div>
                        <strong>Location</strong>
                        <div class="CMPListings_location">${data.street}, ${data.city}, ${data.state}, ${data.zipcode}</div>                                
                    </div>
                    <div class="CMPListings_guests pt-1"><strong>Guests:</strong> ${data.person_capacity}</div>
                    <div class="CMPListings_nights"><strong>Min nights:</strong> ${data.min_nights}</div>
                </div>

                <div class="col-9 col-sm-6 col-md-3 col-lg-6 col-xl-3 CMPListing_section check d-inline-flex">
                    <div class="container">
                        <div class="row">
                            <div class="col-6 text-center">
                                <div class="CMPListings_check_in"><strong>Check-in</strong></div>
                                <div class="CMPListings_check_in">${data.checkin_start.slice(0, 2)}PM-${data.checkin_end.slice(0, 2)}PM</div>
                            </div>
                            <div class="col-6 text-center">
                                <div class="CMPListings_check_out"><strong>Check-out</strong></div>
                                <div class="CMPListings_check_out">${data.checkout.slice(0, 2)}AM</div>
                            </div>
                            <div class="col-9 m-auto">
                                <div class="custom-btn brand-color-bg CMPListing_btn"></div>
                            </div>
                            <a class="col-9 text-center d-block d-sm-none CMPListings_show_listings" role="button"
                                    data-toggle="collapse"
                                    data-target="#lsiting-collapse${data.id}"
                                    aria-expanded="false"
                                    aria-controls="lsiting-collapse${data.id}">
                            Show location
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 collapse multi-collapse CMPListing_id" id="lsiting-collapse${data.id}">
                        <br>
                        <iframe
                            width="100%"
                            height="180"
                            frameborder="0" style="border: 1px solid #ddd; margin=10px"
                            src="https://www.google.com/maps/embed/v1/search?key=AIzaSyCxjVlWzLLX8oocaNTD1sbAN007LT-RzIY&q=${data.lat},${data.lng}" allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </div>
            `
        this.calendar_btn_e = this.e.getElementsByClassName('CMPListing_btn')
        for (let i = 0; i < this.calendar_btn_e.length; i++) {
            new CMPButtons('calendar', '', '', this.calendar_btn_e[0])
        }
        this.listing_container_e = this.e.getElementsByClassName('CMPListings_container')[0]
        for (let i = 0; i < this.e.getElementsByClassName('CMPListings_show_listings').length; i++) {
            let button_e = this.e.getElementsByClassName('CMPListings_show_listings')[i]
            button_e.addEventListener('click', () => {
                if (button_e.innerHTML === "Hide location") {
                    button_e.innerHTML = "Show location"
                } else {
                    button_e.innerHTML = "Hide location"
                }
            })
        }
        this.holder.appendChild(this.e)
    }
}


// CMPListingData - listings data set 
//depends: 
//CMPlisting
//data_storage.js
class CMPListingData {
    constructor(data, listing_holder) {
        this.parent_e = listing_holder
        if (data) {
            this.load_data(data)
        }
        this.debug_tool =  new DebugTool(data)
    }

    load_data(data) {
        this.listings = []
        //this._data = data
        for (var i in data.listings) {
            this.listings.push(new CMPListing(this.parent_e, data.listings[i]))
        }
    }

    //cmp_listings._data.listings[0].id
    hide_listings(ids) {
        for (var i in ids) {
            this.hide_listing(ids[i])
        }
    }

    show_listings(ids) {
        for (var i in ids) {
            this.show_listing(ids[i])
        }
    }

    hide_listing(listing_id) {
        document.getElementById('listing_' + listing_id).style.display = 'none'
    }

    show_listing(listing_id) {
        document.getElementById('listing_' + listing_id).style.display = 'block'
    }
}


// DebugTool
// Instance for listings: 
// cmp_listings.debug_tool.turn_on() / cmp_listings.debug_tool.turn_off()
class DebugTool {
    constructor(data, debug_id) {
        this._data = data
        this.data = data.listings
        for (var i in this.data) {
            this.listing_id = this.data[i].id
           // console.log(`http://#.com/listing/${this.listing_id}`)
            this.parent_e = debug_id
            debug_id = document.getElementById(`debugtool${this.listing_id}`)
            this.e = document.createElement('div')
            this.e.classList.add('CMPdebugtool')
           // this.e.classList.add('text-danger')
            this.e.innerHTML =
                `<a href="http://#.com/listing/${this.listing_id}" target="_blank" class="text-danger">
                <strong>Listing id: ${this.listing_id}</strong>
                </a>
            `
            this.e.style.display = 'none'
            debug_id.appendChild(this.e)
        }
    }
    
    turn_on() {      
        var debugTool = document.getElementsByClassName("CMPdebugtool");
        for ( var i=0; i< debugTool.length; i++ ) {
        debugTool[i].style.display = 'block';
        }
    }

    turn_off() {
        var debugTool = document.getElementsByClassName("CMPdebugtool");
        for (var i = 0; i < debugTool.length; i++) {
            debugTool[i].style.display = 'none';
        }
    }
} // End DebugTool


class CMPButtons {
    constructor(button_label, button_href, button_func, login_holder) {
        this.parent_e = login_holder
        this.e = document.createElement('div')
        this.e.classList.add('CMPButtons')
        this.e.innerHTML =
            `<a href="#${button_href}" class="col-12 login_btn" onclick="${button_func}">${button_label}</a>`
        login_holder.appendChild(this.e)
        this.login_button_e = this.e.getElementsByClassName('login_btn')[0]
        this.body = document.getElementsByTagName('body')[0]
        document.addEventListener('keyup', (e) => {
            if (e.keyCode === 13 && this.body.classList.contains('login')) {
                this.login_button_e.click()
            }
        })
    }
}


//CMPInput
class CMPInput {
    constructor(input_id, input_type, input_placeholder, input_warning, input_holder){
        this.parent_e = input_holder
        this.e = document.createElement('div')
       // this.e.classList.add('col-12')
        this.e.innerHTML = 
        `<div class="col-12 warning wrong-cred forgot m-0">${input_warning}</div> 
        <input id="${input_id}" type="${input_type}" class="input col-12" placeholder="${input_placeholder}">
        `
        this.warning_message_e = this.e.getElementsByClassName('warning')[0] 
        this.warning_message_e.style.display = 'none'
        this.parent_e.appendChild(this.e)
    }

    show_warning() {
        this.warning_message_e.style.display = 'block'
    }

    hide_warning() {
        this.warning_message_e.style.display = 'none'
    }
} // End CMPInput


//CMPForgotPassword
class CMPForgotPassword {
    constructor(){
        this.forgot_password = document.getElementById('forgot')
        this.forgot_password.addEventListener('click', () => {
            this.hide_inputs = document.getElementById('login_inputs')
            this.hide_inputs.style.display = 'none' 
            this.forgot_email = document.getElementById('forgot_email')
            new CMPInput('forgot_email', 'email', 'Enter your email', '', this.forgot_email)            
            this.forgot_password.classList.add('prevent_click')
            this.hide_login_btn = document.querySelector('#app_login a')
            this.hide_login_btn.style.display = 'none'
            this.send_btn = document.getElementById('app_login')
            new CMPButtons('send', '#', '', this.send_btn)
            })   
    }
} //End CMPForgotPassword
