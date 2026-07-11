/*
==========================================================
CellScope

reputation.js v1

Phone Reputation Intelligence Engine

Checks:
- Known numbers
- Spam patterns
- Scam indicators
- Risk score

==========================================================
*/


window.CellReputation = {





// ======================================================
// Risk Calculator
// ======================================================


calculateRisk(number){



    let score = 0;



    const digits =
    number.international
    .replace(
        /\D/g,
        ""
    );






    // Suspicious prefixes

    for(
        const prefix of
        CellDB.spamPatterns.highRiskCountries
    ){



        if(
            number.international
            .startsWith(
                prefix
            )
        ){


            score += 40;


        }


    }






    // Very repetitive numbers


    if(
        /(.)\1{4,}/
        .test(
            digits
        )
    ){


        score += 25;


    }







    return score;



},







// ======================================================
// Category Detection
// ======================================================


category(number){



    const known =
    CellDB.lookup(
        number.international
    );



    if(
        known
    ){


        return known.category;


    }



    return "Unknown";



},







// ======================================================
// Database Search
// ======================================================


lookup(number){



    const known =
    CellDB.lookup(
        number.international
    );



    const risk =
    this.calculateRisk(
        number
    );







    let level;



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

    else{


        level =
        "Low Risk";


    }








    return {



        spam:

        level,



        riskScore:

        risk,



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

        this.category(
            number
        ),



        source:

        known
        ?
        known.source
        :
        "Internal Intelligence"



    };



}







};





console.log(

"%cCellScope Reputation Engine Loaded",

"color:#00d4ff;font-weight:bold;"

);
