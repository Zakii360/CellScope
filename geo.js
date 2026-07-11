/*
==========================================================
CellScope

geo.js v2

Geographic Intelligence Engine

==========================================================
*/


window.CellGeo = {



// ======================================================
// Area Code Database
// ======================================================


areaCodes:{


"212":{
city:"New York City",
region:"New York",
country:"United States"
},


"213":{
city:"Los Angeles",
region:"California",
country:"United States"
},


"305":{
city:"Miami",
region:"Florida",
country:"United States"
},


"415":{
city:"San Francisco",
region:"California",
country:"United States"
},


"44":{
city:"London",
region:"England",
country:"United Kingdom"
}


},







// ======================================================
// Country Lookup
// ======================================================


lookup(phone){



    const code =
    phone.countryCode;



    if(
        !window.CellDB
    ){


        return {

            country:"Unknown",
            region:"Unknown",
            timezone:"Unknown",
            callingCode:code

        };


    }






    const data =
    CellDB.getCountry(
        code
    );



    if(!data){


        return {


            country:"Unknown",

            region:"Unknown",

            timezone:"Unknown",

            continent:"Unknown",

            callingCode:code


        };


    }






    return {


        country:
        data.country,


        region:
        data.region,


        timezone:
        data.timezone,


        continent:
        data.continent,


        callingCode:
        code



    };



},







// ======================================================
// Area Code Lookup
// ======================================================


lookupArea(phone){



    const number =
    phone.international
    .replace(
        /\D/g,
        ""
    );



    for(
        const code in this.areaCodes
    ){


        if(
            number.includes(code)
        ){


            return this.areaCodes[code];


        }


    }



    return null;


},







// ======================================================
// Full Analysis
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



        country:
        base.country,


        region:
        area?.region
        ||
        base.region,


        timezone:
        base.timezone,


        continent:
        base.continent
        ||
        "Unknown",


        callingCode:
        base.callingCode,



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

"%cCellScope Geo Engine v2 Loaded",

"color:#00d4ff;font-weight:bold;"

);
