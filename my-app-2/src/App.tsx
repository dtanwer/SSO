import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
function App() {
  const [email, setEmail] = useState<null|string>(null);
  const handleLogin = () => {
    const callbackUrl="http://localhost:3001";
    window.location.href = `http://localhost:5000/login?callbackUrl=${callbackUrl}`;
  };

  const handleLogout = async () => {
    try{
      const res=await axios.get("http://localhost:5000/logout",{withCredentials:true});
      console.log(res.data);
      // window.localStorage.removeItem("email");
      setEmail(null);
    }
    catch(err){
      console.log(err);
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isAuthinticated();
    const url = window.location.href;
    const isEmail = url.includes("?email=");
    if (isEmail) {
      const newUrl = url.split("?email=");
      window.localStorage.setItem("email",newUrl[1]);
      setEmail(newUrl[1]);
      window.history.pushState({}, "", newUrl[0]);
    }
  }, []);


  // useEffect(() => {
  //   if(!window.localStorage.getItem("email")){
  //     handleLogin();
  //   }
  //   setEmail(window.localStorage.getItem("email"));
  // }, []);


  return (
    <div className="App">
      <header className="App-header">
        <h1>My Second React App {email}</h1>
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
