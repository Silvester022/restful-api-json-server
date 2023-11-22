import usersStore from "../../store/users-store";
import { renderTable } from "../render-table/render-table";

import './render-buttons.css';

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderButtons = ( element ) => {

    const nextButton = document.createElement('button');
    nextButton.innerHTML = ' Next → ';
    
    const prevButton = document.createElement('button');
    prevButton.innerHTML = ' Prev ← ';

    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page';
    currentPageLabel.innerHTML = usersStore.getCurrentPage();

    element.append( prevButton, currentPageLabel, nextButton );

    prevButton.addEventListener('click', async() => {

        await usersStore.loadPreviusPage();

        currentPageLabel.innerHTML = usersStore.getCurrentPage();

        renderTable( element );
    });

    nextButton.addEventListener('click', async() => {

        await usersStore.loadNextPage();

        currentPageLabel.innerHTML = usersStore.getCurrentPage();

        renderTable( element );
    })
}