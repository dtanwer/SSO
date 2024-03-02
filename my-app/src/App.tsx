import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
function App() {
  const [email, setEmail] = useState<null|string>(null);
  const handleLogin = async () => {
    const popupWindow = window.open(`http://localhost:5000/login`, "_blank", "width=600,height=600");
    if (popupWindow) {
      const timer = setInterval(async () => {
        const res= await isAuthinticated();
        if(res?.data?.isAuthinticated){
          setEmail(res.data.email);
          clearInterval(timer);
          popupWindow.close();
        }
      }, 1000);
    }
  };






  const isAuthinticated = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth", {
        withCredentials: true,
      });
      if(res?.data?.isAuthinticated){
        setEmail(res.data.email);
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try{
      const res=await axios.get("http://localhost:5000/logout",{withCredentials:true});
      console.log(res.data);
      setEmail(null);
    }
    catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    isAuthinticated();
    const url = window.location.href;
    const isEmail = url.includes("?email=");
    if (isEmail) {
      const newUrl = url.split("?email=");
      setEmail(newUrl[1]);
      window.history.pushState({}, "", newUrl[0]);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>My First React App {email}</h1>
        {
          email ? <button onClick={handleLogout} style={{padding:"15px 50px",fontSize:"20px",fontWeight:"bold",borderRadius:"10px",cursor:"pointer"}} >Logout</button> :
          <button onClick={handleLogin} style={{padding:"15px 50px",fontSize:"20px",fontWeight:"bold",borderRadius:"10px",cursor:"pointer"}} >Login Please</button>
        }
      {/* <button onClick={handleLogin} style={{padding:"15px 50px",fontSize:"20px",fontWeight:"bold",borderRadius:"10px",cursor:"pointer"}} >Login Please</button> */}
      </header>
      
    </div>
  );
}

export default App;
