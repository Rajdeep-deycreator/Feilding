// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF-IRPxZUUSRc54kp6UJkye-gGDRol54k",
  authDomain: "fielding-6b379.firebaseapp.com",
  projectId: "fielding-6b379",
  storageBucket: "fielding-6b379.firebasestorage.app",
  messagingSenderId: "16467621115",
  appId: "1:16467621115:web:f3ef86e651244843e9ec5e",
  measurementId: "G-03G79VNZQD"
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


