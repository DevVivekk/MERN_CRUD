import {useEffect, useState} from  'react'
import './App.css';

function App() {

  
const [name, setName] = useState('');
const [comment,setComment] = useState('');
const [userid, setUserid] = useState('');

const [form, setForm] = useState({name:'',comment:''});

const handleChange=(e)=>{
  let name,value;
  name=e.target.name;
  value= e.target.value
  setForm({...form,[name]:value})
}

const handleSubmit=(e)=>{
  e.preventDefault();
  //console.log(form);
}
const submitApi = async ()=>{
  const {name,comment} = form;
  const response  = await fetch('http://localhost:4000/submit',{
  method:'POST',
  headers:{
    'Accept':'application/json',
    'Content-Type':'application/json'
  },
  body:JSON.stringify({name,comment})
 })

 //const body_Data = await response.json();
 //console.log(body_Data);
 if(response.status === 401  || !form){
  window.alert(`This name "${name}" already exits!`)
 }else if(response.status===400 || !form){
   window.alert('invalid request!')
 }
 else{
  window.alert(`${name} added successfully!`)
  apiData();
 }
}
  // delete

  const deleteApi = async (_id)=>{
   if(window.confirm('Are you sure you wanna delete?')===true){
    await  fetch(`http://localhost:4000/delete/${_id}`,{
      method:'DELETE'
     }).then((respon)=>{
          respon.json()
    .then((resp)=>{
      console.log(resp)
     })
     apiData();
  })
   }
}

// select....

  function selectUser(id){
   //console.warn(item[_id])
   setName(item[id].name)
   setComment(item[id].comment)
   setUserid(item[id]._id)
  }

// upadte user...

 async function updateUser(userid){
  //console.log(`userid is ${userid}`)
  let item = {name,comment,userid};
  if(name===''){
    window.alert('please fill')
  }else if(comment===''){
    window.alert('please fill')
  }else{
    const sentt = await fetch(`http://localhost:4000/update/${userid}`,{
      method:'PATCH',
      headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
     })//.then((result)=>{
         // result.json()
    //.then((resp)=>{
      if(sentt.status === 404 || !item){
        window.alert('invalid request!')
      }else{
        window.alert('updated successfully!')
        apiData();
      }
     //})
  //})    
  }
}



  const url = 'http://localhost:4000/api';
  const [item,setItem]= useState(['']);

  const apiData=()=>{
    fetch(url)
    .then((response)=>
      response.json())
    .then((data)=>{
   setItem(data)
  //  setNamee(data[0].name)
  //  setComment(data[0].comment)
    })}
    // console.warn(item)
useEffect(()=>{
apiData();
},[])
  return (
    <div className="App">
   
    <table border="1">
      <tbody>
        <tr>
         <td>Name</td>
         <td>Comment</td>
         <td>delete</td>
         <td>Update</td>
        </tr>
        {
          item.map((value,id)=>
          <tr key={id}>
         <td>{value.name}</td>
         <td>{value.comment}</td>
         <td><button onClick={()=>deleteApi(value._id)}>delete</button></td>
         <td><button onClick={()=>selectUser(id)}>Update</button></td>
        </tr>
          )
        }
      </tbody>
    </table>
<br>
</br>
<hr></hr>
<br />
    <section>
    <h1>Enter Your data here.</h1>
    <form onSubmit={handleSubmit}>
      <input type='text' name='name' value={form.name} onChange={handleChange} placeholder='enter your name' /><br />
      <input type='text' name = 'comment' value={form.comment} onChange={handleChange} placeholder='comment' /><br />
      <button onClick={submitApi}>Submit</button>
      </form>
    </section>
    <section>
    <form>
    <h1>Update Your data here.</h1>
    <input type='text' onChange={(e)=>setName(e.target.value)} value={name} name='namee'  /><br />
      <input type='text' onChange={(e)=>setComment(e.target.value)} value={comment} name='comment' /><br />
      </form>
      <button onClick={()=>updateUser(userid)}>update User</button>
      </section>
    </div>
  );
}

export default App;
