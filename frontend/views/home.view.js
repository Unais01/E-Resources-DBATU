const btn = document.querySelector('.btn');
const test = document.querySelector('#test');
console.log(test);
const subCtn= document.querySelector('.subjects-container')
 const subjects = {
     1: ["MATHI", "Chemistry", "Mechanics", "Cprogramming"],
     2: ["MATHII", "Physics", "Graphics", "CommunicationSkills", "EEE"],
     3: ["MATHIII", "DM", "DSA", "COA", "Java"],
     4: ["DAA", "OS", "PS", "BHR", "DLDM"],
     5: ["DBS", "TOC", "SE", "HCI", "BC"],
     6: ["CD", "CN", "ML", "IoT", "CB"],
     7: ["AI", "BI", "DT", "BI", "DF"]
 };



 function showSubjects(semester) {
     subCtn.style.display = 'block';

     btn.style.display = 'block';
     const semesterContainer = document.getElementById("semester-container");
     semesterContainer.style.display = "none"; // Hide semester boxes

     const subjectsContainer = document.getElementById("subjects-container");
     subjectsContainer.innerHTML = ""; // Clear previous subjects
     const h1 = document.createElement("h1");
     h1.textContent=` Semester ${semester}`;
     h1.classList.add("heading")
     subjectsContainer.appendChild(h1);

     subjects[semester].forEach(subject => {
         const subjectDiv = document.createElement("div");
         subjectDiv.classList.add("subject");
        subjectDiv.classList.add("width-controller")
         subjectDiv.classList.add("ag-courses_item");
         subjectDiv.classList.add("ag-courses-item_link");
        
        //  subjectDiv.classList.add("ag-courses-item_title");
         subjectDiv.textContent = subject;
         subjectDiv.onclick = () => redirectToPage2(semester,subject);
         subjectsContainer.appendChild(subjectDiv);
        

     });
    
 }


 function showResources(subject) {
    //  subCtn.style.display = 'none';
     const resourcesContainer = document.getElementById("resources-container");
     resourcesContainer.innerHTML = ""; // Clear previous resources
     
     const pyqDiv = document.createElement("div");
     pyqDiv.classList.add("resource");
     pyqDiv.textContent = `${subject} Past Year Questions`;
     pyqDiv.onclick = () => showLinks(pyqLinks[subject]);
     resourcesContainer.appendChild(pyqDiv);

     const notesDiv = document.createElement("div");
     notesDiv.classList.add("resource");
     notesDiv.textContent = `${subject} Notes`;
     notesDiv.onclick = () => showLinks(notesLinks[subject]);
     resourcesContainer.appendChild(notesDiv);
 }

 function showLinks(links) {
     // Implement logic to display and handle links, e.g., open them in a new tab or download them
     console.log("Links:", links);
 }

 function showAllSemesters() {
     btn.style.display = 'none';

     const semesterContainer = document.getElementById("semester-container");
     semesterContainer.style.display = "flex"; // Show semester boxes
     const subjectsContainer = document.getElementById("subjects-container");
     subjectsContainer.innerHTML = ""; // Clear subjects
     const resourcesContainer = document.getElementById("resources-container");
     resourcesContainer.innerHTML = ""; // Clear resources
 }


 function redirectToPage2(semester,subject) {
    // Variables you want to pass to page2.html
    let  myVariable1 =semester;
    let  myVariable2 = subject;
    
    // let Construct the URL with query parameters
    let  url = 'resource.html?variable1=' + encodeURIComponent(myVariable1) + '&variable2=' + encodeURIComponent(myVariable2);
    
    // Redirect to page2.html
    window.location.href = url;
}