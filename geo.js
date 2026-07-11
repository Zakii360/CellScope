/*
==========================================================
CellScope

geo.js v1

Phone Geographic Intelligence Engine

Uses:
- Calling codes
- Prefix intelligence
- Country database

==========================================================
*/


window.CellGeo = {





// ======================================================
// Country Detection
// ======================================================


lookup(phone){



    const code =
    phone.countryCode;



    const country =
    CellDB.getCountry(
        code
    );



    if(!country){


        return {


            country:
            "Unknown",


            region:
            "Unknown",


            timezone:
            "Unknown",


            callingCode:
            code



        };


    }






    return {



        country:
        country.country,



        region:
        country.region,



        timezone:
        country.timezone,



        continent:
        country.continent,



        callingCode:
        code



    };





},







// ======================================================
// Area Code Intelligence
// ======================================================


areaCodes:{



"212":{

city:
"New York City",

region:
"New York",

country:
"United States"

},




"213":{

city:
"Los Angeles",

region:
"California",

country:
"United States"

},




"305":{

city:
"Miami",

region:
"Florida",

country:
"United States"

},




"415":{

city:
"San Francisco",

region:
"California",

country:
"United States"

},




"44":{

city:
"London",

region:
"England",

country:
"United Kingdom"

}



},







// ======================================================
// Area Lookup
// ======================================================


lookupArea(number){



    const digits =
    number.international
    .replace(
        /\D/g,
        ""
    );



    for(
        const code in this.areaCodes
    ){



        if(
            digits.includes(
                code
            )
        ){



            return this.areaCodes[code];


        }


    }



    return null;


},







// ======================================================
// Full Geographic Report
// ======================================================


analyze(phone){



    const base =
    this.lookup(
        phone
    );



    const area =
    this.lookupArea(
        phone
    );




    return {



        ...base,



        city:
        area?.city
        ||
        "Unknown",



        state:
        area?.region
        ||
        "Unknown"



    };



}






};





console.log(

"%cCellScope Geo Engine Loaded",

"color:#00d4ff;font-weight:bold;"

);
