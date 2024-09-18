"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const body = document.getElementsByTagName('body')[0];
const table = document.getElementById("scooter-table");
const BASE_URL = 'https://66e979d387e4176094499741.mockapi.io/api/vi/scooter/';
let formButton = document.getElementById("inpbutton");
const filterByColorButton = document.getElementById("filterColor");
formButton === null || formButton === void 0 ? void 0 : formButton.addEventListener('click', postScooter);
filterByColorButton === null || filterByColorButton === void 0 ? void 0 : filterByColorButton.addEventListener('click', filterByColor);
const objectScooter = {
    serialNumber: "asg",
    model: "asg",
    batteryLevel: 56,
    imageUrl: "grshd",
    color: "string,",
    status: 'availeble',
    id: "5"
};
function filterByColor() {
    let data = isStr();
    let color = document.getElementById("inputColor");
    if (data) {
        let filteredColor = data === null || data === void 0 ? void 0 : data.filter(sco => sco.color == color.value);
        localStorage.setItem(`${color}`, JSON.stringify(filteredColor));
        renderScooters(filteredColor);
    }
}
function isStr() {
    let data = localStorage.getItem('scooters');
    if (typeof data === 'string') {
        const scooters = JSON.parse(data) || [];
        return scooters;
    }
}
const scooterProperties = {
    serialNumber: undefined,
    model: undefined,
    batteryLevel: undefined,
    imageUrl: undefined,
    color: undefined,
    status: undefined,
    id: undefined
};
const ALL_PROPERTIES = Object.keys(scooterProperties);
const type_all_properties = Object.keys(objectScooter);
function renderScooters(scooters) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
    if (scooters === null) {
        return;
    }
    if (scooters) {
        scooters.forEach(element => {
            let tr = document.createElement('tr');
            for (let i = 0; i < ALL_PROPERTIES.length - 1; i++) {
                let td = document.createElement('td');
                let val = element[ALL_PROPERTIES[i]];
                if (typeof val === 'string') {
                    td.textContent = val;
                }
                tr.appendChild(td);
            }
            const actionstd = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Deltee";
            deleteButton.onclick = () => deleteScooter(element.id);
            actionstd.appendChild(deleteButton);
            tr.appendChild(actionstd);
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            let id = element.id;
            if (typeof id === 'string') {
                editButton.onclick = () => popupEditForm(id);
            }
            actionstd.appendChild(editButton);
            tr.appendChild(editButton);
            tableBody.appendChild(tr);
        });
    }
}
const inputarr = [["text", "serialNumber"], ["text", "model"],
    ["number", "batteryLevel"], ["text", "imageUrl"], ["text", "color"]];
function popupEditForm(id, event) {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    const getdiv = document.getElementById("edit-div");
    if (!(getdiv)) {
        const editDiv = document.createElement('div');
        editDiv.id = "edit-div";
        const editform = document.createElement('form');
        editform.id = "edit-form";
        for (let i = 0; i < inputarr.length; i++) {
            const input = document.createElement('input');
            input.type = inputarr[i][0];
            input.name = inputarr[i][1];
            input.placeholder = inputarr[i][1];
            editform.appendChild(input);
        }
        ;
        const selectstat = document.createElement('select');
        selectstat.id = 'editSelect';
        const option1 = document.createElement('option');
        option1.value = 'availeble';
        option1.textContent = 'availeble';
        selectstat.appendChild(option1);
        const option2 = document.createElement('option');
        option2.value = 'inRepair';
        option2.textContent = 'inRepair';
        selectstat.appendChild(option2);
        const option3 = document.createElement('option');
        option3.value = 'unavaileble';
        option3.textContent = 'unavaileble';
        selectstat.appendChild(option3);
        editform.appendChild(selectstat);
        const submitbtn = document.createElement('input');
        submitbtn.type = 'submit';
        submitbtn.textContent = 'submit';
        if (typeof id === 'string') {
            submitbtn.onclick = () => editScooter(id);
        }
        editform.appendChild(submitbtn);
        editDiv.appendChild(editform);
        body.appendChild(editDiv);
    }
    else {
        body.removeChild(getdiv);
    }
}
function editScooter(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let arr = [...document.forms[1].getElementsByTagName("input")].map(input => input.value);
        let stat = document.getElementById("editSelect");
        popupEditForm();
        console.log(arr);
        // let formvalues = document.getElementsByClassName("forminput") as HTMLFormControlsCollection
        let newscooter = {
            serialNumber: arr[0],
            model: arr[1],
            batteryLevel: arr[2],
            imageUrl: arr[3],
            color: arr[4],
            status: stat.value
        };
        try {
            let data = yield fetch(`${BASE_URL}/${id}`, {
                method: "PUT",
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify(newscooter)
            });
            let res = yield data.json();
            console.log(res);
        }
        catch (err) {
            console.log(err);
        }
        yield saveLocalStorage();
        renderScooters(isStr());
    });
}
function deleteScooter(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = yield fetch(`${BASE_URL}/${id}`, {
                method: "DELETE"
            });
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
        yield saveLocalStorage();
        renderScooters(isStr());
    });
}
// let formvalues = document.getElementsByClassName("forminput");
//    let status = document.getElementById("status-select");
//  const keys = ["fullname","rank","position","platoon","missiontime"]
//   let soldier = {
//   };
//   for(i=0 ; i < formvalues.length; i++){
//     soldier[keys[i]] = formvalues[i].value
//     if(i === 4)
//     {
//         formvalues[i].value = 0
//     }
//     else{
//          formvalues[i].value ="";
//     }
//   }
//   let id1 = generateId(3);
//   let id2 = generateId(3);
//   let id3 = generateId(4);
//   soldier["missionid"] = id1;
//   soldier["deleteid"] = id2;
//   soldier["editid"] = id3;
//   soldier["status1"] = status.value;
//   status.value = "";
//   id1 = "";
//   id2 = "";
//   id3 = "";
//   console.log(soldier)
//   soldiers.push(soldier);
//   saveSoldiers();
//   renderSoldiers();
// //   formvalues.value = "";
// }
// const arrkeys: string[] = [ " serialNumber",
//    "model",
//     "batteryLevel",
//    "imageUrl",
//    "color",
//    'status']
function postScooter(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event === null || event === void 0 ? void 0 : event.preventDefault();
        let arr = [...document.forms[0].getElementsByTagName("input")].map(input => input.value);
        let stat = document.getElementById("status-select");
        console.log(arr);
        // let formvalues = document.getElementsByClassName("forminput") as HTMLFormControlsCollection
        let newscooter = {
            serialNumber: arr[0],
            model: arr[1],
            batteryLevel: arr[2],
            imageUrl: arr[3],
            color: arr[4],
            status: stat.value
        };
        try {
            let data = yield fetch(BASE_URL, {
                method: "POST",
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify(newscooter)
            });
            let res = yield data.json();
            console.log(res);
        }
        catch (err) {
            console.log(err);
        }
        yield saveLocalStorage();
        renderScooters(isStr());
    });
}
// const BASE_URL:string = 'https://66e979d387e4176094499741.mockapi.io/api/vi/scooter'
function getScooters() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = yield fetch(BASE_URL);
            let response = yield data.json();
            return response;
        }
        catch (err) {
            console.log(err);
        }
    });
}
function saveLocalStorage() {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield getScooters();
        if (data) {
            localStorage.setItem('scooters', JSON.stringify(data));
        }
        //    await localStorage.setItem('scooters',JSON.stringify(data))
    });
}
// 
renderScooters(isStr());
