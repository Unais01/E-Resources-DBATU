

const linkList = document.querySelector('#linkList');
const notesLinks = [
    { text: 'MI', url: 'UNIT 01', l: 'https://google.com' },
    { text: 'MII', url: 'UNIT 02', l: 'https://google.com' },
    { text: 'MIII', url: 'UNIT 03', l: 'https://google.com' }
];


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) {
            return decodeURIComponent(pair[1].replace(/\+/g, ' ')); // Replace '+' with space
        }
    }
    return null;
}
let semester = getQueryVariable('variable1');
let subject = getQueryVariable('variable2');
console.log(semester, subject);

function refreshWindow(){
    window.location.reload();
}



//Logic to display resources{notes ,pyq} of particular subject
function showResources(subject) {

    const resourcesContainer = document.querySelector(".resources-container");
    resourcesContainer.innerHTML = ""; // Clear previous resources
//     resourcesContainer.innerHTML = `
//     <div class="paper-ctn">
//             <h3>${subject} PYQ</h3>
//      </div>
//     <div class="notes-ctn">
//             <h3>${subject} Notes</h3>
//     </div>
//    `;
resourcesContainer.innerHTML=`
<button class="button-37" onclick="refreshWindow()">Refresh</button>
 <div class="ag-courses_item paper-ctn">
<a href="#" class="ag-courses-item_link">
    <div class="ag-courses-item_bg"></div>

    <div class="ag-courses-item_title">
    <h3>${subject} PYQ</h3> </div>

</a>
</div>

<div class="ag-courses_item notes-ctn">
<a href="#" class="ag-courses-item_link">
    <div class="ag-courses-item_bg"></div>

    <div class="ag-courses-item_title">
    <h3>${subject} Notes</h3> </div>

</a>
</div>
`

    //selecting elements from dom
    let paperCtn = document.querySelector('.paper-ctn');
    let notesCtn = document.querySelector('.notes-ctn');
    let paperResult = document.querySelector('.pyq-result');
    let notesResult = document.querySelector('.notes-result');

    //creating unorder list and adding link-list class
    const ul = document.createElement('ul');
    ul.classList.add('link-list');

    //function to get pyq from api(our backend)
function getPyq() {
        paperResult.appendChild(ul);
        ul.innerHTML = "";
        let url = `http://localhost:3000/semesters/${semester}/subjects/${subject}/pyqs`
        fetch(url)
            .then((response) => {
                return response.json();
            }).then((data) => {
                data.forEach((item) => {
                    let li = document.createElement('li');
                    li.classList.add('list-items');
                    let anchor = document.createElement('a');
                    anchor.setAttribute('target', '_blank');
                    anchor.innerText=item.name;
                    anchor.href=item.link;               
                    ul.appendChild(li)
                    li.appendChild(anchor);
                });
            }).catch((error) => {
                console.log(`attention: ${error}`);
            });
    }

    // textbook#######################3
    function getNotes() {
        paperResult.appendChild(ul);
        ul.innerHTML = "";
        let url = `http://localhost:3000/semesters/${semester}/subjects/${subject}/notes`
        fetch(url)
            .then((response) => {
                return response.json();
            }).then((data) => {
                data.forEach((item) => {
                    let li = document.createElement('li');
                    li.classList.add('list-items');
                    let anchor = document.createElement('a');
                    anchor.setAttribute('target', '_blank');
                    anchor.innerText=item.name;
                    anchor.href=item.link;               
                    ul.appendChild(li)
                    li.appendChild(anchor);
                });
            }).catch((error) => {
                console.log(`attention: ${error}`);
            });
    }



    //displaying pyq link fetching from our backend
    paperCtn.addEventListener('click', () => getPyq());
    notesCtn.addEventListener('click',()=>getNotes());
 


}



showResources(subject);