
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

  import { 
    getFirestore,
    collection,
    doc,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    //Timestamp,
   } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

    
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyChHh4VkYKDMJIzxl99XJet1kp_0qg1xbc",
    authDomain: "gigtracker-c5b92.firebaseapp.com",
    projectId: "gigtracker-c5b92",
    storageBucket: "gigtracker-c5b92.firebasestorage.app",
    messagingSenderId: "717418645568",
    appId: "1:717418645568:web:f6a639f1cc70c3f85337a5",
    measurementId: "G-RWC0WYTN4Z"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Add a Gig
  export async function addGig(gig){
    try{
        const docRef = await addDoc(collection(db, "gigs"), gig);
        return {id: docRef.id, ...gig}
    } catch(error) {
        console.error("error adding gig: ", error);
    }
  }

//testing
/*
const dateValue = "2024-04-15";
const timeValue  = "19:00";
const dateTime = new Date(`${dateValue}T${timeValue}`);
const timestamp = Timestamp.fromDate(dateTime);
console.log(timestamp);



const gig = {
    gigAttend:true,
    location: "Nichols House3",
    title: "Backyard Show3",
    timestamp: timestamp,
};

addGig(gig);

*/

  // Get Gigs
  export async function getGigs() {
    const gigs = [];
    try{
        const querySnapshot = await getDocs(collection(db, "gigs"));
        querySnapshot.forEach((doc) => {
            gigs.push({ id: doc.id, ...doc.data() });
        });
    }catch(error){
        console.error("error retrieving gigs: ", error)
    }
    return gigs;
  }

  // Delete Gigs
  export async function deleteGig(id){
    try{
        await deleteDoc(doc(db, "gigs", id));
    } catch(error) {
        console.error("error deleting gigs: ", error);
    }
  }
  // Update Gigs
  export async function updateGig(id, updatedData){
    try{
        const gigRef = doc(db, "gigs", id);
        await updateDoc(gigRef, updatedData);
    }catch (error) {
        console.error("error updating gig: ", error);
    }
  }
