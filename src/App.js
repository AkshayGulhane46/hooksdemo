import { useState  , useEffect} from "react";


function App() {
  const [name,setName] = useState("") // useState Hook
  const [lastName,setLastName] = useState("") 

  useEffect(() =>{ 
    //useffect is used for perform any side effect inside functionl component like API call, wait for something or Update something 
    // use effect is component did mount and component did update (which are )
    document.title = name + " " + lastName // this will change the title of the page 
  })

// the above will change the updates in real time
  // if last name changes then only it will show effect
  // useEffect(() => {
  //   document.title = name + " " + lastName 
  // },[lastName])

  // this will not show the updates in real time
  // useEffect(() => {
  //   document.title = name + " " + lastName 
  // },[])

  useEffect(()=>{
    let timer =  setInterval(()=>{
      console.log("Window width ", window.innerWidth)
    },2000) // this is a inbuild function in react
    return(clearInterval(timer))

    //return() =>{
    //  clearInterval(timer)
    //} Both returns works fine
    //
  })


  return (
    <>
      <h1> Hooks Demo</h1>
      <input type="text" placeholder="add Firstname" value={name} onChange={(e) => setName(e.target.value)}></input>
      <input type="text" placeholder="add LastName" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
      <h2>Hello{name} {lastName}</h2>
    </>
  );
}

export default App;
