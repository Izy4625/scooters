const body = document.getElementsByTagName('body')[0] as HTMLBodyElement;

const table = document.getElementById("scooter-table") as HTMLTableElement
const BASE_URL:string = 'https://66e979d387e4176094499741.mockapi.io/api/vi/scooter/';
let formButton = document.getElementById("inpbutton") as HTMLButtonElement

const filterByColorButton = document.getElementById("filterColor") as HTMLButtonElement
formButton?.addEventListener('click', postScooter);


filterByColorButton?.addEventListener('click', filterByColor)
interface scooter{
    
    serialNumber: string,
    model: string,
    batteryLevel: number,
    imageUrl: string,
    color: string,
    status: 'availeble' | 'inRepair' | 'unavailable',
    id?: string
}
const objectScooter: scooter ={
    serialNumber: "asg",
    model: "asg",
    batteryLevel: 56,
    imageUrl: "grshd",
    color: "string,",
    status: 'availeble',
    id: "5"
}
function filterByColor(): void{
    let data = isStr();
    let color = document.getElementById("inputColor") as HTMLInputElement;
    if(data){
        let filteredColor: scooter[] = data?.filter(sco => sco.color == color.value);
        localStorage.setItem(`${color}`,JSON.stringify(filteredColor));
  renderScooters(filteredColor)}


}

function isStr(): scooter[]|undefined{
    let data : any = localStorage.getItem('scooters')
    if(typeof data === 'string'){
        const scooters: scooter[] = JSON.parse(data) || []
        return scooters
    }
   
}
type keysScooter = Record<(keyof scooter), undefined>
type keysScooter2 = keyof scooter

const scooterProperties: keysScooter = {
    serialNumber: undefined,
    model: undefined,
    batteryLevel:undefined,
    imageUrl: undefined,
    color: undefined,
    status: undefined,
    id: undefined
  };
  const ALL_PROPERTIES = Object.keys(scooterProperties) as (keyof keysScooter)[];
  const type_all_properties = Object.keys(objectScooter) as (keyof keysScooter2)[];

function renderScooters(scooters: scooter[]|undefined){
    const tableBody = document.getElementById("table-body") as HTMLTableElement
    tableBody.innerHTML = "";
   
    if(scooters === null){
        return
    }
    if(scooters){
    scooters.forEach(element => {
        let tr = document.createElement('tr') as HTMLTableRowElement;
        for(let i: number = 0; i < ALL_PROPERTIES.length -1;i++){    
        let td = document.createElement('td') as HTMLTableCellElement;
       let val: any = element[ALL_PROPERTIES[i]];
       if(typeof val === 'string'){
        td.textContent = val
       }

        tr.appendChild(td);}

        const actionstd = document.createElement('td') as HTMLTableCellElement;

        const deleteButton = document.createElement('button') as HTMLButtonElement;
        deleteButton.textContent = "Deltee";
        deleteButton.onclick = () => deleteScooter(element.id)
        actionstd.appendChild(deleteButton);
        tr.appendChild(actionstd);

        const editButton = document.createElement("button") as HTMLButtonElement;
        editButton.textContent = "Edit";
        let id: any = element.id
        if(typeof id === 'string'){editButton.onclick = () => popupEditForm(id)}
        
        actionstd.appendChild(editButton)
        tr.appendChild(editButton)
        tableBody.appendChild(tr);
    });

}}

const inputarr: string[][]= [["text","serialNumber"],["text","model"],
["number","batteryLevel"],["text","imageUrl"],["text","color"]]

