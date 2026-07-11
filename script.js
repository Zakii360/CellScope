/*
==========================================================
CellScope

script.js v2

Main Controller

==========================================================
*/


document.addEventListener(
"DOMContentLoaded",
()=>{


const CellScopeInput =
document.getElementById(
    "phoneInput"
);


const CellScopeButton =
document.getElementById(
    "analyzeBtn"
);


const CellScopeResults =
document.getElementById(
    "results"
);






// ======================================================
// Helpers
// ======================================================


function set(id,value){


    const element =
    document.getElementById(
        id
    );


    if(element){

        element.textContent =
        value ?? "-";

    }


}







function clearResults(){


    document
    .querySelectorAll(
        "strong"
    )
    .forEach(
        element=>{

            element.textContent="-";

        }
    );


    const list =
    document.getElementById(
        "summaryList"
    );


    if(list)
        list.innerHTML="";


}







function addSummary(text){


    const list =
    document.getElementById(
        "summaryList"
    );


    if(!list)
        return;



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
// Render Functions
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
        "1"
    );


}









// ======================================================
// Analyzer
// ======================================================


async function analyze(){



    const value =
    CellScopeInput.value.trim();



    if(!value)
        return;




    clearResults();



    CellScopeResults.classList.remove(
        "hidden"
    );



    set(
        "status",
        "Analyzing..."
    );




    try{


        addSummary(
            "Parsing phone number"
        );



        const phone =
        CellPhone.normalize(
            value
        );



        renderPhone(
            phone
        );




        addSummary(
            "Detecting geographic information"
        );



        const geo =
        CellGeo.analyze(
            phone
        );



        renderGeo(
            geo
        );





        addSummary(
            "Checking carrier database"
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
            "Checking reputation"
        );



        const reputation =
        CellReputation.lookup(
            phone
        );



        renderReputation(
            reputation
        );







        addSummary(
            "Searching local database"
        );



        const database =
        CellDB.lookup(
            phone.international
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
            "Error"
        );


        addSummary(
            error.message
        );



    }



}








// ======================================================
// Events
// ======================================================


if(CellScopeButton){


    CellScopeButton.onclick =
    analyze;


}



if(CellScopeInput){


    CellScopeInput.onkeydown =
    event=>{


        if(
            event.key==="Enter"
        ){

            analyze();

        }


    };


}







document
.querySelectorAll(
".example"
)
.forEach(
button=>{


button.onclick =
()=>{


CellScopeInput.value =
button.textContent;


analyze();


};


});







console.log(

"%cCellScope Controller v2 Loaded",

"color:#00d4ff;font-weight:bold;"

);



});
