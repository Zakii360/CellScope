/*
==========================================================
CellScope

phone.js v2

Phone Number Intelligence Engine

==========================================================
*/


window.CellPhone = {



// ======================================================
// Clean Input
// ======================================================


clean(number){


    return String(number)

    .replace(
        /[^0-9+]/g,
        ""
    )

    .trim();


},







// ======================================================
// Normalize
// ======================================================


normalize(input){



    const original =
    input;



    let number =
    this.clean(
        input
    );



    // Convert 00 prefix

    if(
        number.startsWith("00")
    ){

        number =
        "+" +
        number.substring(2);

    }






    // Default US numbers

    if(
        !number.startsWith("+")
    ){


        number =
        "+1" +
        number;


    }






    const countryCode =
    this.getCountryCode(
        number
    );






    const type =
    this.type(
        number,
        countryCode
    );






    return {


        original,


        international:
        number,


        countryCode,


        country:
        this.countryName(
            countryCode
        ),


        valid:
        this.validate(
            number
        ),


        type,


        mobile:
        type === "Mobile",


        landline:
        type === "Landline"



    };


},







// ======================================================
// Country Code
// ======================================================


getCountryCode(number){



    if(
        !window.CellDB
    )
        return "Unknown";



    const codes =
    Object.keys(
        CellDB.countries
    )
    .sort(
        (a,b)=>
        b.length-a.length
    );



    for(
        const code of codes
    ){


        if(
            number.startsWith(code)
        ){

            return code;

        }


    }



    return "Unknown";


},







// ======================================================
// Country Name
// ======================================================


countryName(code){



    if(
        window.CellDB
        &&
        CellDB.countries[code]
    ){


        return CellDB.countries[code].country;


    }



    return "Unknown";


},







// ======================================================
// Validation
// ======================================================


validate(number){



    const digits =
    number.replace(
        /\D/g,
        ""
    );



    return (

        digits.length >= 7

        &&

        digits.length <= 15

    );


},







// ======================================================
// Number Type
// ======================================================


type(number,code){



    /*
    
    This is a starter
    numbering intelligence layer.

    Later expanded with
    full numbering plans.

    */



    if(
        code === "+44"
    ){


        if(
            number.startsWith("+447")
        ){

            return "Mobile";

        }


        return "Landline";


    }







    if(
        code === "+81"
    ){


        if(
            number.startsWith("+817")
            ||
            number.startsWith("+818")
        ){

            return "Mobile";

        }


    }







    if(
        code === "+1"
    ){


        return "Mobile / Landline";


    }






    return "Unknown";


},







// ======================================================
// Format
// ======================================================


format(number){



    const clean =
    number.replace(
        /\D/g,
        ""
    );



    return "+" + clean;


}







};






console.log(

"%cCellScope Phone Engine v2 Loaded",

"color:#00d4ff;font-weight:bold;"

);
