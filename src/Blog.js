import { useRef, useState , useEffect, useReducer } from "react";


function blogsReducer(state,action){
    switch(action.type){
        case "ADD":
            return[action.blog, ...state]
            // the above is same as setBlogs
        case "REMOVE":
            return state.filter((blog,index)=>
                index !== action.index
            )
        default: 
            return []
            // default retuen should be same for any case
    }
}

//Blogging App using Hooks
export default function Blog(){
    


    // const [title,setTitle] = useState("")
    // const [description,setDecsription] = useState("")
    //const [blogs,setBlogs] = useState([]);
    const [formData,setformData] = useState({title:"",description:""})
    const titleRef = useRef(null) // Initial value is null
    
    const [blogs, dispatch] = useReducer(blogsReducer,[]);
    // useReducer is used here to 


    useEffect(()=>{
        titleRef.current.focus();
    },[]) // this is component did mount

    useEffect(()=>{
        if(blogs.length && blogs[0].title){
            document.title = blogs[0].title
        }else{
            document.title = "No Bolgs"
        }
    },[blogs]) // this is component did update
    // so whenever there is a change in blogs state then only this useEffect will run

    //Passing the synthetic event (e) as argument to stop refreshing the page on submit
    function handleSubmit(e){
            e.preventDefault();
            //setBlogs([{title:formData.title, description:formData.description},...blogs])
            // ... This is a rest operator which will add everything in an object to the state
            console.log(blogs);

            dispatch({type:"ADD",blog:{title:formData.title, description:formData.description},...blogs})
            // Here we are using use reducers dispatch insted of setBlogs() from top

            setformData({title:"",description:""}) // to remove text from the 
            titleRef.current.focus(); // this will focus on title text everytime something is added to blogs
        }
    
    function removeBlog(i){

    //    setBlogs(blogs.filter((blog,index) => 
    //     i !== index
    //    )
       // this function will remove blog which index mataches with the the passed index

       dispatch({type:"REMOVE",index:i})
    }



    return( 
        <>
        {/* Heading of the page */}
        <h1>Write a Blog!</h1>

        {/* Division created to provide styling of section to the form */}
        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>

                {/* Row component to create a row for first input field */}
                <Row label="Title">
                        <input className="input"
                                placeholder="Enter the Title of the Blog here.."
                                value={formData.title}
                                onChange={(e)=>setformData({title:e.target.value , description:formData.description})}
                                ref={titleRef}
                                />

                </Row >

                {/* Row component to create a row for Text area field */}
                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content of the Blog goes here.."
                                value={formData.description}
                                onChange={(e)=>setformData({description:e.target.value , title:formData.title})}/>
                </Row >

                {/* Button to submit the blog */}            
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted blogs will be displayed */}
        <h2> Blogs </h2>

        {
            blogs.map((blog,i)=>(
                <div className="blog" key={i}>
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
                <div className="blog-button">
                    <button onClick={() => removeBlog(i)} className="remove-button">
                        Delete
                    </button>
                </div>
                </div>
            ))
        }
        
       
        </>
        )
    }

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}