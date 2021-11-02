
/**
 * Fetching data from the server (Node) to generate the line graph
 *  http://localhost:8081/api/results
 */
 import React , {useEffect,useState} from 'react'
 import {Form,Button} from 'react-bootstrap';
 import Service from '../Services';
 import LineGraph from './LineGraph';
 import isURL from 'validator/lib/isURL'
 
 const APIData = () => {
 
  // Initialises the state 

   const [results, setResults] = useState([]);
   let [data,setData] = useState([]);
   const [urldata,setUrlData] = useState("https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression");
   let [error,setError] = useState("");
   const [errcode,setErrCode] = useState('');
   const [loading, setLoading] = useState(false);
   const [status,setStatus] = useState('');

   let arrCol = [];

   /* 
   hooks - functional componenet (useEffect)
    -hooks are functions that lets to hook into react state and lifecyle 
    features.
    Below mentioned hook executes when the component is loaded.
   */

   useEffect(() => {
     getData()
     }, [])
 
   /**
    * 
    * getData - getting data from the API
    * http://localhost:8081/api/results
    * updating the state with the response.
    * Service - Define all the api (http) routes.
    * Service.getAll() - get all the data from the api routes
    */  
   const getData = () =>{
       setLoading(true);
        Service.getAll()
     .then(response =>{
         setResults(response.data.item);
        let item = results && uniqueData(response.data.item);
        setData(item);
       setLoading(false)
       setStatus("");
     })
     .catch(e =>{
     //  console.log(e);
     })
    
   }
   /**
    * input change handler
    * @param {*} e 
    */
   const onHandleChange = (e) =>{
       setUrlData(e.target.value);
   }
   /**
    * validate the URL
    * Submit the user inputted url data
    * @param {} e 
    * @returns 
    */
   const handleSubmit = (e) => {
     e.preventDefault();
      if (!(isURL(urldata))){
       setError('Invalid URL');
       return false;
     } 
     submitURL();
     }
 
   const submitURL = async() =>{
     try{
       const response = await Service.create(urldata);
            if (response.data.errorCode)    {
             setErrCode(response.data.errorCode) ;           
           }
           else{
             setErrCode("");
             setError("");
             let item = results && uniqueData(response.data.item);
             if (item[0].col1.length>0){
              setData(item);
              setStatus("");
             }  
              else{
               response.data.failed && setStatus(response.data.failed);
               setUrlData("") ;
                 
              }
           }
     }catch(error){
       console.log(error);
     }
   }
 /**
  * fetching unique data by iterating the results (State)
  * using Set data structure  to store the unique data
  * checking the datatype and fetching numerical data to draw the graph
  * @param {} results 
  * @returns 
  */
   const uniqueData = (results) =>{
   let colSet1 = new Set([])
   let colSet2 = new Set([])
   let label = new Set([]) 
   let counter =0 ;
   let numCounter = 0;
    
   results &&  results.map((result,index)=>{
   
     for (const [key, value] of Object.entries(result)){
      let num1 = parseFloat(value);
      if (!(isNaN(num1)))
       {
         if (numCounter%2===0)
           colSet1.add(num1); 
         else
         colSet2.add(new Date(value).getFullYear());   
         numCounter++;
       }
       else{
          if (counter % 2===0)
           {
             label.add(value);
           }
           counter ++;
       }
     }
   })
   arrCol.push({
     col1:Array.from(colSet1),
     col2:Array.from(colSet2),
     col3:Array.from(label) 
   })
   setData(arrCol);
   return arrCol;
 }
    
   return (
   
     <div>
      
       <div className="card border-2">
       <div className="card-header mt-6">
          <h2>World Record</h2>
       </div>
       <div className="card-body ">
         { loading && loading }
       <Form  onSubmit={handleSubmit} method="post">
         <Form.Group>
           <Form.Label className="fa-2x">Enter the url</Form.Label>
           <Form.Control  type="text" name="urldata" value={urldata} placeholder="Enter url"  onChange={onHandleChange}
           />
           
         </Form.Group>
         
         <div className="alert-danger">
             { error ?? error } &nbsp; &nbsp;
             { errcode ?? errcode }
             { status ?? status}
           </div>
         
        <br></br>
         <div className="m-7">
           <Button variant="primary" type="submit" className="mt-16">
             Generate Graph
           </Button>
        </div>
       </Form>
       </div>
       </div>
       
        {!loading && !errcode && !status && <LineGraph arrCol={data}/> }
       </div>
   )
 }
 
 export default APIData
 