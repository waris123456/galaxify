import 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
import { appDatabase, ref, get } from "../Firebase/firebaseConfig.js";

const displayVotedProjects = async () => {
    try {
        const snapshot = await get(ref(appDatabase, 'votedProjects'));
        const projectsData = snapshot.val();

        const projectsArray = Object.entries(projectsData).map(([project, data]) => ({ Project: project, ...data }));

        const table = document.createElement('table');
        table.classList.add('voted-projects-table'); // Add a class to the table
        table.border = '1';

        const headerRow = table.insertRow(0);
        Object.keys(projectsArray[0]).forEach(property => {
            const headerCell = document.createElement('th');
            headerCell.textContent = property;
            headerCell.classList.add('table-header-cell'); // Add a class to header cells
            headerRow.appendChild(headerCell);
        });

        projectsArray.forEach(project => {
            const row = table.insertRow(-1);
            Object.values(project).forEach(value => {
                const cell = row.insertCell(-1);
                cell.textContent = value;
                cell.classList.add('table-data-cell'); // Add a class to data cells
            });
        });
        document.body.appendChild(table);
    } catch (error) {
        console.error('Error displaying voted projects:', error);
    }
};
document.addEventListener('DOMContentLoaded', () => {
    const displayButton = document.getElementById('displayVotedProjectsBtn');
    displayButton.addEventListener('click', displayVotedProjects);
});