const patients = require("./patients");
// console.table(patients);

/*
Parameters have a 'key=value' structure. There are two types:
	Number (can have ">" or "<" modifiers to filter):
		id=>0000,
		height=0,
		weight=0,
		age=<200,
	String (will do partial matches and can have "!" to ivert match):
		firstName='',
		lastName='',
		phoneNumber='',
		email='',
		gender='m' or 'f',
		dailyExercise='no', 'yes',
*/

const filterPatients = (...params) => {
    // Insanely inefficient multi argument search, patientLength**inputLength.
    const filteredPatients = patients.filter((patient) => {
        const conditions = params.map((input) => {
            const [key, value] = input.split("=");
            // Compares a if a number input value is greater than the patient one.
            if (value.includes(">")) {
                return Number(value.slice(1)) < patient[key];
                // Compares a if a number input value is lesser than the patient one.
            } else if (value.includes("<")) {
                return Number(value.slice(1)) > patient[key];
                // Checks if a string input is NOT present in the patient value.
                } else if (value.includes("!")) {
                	return !String(patient[key]).includes(value.slice(1));
                // Checks if a string input is present in the patient value.
            } else {
                return String(patient[key]).includes(value);
            }
        });
        return conditions.includes(false) ? false : true;
    });

    return filteredPatients;
};

module.exports = { filterPatients };
