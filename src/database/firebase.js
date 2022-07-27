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
      link,
      createdBy: auth.currentUser.uid,
      collaborators: '',
      slides:{ 
        "1" : {
          content: ''
        }
      },
    }).then(() => {
      console.log("slides par defaut creer")
    })
    .catch(() => {
      console.log("PROBLEMMMME")
    })
  }

  async createSlide(title, contentPage , collaborators , nbPage) {
    var nb = String(nbPage)
    console.log(nbPage , nb)
    await set(ref(db, 'presentation/' + auth.currentUser.uid + "/" + title + '/slides/' + nb), {
      content : contentPage
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

  async getPagesForOneSlide(title) {

    // const presentationRef = collection(getStore , 'presentation');
    // const queryRef = presentationRef.where('createdBy', '==', auth.currentUser.uid);
    // return queryRef;

    var p = []
    const presentationRef = ref(db, 'presentation/' + auth.currentUser.uid + '/' + title + '/slides/');
    onValue(presentationRef, (snapshot) => {
      var slides = (snapshot.val())
      for (const [key, value] of Object.entries(slides)) {
        var item = {
          index : key,
          data : value
        }
        p.push(item)
      }
    });

    return p;

  }

  // async createConversation(to, from) {

  //   await set(ref(db, 'presentation/' + auth.currentUser.uid + "/" + title), {
  //     // createdBy: auth.currentUser.uid,
  //     link,
  //     createdBy: auth.currentUser.uid,
  //     collaborators: '',
  //     slides:{ 
  //       "1" : {
  //         content: ''
  //       }
  //     },
  //   }).then(() => {
  //     console.log("slides par defaut creer")
  //   })
  //   .catch(() => {
  //     console.log("PROBLEMMMME")
  //   })
  // }

  async deletePresentation(title){
    const presentationRef = ref(db, 'presentation/' + auth.currentUser.uid + '/' + title);
    remove(presentationRef)
  }
}
