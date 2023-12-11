var comTab = document.getElementById('comTab');
var scienceTab = document.getElementById('scienceTab');
var pstTab = document.getElementById('pstTab');
var islamTab = document.getElementById('islamTab');

var projectsArray = document.querySelectorAll('.projectDiv');

function showProjects(subjectClass, tabElement) {
    projectsArray.forEach((project) => {
        if (project.classList.contains(subjectClass)) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });

    [comTab, scienceTab, pstTab, islamTab].forEach((tab) => {
        tab.style.backgroundColor = "";
        tab.style.border = "";
    });

    tabElement.style.backgroundColor = "black";
    tabElement.style.border = "2px solid #66fcf1";
}

comTab.addEventListener('click', () => {
    showProjects('comProject', comTab);
});

scienceTab.addEventListener('click', () => {
    showProjects('scienceProject', scienceTab);
});

pstTab.addEventListener('click', () => {
    showProjects('pstProject', pstTab);
});

islamTab.addEventListener('click', () => {
    showProjects('islamiatProject', islamTab);
});
