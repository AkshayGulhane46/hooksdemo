import { useRef, useState } from "react";

//Blogging App using Hooks
export default function Blog(){
    


    // const [title,setTitle] = useState("")
    // const [description,setDecsription] = useState("")
    const [blogs,setBlogs] = useState([]);
    const [formData,setformData] = useState({title:"",description:""})
    const titleRef = useRef(null) // Initial value is null

        //Passing the synthetic event as argument to stop refreshing the page on submit
    function handleSubmit(e){
            e.preventDefault();
            setBlogs([{title:formData.title, description:formData.description},...blogs])
            // ... This is a rest operator which will add everything in an object to the state
            console.log(blogs);
            setformData({title:"",description:""}) // to remove text from the 
            titleRef.current.focus(); // this will focus on title text everytime something is added to blogs
        }
    
    function removeBlog(i){

       setBlogs(blogs.filter((blog,index) => 
        i !== index
       )
       // this function will remove blog which index mataches with the the passed index
    )}



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