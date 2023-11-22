import { loadUsersByPage } from "../use-cases/load-users-by-page";

const state = {
    users: [],
    currentpage: 0
};

const loadNextPage = async() => {
    
    const user = await loadUsersByPage( state.currentpage +1 );

    if( user.length === 0 ) return;

    state.currentpage += 1;
    state.users = user;
}

const loadPreviusPage = async() => {

    if( state.currentpage === 1 ) return;

    const user = await loadUsersByPage( state.currentpage -1 );

    state.currentpage -= 1;
    state.users = user;
}

/**
 * 
 * @param {User} updatedUser 
 */
const onUserChanged = ( updatedUser ) => {
    
    let wasFound = false;

    state.users = state.users.map( user => {
        if( user.id === updatedUser.id ) {
            wasFound = true;

            return updatedUser;
        }

        return user;
    } );

    if( state.users.length < 10 && !wasFound ) {
        state.users.push( updatedUser );
    }
}

const reloadPage = async() => {
    const user = await loadUsersByPage( state.currentpage );

    if( user.length === 0 ) {
        await loadPreviusPage();

        return;
    }

    state.users = user;
}

export default {
    loadNextPage,
    loadPreviusPage,
    onUserChanged,
    reloadPage,

    /**
     * 
     * @returns {User[]}
     */
    getUsers: () => [ ...state.users ],

    /**
     * @returns {number}
     */
    getCurrentPage: () => state.currentpage
}