import OfflineDatabase from './OfflineDatabase'

let database: OfflineDatabase = new OfflineDatabase()


database.ref('users/id1').once(console.log)
database.ref('users/id1').push({name: 'Sam'})
database.ref('users').once(console.log)
