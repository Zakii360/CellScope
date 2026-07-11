// =====================================================
// CellScope
// Public Phone Intelligence
// script.js
// =====================================================

const input = document.getElementById("phoneInput");
const button = document.getElementById("analyzeBtn");
const results = document.getElementById("results");

// --------------------------------
// Helpers
// --------------------------------

function set(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value ?? "-";
}

function yesNo(value) {
    return value ? "✓ Yes" : "✕ No";
}

function capitalize(text) {
    if (!text) return "-";
    return text
        .replace(/_/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());
}

// -----------------------------------------------------
// Analyze
// -----------------------------------------------------

function analyze() {

    const value = input.value.trim();

    if (!value) {
        alert("Enter a phone number.");
        return;
    }

    let phone;

    try {

        phone = libphonenumber.parsePhoneNumber(value);

    } catch {

        alert("Unable to parse that phone number.");
        return;

    }

    results.classList.remove("hidden");

    //-----------------------------------
    // Overview
    //-----------------------------------

    set("valid", yesNo(phone.isValid()));

    if (typeof phone.isPossible === "function")
        set("possible", yesNo(phone.isPossible()));
    else
        set("possible", "-");

    if (typeof phone.getType === "function")
        set("type", capitalize(phone.getType()));
    else
        set("type", "-");

    set("country", phone.country || "-");
    set("callingCode", "+" + phone.countryCallingCode);

    //-----------------------------------
    // Formatting
    //-----------------------------------

    set("e164", phone.number);

    set(
        "international",
        phone.formatInternational()
    );

    set(
        "national",
        phone.formatNational()
    );

    set(
        "rfc",
        phone.getURI()
    );

    //-----------------------------------
    // Raw
    //-----------------------------------

    set("rawInput", value);

    set(
        "nationalNumber",
        phone.nationalNumber
    );

    set(
        "countryCode",
        phone.countryCallingCode
    );

    //-----------------------------------
    // Geographic
    //-----------------------------------

    let areaCode = "-";
    let region = "-";
    let timezone = "-";
    let carrier = "-";

    if (
        window.CellScopeDB &&
        window.CellScopeDB.areaCodes &&
        phone.country === "US"
    ) {

        areaCode = phone.nationalNumber.substring(0, 3);

        const area =
            CellScopeDB.areaCodes[areaCode];

        if (area) {

            region = area.region;
            timezone = area.timezone;
            carrier = area.carrier;

        }

    }

    set("areaCode", areaCode);
    set("region", region);
    set("timezone", timezone);
    set("carrier", carrier);

}

// ---------------------
// Events
// --------------------------------

button.addEventListener("click", analyze);

input.addEventListener("keydown", e => {

    if (e.key === "Enter")
        analyze();

});

// ---------------------
// Example Buttons
// --------------------------------

document.querySelectorAll(".example")
.forEach(button => {

    button.addEventListener("click", () => {

        input.value = button.textContent.trim();

        analyze();

    });

});

// ----------
// Auto-focus
// ------------

window.addEventListener("load", () => {

    input.focus();

});

// -------------------
// Theme Color (future)
// --------------------

console.log(
    "%cCellScope",
    "font-size:22px;font-weight:bold;color:#4EA3FF;"
);

console.log(
    "Public Phone Intelligence"
);
