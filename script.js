/*
==========================================================
CellScope
script.js

Main application controller
==========================================================
*/


const input = document.getElementById("phoneInput");
const button = document.getElementById("analyzeBtn");
const results = document.getElementById("results");


// ---------------------------------------------------------
// Helpers
// ---------------------------------------------------------

function set(id,value){

    const element=document.getElementById(id);

    if(element){
        element.textContent =
            value ?? "-";
    }

}


function yesNo(value){

    return value
        ? "✓ Yes"
        : "✕ No";

}


function titleCase(value){

    if(!value)
        return "-";


    return value
        .toLowerCase()
        .replace(/\b\w/g,c=>c.toUpperCase());

}



// ---------------------------------------------------------
// Main Analysis
// ---------------------------------------------------------

function analyze(){


    const raw=input.value.trim();


    if(!raw){

        alert(
            "Enter a phone number first."
        );

        return;

    }



    let phone;


    try{

        phone =
            libphonenumber.parsePhoneNumber(raw);


    }catch(error){


        alert(
            "Unable to analyze this number."
        );

        return;

    }



    results.classList.remove("hidden");



    /*
    Basic phone intelligence
    */


    const valid =
        phone.isValid();


    const possible =
        phone.isPossible();



    let type="-";


    if(typeof phone.getType==="function"){

        type =
        titleCase(
            phone.getType()
        );

    }



    /*
    Formats
    */


    set(
        "valid",
        yesNo(valid)
    );


    set(
        "possible",
        yesNo(possible)
    );


    set(
        "type",
        type
    );


    set(
        "country",
        phone.country
    );


    set(
        "callingCode",
        "+" +
        phone.countryCallingCode
    );



    set(
        "e164",
        phone.number
    );


    set(
        "international",
        phone.formatInternational()
    );


    set(
        "national",
        phone.formatNational()
    );


    set(
        "rfc",
        phone.getURI()
    );



    /*
    Raw data
    */


    set(
        "rawInput",
        raw
    );


    set(
        "nationalNumber",
        phone.nationalNumber
    );


    set(
        "countryCode",
        phone.countryCallingCode
    );




    /*
    Database Intelligence
    */


    let areaCode="-";
    let region="-";
    let timezone="-";
    let carrier="-";



    if(
        window.CellScopeDB &&
        phone.country==="US"
    ){


        areaCode =
            phone.nationalNumber
            .substring(0,3);



        const area =
            CellScopeDB.areaCodes[
                areaCode
            ];



        if(area){


            region =
                area.region;


            timezone =
                area.timezone;


            carrier =
                area.carrier;


        }


    }




    set(
        "areaCode",
        areaCode
    );


    set(
        "region",
        region
    );


    set(
        "timezone",
        timezone
    );


    set(
        "carrier",
        carrier
    );




    /*
    Advanced Intelligence
    */


    if(
        window.CellScopeIntel
    ){


        const intel =
            CellScopeIntel.analyze(
                phone
            );


        console.log(
            "CellScope Intelligence:",
            intel
        );


        console.log(
            CellScopeIntel.summary({

                valid,

                country:
                    phone.country,

                region,

                timezone,

                type

            })

        );


    }



}




// ---------------------------------------------------------
// Events
// ---------------------------------------------------------


button.addEventListener(
    "click",
    analyze
);



input.addEventListener(
    "keydown",
    event=>{

        if(event.key==="Enter"){

            analyze();

        }

    }

);



// ---------------------------------------------------------
// Example numbers
// ---------------------------------------------------------


document
.querySelectorAll(".example")
.forEach(button=>{


    button.addEventListener(
        "click",
        ()=>{


            input.value =
                button.textContent.trim();


            analyze();


        }
    );


});



// ---------------------------------------------------------
// Startup
// ---------------------------------------------------------


window.addEventListener(
    "load",
    ()=>{


        input.focus();


        console.log(
            "%cCellScope Ready",
            "color:#4da3ff;font-size:18px;font-weight:bold;"
        );


    }
);
