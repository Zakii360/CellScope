/*
==========================================================
CellScope

carrier.js v2

Carrier Intelligence Engine

==========================================================
*/


window.CellCarrier = {



// ======================================================
// MCC/MNC Guessing
// ======================================================


extractMCCMNC(phone){



    const code =
    phone.countryCode;



    switch(code){



        case "+1":

            return [

                "310260",
                "310410",
                "310012"

            ];



        case "+44":

            return [

                "23410"

            ];



        case "+81":

            return [

                "44010"

            ];



        default:

            return [];



    }



},







// ======================================================
// Carrier Lookup
// ======================================================


lookup(phone,geo){



    const possible =
    this.extractMCCMNC(
        phone
    );



    if(
        window.CellDB
    ){



        for(
            const id of possible
        ){



            const data =
            CellDB.getCarrier(
                id
            );



            if(data){



                return {



                    carrier:
                    data.carrier,


                    network:
                    data.network,


                    mcc:
                    data.mcc,


                    mnc:
                    data.mnc,


                    technology:
                    data.technology,


                    country:
                    data.country,


                    confidence:
                    "Database Match"



                };



            }


        }


    }







    return {



        carrier:
        "Unknown",


        network:
        "Unknown",


        mcc:
        "-",


        mnc:
        "-",


        technology:
        "Unknown",


        country:
        geo?.country
        ||
        "Unknown",


        confidence:
        "No Match"



    };



}






};







console.log(

"%cCellScope Carrier Engine v2 Loaded",

"color:#00d4ff;font-weight:bold;"

);
