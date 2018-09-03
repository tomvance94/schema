import OfflineDatabase from './OfflineDatabase'
let database: OfflineDatabase = new OfflineDatabase()

/**
 * The first example loads some data into
 * our offline data store.
 */

let tomRef = database.ref('users').push({
  name: 'Tom',
  age: 23,
  email: 'tom@iamtomvance.co.uk'
})

let johnRef = database.ref('users').push({
  name: 'John',
  age: 31,
  email: 'john@example.com'
})

/**
 * We can then read this data out, and print it in
 * a console.log
 */

database.ref('users').once(console.log)

/**
 * We are also able to delete data from our store
 */
database.ref(`users/${tomRef}`).remove()
database.ref('users').once(console.log)
