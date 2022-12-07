// Versus Dropdowns
const select1 = document.getElementById("select1");
const select2 = document.getElementById("select2");

function updateOptions(year) {
    while (select1.lastChild) {
        select1.removeChild(select1.lastChild);
    }

    while (select2.lastChild) {
        select2.removeChild(select2.lastChild);
    }

    let blankOpt = document.createElement('option')
    blankOpt.text = "Select a driver";
    select1.appendChild(blankOpt.cloneNode(true))
    select2.appendChild(blankOpt.cloneNode(true))

    d3.select("#pie-1").selectAll("*").remove();
    d3.select("#pie-2").selectAll("*").remove();

    getDrivers(year).then((drivers) => {
        drivers.forEach(driver => {
            opt1 = document.createElement('option');
            opt1.setAttribute('value', driver["driverId"])
            opt1.innerHTML = `${driver["givenName"]} ${driver["familyName"]} (${driver["code"]})`;

            opt2 = document.createElement('option');
            opt2.setAttribute('value', driver["driverId"])
            opt2.innerHTML = `${driver["givenName"]} ${driver["familyName"]} (${driver["code"]})`;

            select1.appendChild(opt1);
            select2.appendChild(opt2);
        });
    });

    select1.addEventListener('change', e => {
        if (e.target.value != "Select a driver") {
            renderPie(year, e.target.value, d3.select("#pie-1"));
        }
    });
    select2.addEventListener('change', e => {
        if (e.target.value != "Select a driver") {
            renderPie(year, e.target.value, d3.select("#pie-2"));
        }
    });
}