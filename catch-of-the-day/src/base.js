import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB2hpMlP1ZAh-RqdWre_Aqs9C7eXH4BcdE",
  authDomain: "catch-of-the-day-kazumi-15a9e.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-kazumi-15a9e.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database())

export { firebaseApp }

export default base
