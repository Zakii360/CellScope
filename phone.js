/*
==========================================================
CellScope

phone.js v1

Phone Number Intelligence Engine

Handles:
- Normalization
- Validation
- Country detection
- Number classification

==========================================================
*/


window.CellPhone = {





// ======================================================
// Remove Formatting
// ======================================================


clean(number){


    return number

    .replace(
        /[^0-9+]/g,
        ""
    )

    .trim();



},







// ======================================================
// Normalize Number
// ======================================================


normalize(input){



    let original =
    input;



    let number =
    this.clean(
        input
    );



    if(
        number.startsWith(
            "00"
        )
    ){


        number =
        "+" +
        number.substring(
            2
        );


    }



    if(
        !number.startsWith(
            "+"
        )
    ){


        // Default North America

        number =
        "+1" +
        number;


    }






    const countryCode =
    this.getCountryCode(
        number
    );






    const country =
    CellDB.getCountry(
        countryCode
    );







    return {



        original,



        international:
        number,



        countryCode,



        country:
        country?.country
        ||
        "Unknown",



        valid:
        this.validate(
            number
        ),



        type:
        this.type(
            number
        ),



        mobile:
        this.type(
            number
        )
        ===
        "Mobile",



        landline:
        this.type(
            number
        )
        ===
        "Landline"



    };



},







// ======================================================
// Country Code Detection
// ======================================================


getCountryCode(number){



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
            number.startsWith(
                code
            )
        ){

            return code;

        }


    }



    return "Unknown";


},







// ======================================================
// Validate
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
// Number Type Detection
// ======================================================


type(number){



    const country =
    this.getCountryCode(
        number
    );



    const digits =
    number.replace(
        /\D/g,
        ""
    );




    /*
    
    Basic intelligence layer.

    Later expanded with
    national numbering plans.

    */



    if(
        country === "+1"
    ){


        if(
            digits.length===11
        ){


            return "Mobile / Landline";


        }


    }






    if(
        country === "+44"
    ){


        if(
            number.startsWith(
                "+447"
            )
        ){


            return "Mobile";


        }


        return "Landline";


    }






    if(
        country === "+81"
    ){


        if(
            number.startsWith(
                "+817"
            )
            ||
            number.startsWith(
                "+818"
            )
        ){


            return "Mobile";


        }


    }






    return "Unknown";



},







// ======================================================
// Display Format
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

"%cCellScope Phone Engine Loaded",

"color:#00d4ff;font-weight:bold;"

);
