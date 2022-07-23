import { getDatabase, ref, set, remove, update, onValue } from "firebase/database";
// import { getFirestore , collection } from "firebase/firestore";
import { doc, getDoc , getFirestore } from "firebase/firestore";

import {auth} from '../firebase.config'
const db = getDatabase();
const getStore = getFirestore();


export default class Firebase{

  async createPresentation(title, link) {

    await set(ref(db, 'presentation/' + auth.currentUser.uid + "/" + title), {
      // createdBy: auth.currentUser.uid,
      link
    }).then(() => {
      return true;
    })
    .catch(() => {
      return false;
    })
  }

  async createSlide(title, contentPage , collaborators) {

    await set(ref(db, 'presentation/' + auth.currentUser.uid + "/" + title + '/slides/'), {
      createdBy: auth.currentUser.uid,
      collaborators: collaborators,
      content: contentPage
    }).then(() => {
      return true;
    })
    .catch(() => {
      return false;
    })
  }

  async removeSlide(title) {

    await update(ref(db, 'presentation/' + auth.currentUser.uid + "/" + title + '/slides/'), {
      
    }).then(() => {
      return true;
    })
    .catch(() => {
      return false;
    })
  }

  getPresentation() {

    // const presentationRef = collection(getStore , 'presentation');
    // const queryRef = presentationRef.where('createdBy', '==', auth.currentUser.uid);
    // return queryRef;

    var p = []
    const presentationRef = ref(db, 'presentation/' + auth.currentUser.uid);
    onValue(presentationRef, (snapshot) => {
      var slides = (snapshot.val())
      for (const [key, value] of Object.entries(slides)) {
        var item = {
          title : key,
          data : value
        }
        p.push(item)
      }
    });

    return p;

  }
}
