/*
==========================================================
CellScope

database.js v2

Phone Intelligence Database

DATA ONLY
No DOM
No Events
No UI Logic

==========================================================
*/


window.CellDB = {

version:"2.0.0",



// ======================================================
// Country Database
// ======================================================

countries:{


"+1":{
country:"United States / Canada",
region:"North America",
timezone:"America/New_York",
continent:"North America"
},


"+44":{
country:"United Kingdom",
region:"Europe",
timezone:"Europe/London",
continent:"Europe"
},


"+81":{
country:"Japan",
region:"Asia",
timezone:"Asia/Tokyo",
continent:"Asia"
},


"+33":{
country:"France",
region:"Europe",
timezone:"Europe/Paris",
continent:"Europe"
},


"+49":{
country:"Germany",
region:"Europe",
timezone:"Europe/Berlin",
continent:"Europe"
},


"+61":{
country:"Australia",
region:"Oceania",
timezone:"Australia/Sydney",
continent:"Oceania"
},


"+91":{
country:"India",
region:"Asia",
timezone:"Asia/Kolkata",
continent:"Asia"
},


"+86":{
country:"China",
region:"Asia",
timezone:"Asia/Shanghai",
continent:"Asia"
},


"+7":{
country:"Russia / Kazakhstan",
region:"Europe / Asia",
timezone:"Europe/Moscow",
continent:"Europe / Asia"
}


},







// ======================================================
// Carrier Database
// ======================================================


carriers:{


"310260":{

country:"United States",
carrier:"T-Mobile",
network:"T-Mobile USA",
technology:"4G / 5G",
mcc:"310",
mnc:"260"

},


"310410":{

country:"United States",
carrier:"AT&T",
network:"AT&T Mobility",
technology:"4G / 5G",
mcc:"310",
mnc:"410"

},


"310012":{

country:"United States",
carrier:"Verizon",
network:"Verizon Wireless",
technology:"4G / 5G",
mcc:"310",
mnc:"012"

},


"23410":{

country:"United Kingdom",
carrier:"O2",
network:"Telefonica UK",
technology:"4G / 5G",
mcc:"234",
mnc:"10"

},


"44010":{

country:"Japan",
carrier:"NTT Docomo",
network:"NTT DOCOMO",
technology:"4G / 5G",
mcc:"440",
mnc:"10"

}


},







// ======================================================
// Known Numbers
// ======================================================


knownNumbers:{


"+18005551234":{

name:"Example Service",
category:"Business",
source:"CellScope Database"

},


"+18005550100":{

name:"Customer Support Example",
category:"Support",
source:"CellScope Database"

}


},







// ======================================================
// Spam Intelligence
// ======================================================


spamPatterns:{


keywords:[

"spam",
"scam",
"fraud",
"robocall",
"phishing",
"telemarketing"

],


highRiskCountries:[

"+234",
"+233",
"+880",
"+92"

]


},







// ======================================================
// Functions
// ======================================================


lookup(number){


return (

this.knownNumbers[number]

||

null

);


},




getCountry(code){


return (

this.countries[code]

||

null

);


},




getCarrier(id){


return (

this.carriers[id]

||

null

);


}



};






console.log(

"%cCellScope Database v2 Loaded",

"color:#00d4ff;font-weight:bold;"

);
