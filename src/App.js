 /**
  * Importing the main (APIData) components 
  * Eg. <APIData>
  * Bootstrap styles are included.
  */
  import './App.css';
  import APIData from './components/APIData';
  import 'bootstrap/dist/css/bootstrap.min.css';
   
  function App() {
    return (
      <div className="App">
         <APIData/>
       </div>
    );
  }
  
  export default App;
  