function popupEditForm(id?: string, event?: any){
    event?.preventDefault();
    const getdiv = document.getElementById("edit-div") as HTMLDivElement;
    if(!(getdiv)){
        const editDiv = document.createElement('div') as HTMLDivElement;
        editDiv.id = "edit-div";
        const editform = document.createElement('form') as HTMLFormElement;
        editform.id = "edit-form"
        for(let i: number = 0; i< inputarr.length; i++){
            const input = document.createElement('input') as HTMLInputElement;
            input.type = inputarr[i][0];
            input.name = inputarr[i][1];
            input.placeholder = inputarr[i][1];
            editform.appendChild(input);
        };
        const selectstat = document.createElement('select') as HTMLSelectElement;
        selectstat.id = 'editSelect';
        const option1 = document.createElement('option') as HTMLOptionElement;
        option1.value = 'availeble';
        option1.textContent = 'availeble';
        selectstat.appendChild(option1);
        const option2 = document.createElement('option') as HTMLOptionElement;
        option2.value = 'inRepair';
        option2.textContent = 'inRepair';
        selectstat.appendChild(option2);
        const option3 = document.createElement('option') as HTMLOptionElement;
        option3.value = 'unavaileble';
        option3.textContent = 'unavaileble';
        selectstat.appendChild(option3);
        editform.appendChild(selectstat);
        const submitbtn = document.createElement('input') as HTMLInputElement;
        submitbtn.type = 'submit';
        submitbtn.textContent = 'submit';
        if(typeof id === 'string')
        {submitbtn.onclick = () => editScooter(id);}
      editform.appendChild(submitbtn);
        editDiv.appendChild(editform);
        body.appendChild(editDiv);
       
    }
    else{      
        body.removeChild(getdiv);       
    } 
}
async function editScooter(id: string){
   
    let arr: any = [...document.forms[1].getElementsByTagName("input")].map(input => input.value)
    let stat: any = document.getElementById("editSelect") as HTMLSelectElement
    popupEditForm();
    console.log(arr);
    // let formvalues = document.getElementsByClassName("forminput") as HTMLFormControlsCollection
    let newscooter: Partial<scooter> = {
        serialNumber: arr[0],
        model: arr[1],
        batteryLevel: arr[2],
        imageUrl: arr[3],
        color: arr[4],
        status: stat.value
    }
    try{
        let data: any = await fetch(`${BASE_URL}/${id}`,{
            method: "PUT",
            headers: {'content-Type' : 'application/json'},
            body: JSON.stringify(newscooter)
        });
        let res: any =  await data.json();
             console.log(res)
    }
    catch(err){
        console.log(err)
    }
    await saveLocalStorage()
    renderScooters(isStr())
}
async function deleteScooter(id:any):Promise<void>{
    try{
      let data: any = await fetch(`${BASE_URL}/${id}`,{
        method: "DELETE"});
        console.log(data)
        
  }
  catch(err){
    console.log(err)
  }
  await saveLocalStorage()
  renderScooters(isStr())
  
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
async function postScooter(event: any){
    event?.preventDefault()
    let arr: any = [...document.forms[0].getElementsByTagName("input")].map(input => input.value)
    let stat: any = document.getElementById("status-select") as HTMLSelectElement
    console.log(arr);
    // let formvalues = document.getElementsByClassName("forminput") as HTMLFormControlsCollection
    let newscooter: Partial<scooter> = {
        serialNumber: arr[0],
        model: arr[1],
        batteryLevel: arr[2],
        imageUrl: arr[3],
        color: arr[4],
        status: stat.value

    }
    try{
        let data: any = await fetch(BASE_URL,{
            method: "POST",
            headers: {'content-Type' : 'application/json'},
            body: JSON.stringify(newscooter)
        });
        let res: any =  await data.json();
             console.log(res)
    }
    catch(err){
        console.log(err)
    }
    await saveLocalStorage()
    renderScooters(isStr())
    
}



// const BASE_URL:string = 'https://66e979d387e4176094499741.mockapi.io/api/vi/scooter'

async function getScooters(): Promise<scooter[] | undefined>
{
    try{
    let data:any = await fetch(BASE_URL)
    let response :any = await data.json()
    return response;
    
    }
    catch(err){
        console.log(err)
              
    }
}
async function saveLocalStorage():Promise<void>{
    let data: any = await getScooters()
    if(data){ localStorage.setItem('scooters',JSON.stringify(data))}
//    await localStorage.setItem('scooters',JSON.stringify(data))
}
// 
renderScooters(isStr())
