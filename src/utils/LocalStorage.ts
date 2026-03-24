const localStorageKey = 'todos';

const getItems = () =>{
    try{
        const items = localStorage.getItem(localStorageKey);
        return items ? JSON.parse(items) : [];

    } catch(error){
        console.error('Error getting items from localStorage', error);
        return [];
    }
}

const setItems = (text: any) =>{
    try{
        const data = JSON.stringify(text);
        localStorage.setItem(localStorageKey,data);
    } catch(e){
        console.error('Error getting items from localStorage', e);
    }
}

export {getItems, setItems};