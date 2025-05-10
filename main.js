// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPRnSwO9h553EoG2V2V-vhvSk7JfFYk4I",
  authDomain: "socionetyour.firebaseapp.com",
  projectId: "socionetyour",
  storageBucket: "socionetyour.firebasestorage.app",
  messagingSenderId: "262760524634",
  appId: "1:262760524634:web:c5e34994f0db39d7b36163",
  measurementId: "G-WPTD60J5D9"
};
firebase.initializeApp(firebaseConfig);
const fs=firebase.firestore();
const auth=firebase.auth();
const analytics=firebase.analytics();

var ip    
    
    fetch("https://api.ipify.org?format=json")
      .then(response => response.json())
      .then(data => {
        console.log("User IP Address:", data.ip);
        ip=JSON.stringify(data.ip)
        console.log(ip)
        var dat={
          ip:ip
        }
        fs.collection("ip").doc(ip).set(dat).then(()=>{
          console.log("200")
        }
        ).catch((error)=>{
          console.log(error.message)
        })
      })
      .catch(error => {
        console.error("Failed to fetch IP:", error);
      });

function newuser() {
  var n=document.getElementById('n').value
      var  ph=document.getElementById('nnu').value
      if( n ==='' || ph ===''){
        alert("please enter all details")
      }else{
      
  const email = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  auth.createUserWithEmailAndPassword(email, pass)
    .then((cred) => {
      const userId = cred.user.uid;
    
      

      const userData = {
        n: document.getElementById('n').value,
        ph: document.getElementById('nnu').value,
        email:document.getElementById('user').value
      };

     return fs.collection('ip').doc(ip).update(userData).then(()=>{
         console.log("200")
       }).catch((error)=>{
         alert(error.message)
       });
       
    })
    .then(() => {
      alert("User account successfully created!");
      sub()
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
      }
}
function sub() {
  const email = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;

  auth.signInWithEmailAndPassword(email, pass)
    .then((creden) => {
      alert('Logged in');
      const uid = creden.user.uid;
      id=uid;
      if(id){
        localStorage.setItem('i',id);
        localStorage.setItem('e',email)
        localStorage.setItem('pass',pass)
      }
      
      console.log('User ID after login:', uid);
      window.location.href='ind.html'

    })
    .catch((error) => {
      alert('Authentication Error: check weather your password or email is correct', error.message);
    });
}


