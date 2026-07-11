/*
==========================================================
CellScope

reputation.js v2

Phone Reputation Intelligence Engine

==========================================================
*/


window.CellReputation = {



// ======================================================
// Risk Score
// ======================================================


calculateRisk(phone){



    let score = 0;



    const number =
    phone.international;



    if(
        window.CellDB
    ){



        for(
            const prefix of
            CellDB.spamPatterns.highRiskCountries
        ){


            if(
                number.startsWith(prefix)
            ){


                score += 40;


            }


        }



    }







    const digits =
    number.replace(
        /\D/g,
        ""
    );



    // Repeating numbers

    if(
        /(.)\1{4,}/
        .test(
            digits
        )
    ){


        score += 25;


    }







    return Math.min(
        score,
        100
    );



},







// ======================================================
// Lookup
// ======================================================


lookup(phone){



    let known = null;



    if(
        window.CellDB
    ){


        known =
        CellDB.lookup(
            phone.international
        );


    }







    const risk =
    this.calculateRisk(
        phone
    );






    let level =
    "Low Risk";



    if(
        risk >= 70
    ){

        level =
        "High Risk";

    }

    else if(
        risk >= 40
    ){

        level =
        "Medium Risk";

    }







    return {



        spam:
        level,



        riskScore:
        risk + "%",



        reports:
        known
        ?
        1
        :
        0,



        business:
        known
        ?
        known.name
        :
        "Unknown",



        category:
        known
        ?
        known.category
        :
        "Unknown",



        source:
        known
        ?
        known.source
        :
        "CellScope Intelligence"



    };



}






};







console.log(

"%cCellScope Reputation Engine v2 Loaded",

"color:#00d4ff;font-weight:bold;"

);
