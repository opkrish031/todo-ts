// stict mode, redux persist, nuqs, tanstack query, enums,    
// redux persist clear ls


// strict mode allow compiler to check all action of ours and don't avoid any type, it will force us to write correct code and avoid bugs in future

// redux persist allow us to save our state in local storage and when we refresh the page it will load the state from local storage and we don't lose our data, it also provide encryption and decryption of data in local storage

// redux persist transform-encrypt is a library for encrypting and decrypting data in local storage, it is used with redux persist to encrypt the state before saving it to local storage and decrypt it when loading it from local storage, it provide a simple API for encryption and decryption of data in local storage

// enums allow us to define a set of named constants, it can be used to define a set of related values and make our code more readable and maintainable

// nuqs is a library for managing server state in React applications, it provides a simple and efficient way to fetch, cache and update data from a server, it also provide features like pagination, infinite scrolling, optimistic updates and more

// tanstack query is a library for managing server state in React applications, it provides a simple and efficient way to fetch, cache and update data from a server, it also provide features like pagination, infinite scrolling, optimistic updates and more, it is similar to nuqs but it is more powerful and flexible than nuqs, it also provide features like query cancellation, query invalidation, query prefetching and more




// redux state work has to continue 
/*
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync'
import { configureStore } from '@reduxjs/toolkit'

const stateSyncMiddleware = createStateSyncMiddleware({
  blacklist: ['persist/PERSIST'], // avoid infinite loops
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stateSyncMiddleware),
})

initMessageListener(store)
*/