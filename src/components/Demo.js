import React, { useState,useEffect } from 'react'

const UserPosts = () => {
  const [posts,setPosts]  = useState([]);

  const [formData,setFormData] = useState({
    id:null,
    body:'',
    title:'',
    userId:''
  })

  const [error,setError] = useState('')

  useEffect(()=>{
    fetchPosts()
 },[])

  const handleInputChange = (e) =>{
    setFormData({
       ...formData,
       [e.target.name] : e.target.value
    })
  }

  const fetchPosts = async() =>{
     setError('')
     try{
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if(!response.ok)
        {
          throw new Error("Error while fetching data");
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setPosts(jsonData)
     }catch(error)
        {
          setPosts([])
          console.log("Error while fetching data", error)
          setError('Unable to fecth Api data, Please try again later ')
        }
  } 

  const handleCreate = async() =>{
      setError('')
      if(!formData.title || !formData.body || !formData.userId)
      {
        setError('Please fill all required files')
      }
      else{
        setError('')
      }  
      try{
        const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
             method:'POST',
             headers:{
              'Content-Type':'application/json',
            },
            body:JSON.stringify(formData)
        })
        if(!response.ok)
        {
          throw new Error("Error while fetching data");
        }
        const newPost = await response.json()
        setPosts([...posts,newPost])
        resetForm()
     }catch(error)
        {
          console.log("Error while fetching data", error)
          setError('Unable to Create new post, Please try again later ')
        }
  } 

  const handleUpdate = async(id) =>{
    setError('')  
    try{
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
           method:'PUT',
           headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify(formData)
      })
      if(!response.ok)
      {
        throw new Error("Error while fetching data");
      }
      const updatedPost = await response.json()
      setPosts(posts.map(post => post.id === id ? updatedPost:post))
      resetForm()
   }catch(error)
      {
        console.log("Error while fetching data", error)
        setError('Unable to Update post, Please try again later ')
      }
}
  

  const handleDelete = async(id) =>{
    setError('')
    try{
       await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
            method:'DELETE',
      });
      setPosts(posts.filter((post)=>post.id !== id))
   }catch(error)
      {
        setError('Unable to Delete post, Please try again later ')
        console.log("Error while fetching data", error)
      }
  } 

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(formData.id)
    {
      handleUpdate(formData.id)
    } 
    else{
      handleCreate()
    } 
  }

  const handleEdit = (post) =>{
    setFormData({
       id:post.id,
       title:post.title,
       body:post.body,
       userId:post.userId
    })
  }

  
  const resetForm = () =>{
    setFormData({
       id:null,
       title:'',
       body:'',
       userId:''
    })
  }


  
  return (
    <div>
       <form style={{marginTop:'20px'}} onSubmit={handleSubmit}>
          <input
             type='text'
             value={formData.title}
             name='title'
             placeholder='Enter Tile'
             onChange={handleInputChange}
          />

          <input
             type='text'
             value={formData.body}
             name='body'
             placeholder='Enter Body'
             onChange={handleInputChange}
          />

          <input
             type='text'
             value={formData.userId}
             name='userId'
             placeholder='Enter UserId'
             onChange={handleInputChange}
          />

          <button>{formData.id ? 'Update':'Create'}</button>
       </form>

       {
        error &&
        <p style={{color:'red',marginTop:'20px'}}>{error}</p>
       }
       <div className='cards-container'>
          {
            posts.map((post,index)=>(
               <div className='card' key={index}>
                   <h1>{post.title}</h1>
                   <p>{post.body}</p>
                   <div>
                   <button onClick={()=>handleEdit(post)}>
                      <i className='bi bi-pencil'></i>
                   </button>
                   <button onClick={()=>handleDelete(post.id)}>
                      <i className='bi bi-trash'></i>
                   </button>
                   </div> 
              </div>  
            ))
          }
       </div>
    </div>
  )
}

export default UserPosts
