import Dexie from 'dexie'

export const db = new Dexie('myDatabase')

db.version(1).stores({
  users: '++id, name',
})

const randomNumber = Math.floor(Math.random() * 100)

db.users.add({
  name: `Mahdi ${randomNumber}`,
})
