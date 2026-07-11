/*
==========================================================
CellScope

script.js v1

Main Intelligence Controller

==========================================================
*/


const input =
document.getElementById(
    "phoneInput"
);


const button =
document.getElementById(
    "analyzeBtn"
);


const results =
document.getElementById(
    "results"
);






// ======================================================
// UI Helpers
// ======================================================


function set(id,value){


    const element =
    document.getElementById(
        id
    );


    if(element){

        element.textContent =
        value || "-";

    }


}





function clearResults(){


    document
    .querySelectorAll(
        "strong"
    )
    .forEach(el=>{

        el.textContent="-";

    });



    document
    .getElementById(
        "summaryList"
    )
    .innerHTML="";


}







function addSummary(text){



    const list =
    document.getElementById(
        "summaryList"
    );



    const item =
    document.createElement(
        "li"
    );



    item.textContent =
    "• " + text;



    list.appendChild(
        item
    );


}









// ======================================================
// Render Phone Data
// ======================================================


function renderPhone(data){



    set(
        "original",
        data.original
    );


    set(
        "international",
        data.international
    );


    set(
        "countryCode",
        data.countryCode
    );


    set(
        "numberType",
        data.type
    );



    set(
        "valid",
        data.valid
        ?
        "Yes"
        :
        "No"
    );



    set(
        "mobile",
        data.mobile
        ?
        "Yes"
        :
        "No"
    );


    set(
        "landline",
        data.landline
        ?
        "Yes"
        :
        "No"
    );



}








// ======================================================
// Render Geo
// ======================================================


function renderGeo(data){



    if(!data)
        return;



    set(
        "country",
        data.country
    );


    set(
        "region",
        data.region
    );


    set(
        "timezone",
        data.timezone
    );


    set(
        "callingCode",
        data.callingCode
    );



}









// ======================================================
// Render Carrier
// ======================================================


function renderCarrier(data){



    if(!data)
        return;



    set(
        "carrier",
        data.carrier
    );


    set(
        "network",
        data.network
    );


    set(
        "mcc",
        data.mcc
    );


    set(
        "mnc",
        data.mnc
    );


    set(
        "technology",
        data.technology
    );



}









// ======================================================
// Render Reputation
// ======================================================


function renderReputation(data){



    if(!data)
        return;




    set(
        "spam",
        data.spam
    );


    set(
        "scams",
        data.reports
    );


    set(
        "business",
        data.business
    );


    set(
        "category",
        data.category
    );



}









// ======================================================
// Render Database
// ======================================================


function renderDatabase(data){



    if(!data)
        return;



    set(
        "knownName",
        data.name
    );


    set(
        "source",
        data.source
    );


    set(
        "records",
        data.records
    );



}









// ======================================================
// Main Analyzer
// ======================================================


async function analyze(){



    const value =
    input.value.trim();



    if(!value)
        return;



    clearResults();



    results.classList.remove(
        "hidden"
    );



    set(
        "status",
        "Analyzing..."
    );



    try{






        addSummary(
            "Normalizing phone number"
        );



        const phone =
        CellPhone.normalize(
            value
        );



        renderPhone(
            phone
        );





        addSummary(
            "Detecting location"
        );



        const geo =
        CellGeo.lookup(
            phone
        );



        renderGeo(
            geo
        );







        addSummary(
            "Checking carrier intelligence"
        );



        const carrier =
        CellCarrier.lookup(
            phone,
            geo
        );



        renderCarrier(
            carrier
        );








        addSummary(
            "Checking reputation database"
        );



        const reputation =
        CellReputation.lookup(
            phone
        );



        renderReputation(
            reputation
        );








        addSummary(
            "Searching local intelligence database"
        );



        const database =
        CellDB.lookup(
            phone
        );



        renderDatabase(
            database
        );







        set(
            "lookup",
            "Complete"
        );


        set(
            "confidence",
            "🟢 Local Intelligence"
        );


        set(
            "status",
            "Complete"
        );




    }



    catch(error){



        console.error(
            error
        );


        set(
            "status",
            "Failed"
        );


        addSummary(
            error.message
        );



    }




}









// ======================================================
// Events
// ======================================================


button.onclick =
analyze;



input.onkeydown =
event=>{


    if(
        event.key==="Enter"
    ){

        analyze();

    }


};





document
.querySelectorAll(
    ".example"
)
.forEach(button=>{


    button.onclick =
    ()=>{


        input.value =
        button.textContent;


        analyze();


    };


});







console.log(

"%cCellScope Intelligence Controller Loaded",

"color:#00d4ff;font-weight:bold;"

);
