/*
==========================================================
CellScope
script.js

Main Application Controller
==========================================================
*/


const input = document.getElementById("phoneInput");
const button = document.getElementById("analyzeBtn");
const results = document.getElementById("results");



// ========================================================
// Helpers
// ========================================================

function set(id, value){

    const element = document.getElementById(id);

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



// ========================================================
// Summary Renderer
// ========================================================

function renderSummary(items){

    const list =
        document.getElementById(
            "summaryList"
        );


    if(!list)
        return;


    list.innerHTML="";


    items.forEach(item=>{


        const li =
            document.createElement("li");


        li.textContent =
            "• " + item;


        list.appendChild(li);


    });


}



// ========================================================
// Main Analyzer
// ========================================================

function analyze(){


    const raw =
        input.value.trim();



    if(!raw){

        alert(
            "Enter a phone number."
        );

        return;

    }



    let phone;



    try{


        phone =
        libphonenumber.parsePhoneNumber(raw);



    }

    catch{


        alert(
            "Invalid phone format."
        );

        return;

    }





    results.classList.remove(
        "hidden"
    );





    // ----------------------------------------------------
    // Validation
    // ----------------------------------------------------


    const valid =
        phone.isValid();


    const possible =
        phone.isPossible();



    let type="-";



    if(
        typeof phone.getType === "function"
    ){

        type =
        titleCase(
            phone.getType()
        );

    }




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







    // ----------------------------------------------------
    // Formatting
    // ----------------------------------------------------


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







    // ----------------------------------------------------
    // Technical Data
    // ----------------------------------------------------


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







    // ----------------------------------------------------
    // Breakdown
    // ----------------------------------------------------


    set(
        "breakCountry",
        "+" +
        phone.countryCallingCode
    );


    set(
        "breakNational",
        phone.nationalNumber
    );







    // ----------------------------------------------------
    // Metadata Lookup
    // ----------------------------------------------------


    let areaCode="-";

    let region="-";

    let timezone="-";

    let carrier="-";



    if(
        window.CellScopeDB &&
        phone.country === "US"
    ){


        areaCode =
        phone.nationalNumber
        .substring(0,3);



        const area =
        CellScopeDB
        .areaCodes[areaCode];



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
        "breakArea",
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







    // ----------------------------------------------------
    // Intelligence Engine
    // ----------------------------------------------------


    if(window.CellScopeIntel){



        const intel =
        CellScopeIntel.analyze(
            phone
        );



        const confidence =
        intel.confidence;



        set(
            "confidence",
            confidence.icon +
            " " +
            confidence.label
        );



        set(
            "analysisStatus",
            "Complete"
        );



        const summary =
        CellScopeIntel.summary({

            valid,

            country:
                phone.country,

            region,

            timezone,

            type


        });



        renderSummary(
            summary
        );



    }



}



// ========================================================
// Events
// ========================================================


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




// ========================================================
// Example Numbers
// ========================================================


document
.querySelectorAll(".example")
.forEach(btn=>{


    btn.addEventListener(
        "click",
        ()=>{


            input.value =
            btn.textContent.trim();


            analyze();


        }
    );


});




// ========================================================
// Startup
// ========================================================


window.addEventListener(
    "load",
    ()=>{

        input.focus();


        console.log(
            "%cCellScope Online",
            "color:#4da3ff;font-size:20px;font-weight:bold;"
        );


    }
);
