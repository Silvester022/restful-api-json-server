import { BreakingBad } from './src/breakingbad/breakingbad-app';
import { UsersApp } from './src/users/users-app';

import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
    <h1 id="app-title"></h1>
    <div class="card"></div>
  </div>
`;

const element = document.querySelector( '.card' );

UsersApp( element );

// BreakingBad( element );
