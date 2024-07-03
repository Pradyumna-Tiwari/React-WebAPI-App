import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';


import ProtectedRoutes from '../public/ProtectedRoutes';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Admin from './components/Admin';
import Header from './components/Header';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route element={<ProtectedRoutes />}>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
      </Route>
      <Route path='/Signin' element={<Signin />} />
      <Route path='/Signup' element={<Signup />} />
      <Route path='*' element={
        <div>
          <header>
            <h1>Not found!!</h1>
          </header>
          <p>
            <a href="/">Back to Signin</a>
          </p>
        </div>
      }
      />
    </Route>
  )
);

function App() {
  const isLogged = localStorage.getItem("user");


  const handleSignout = async () => {
    try {
      const response = await fetch('api/Auth/SignOut', {
        method: 'GET',
        credentials: 'include'
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.removeItem("user");
        alert(data.message); // Show success message
        document.location = "/"; // Redirect to home or sign-in page
      } else {
        console.log("Could not Signout", response);
        // Handle error case, maybe show an error message to the user
      }
    } catch (error) {
      console.error("Error during signout:", error);
      // Handle any network or other errors that might occur
    }
  };
  

  return (
    <>
      
         {isLogged ? (
                        <nav class="header navbar navbar-expand-lg navbar-light bg-light">
                          <a class="navbar-brand" href="#">REACT APP</a>
                          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                          </button>
                          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                          <div class="navbar-nav">
                          <a class="nav-item nav-link active" href="/">Home</a>
                          <a class="nav-item nav-link" href="/Admin">Admin</a>
                          </div>
                          </div>
                          <div class="logged_user float-end">
                            <a>{isLogged}</a>
                          </div>

                          <div class="signout_btn float-end">
                          <span class="btn btn-warning" onClick={handleSignout}>Signout</span>
                          </div>
                        </nav>
        ) : (
                        <nav class="header navbar navbar-expand-lg navbar-light bg-light">
                          <a class="navbar-brand" href="#">REACT APP</a>
                          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                          </button>
                          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                          <div class="navbar-nav ml-auto">
                          <a class="nav-item nav-link active" href="/Signup">Signup</a>
                          </div>
                          </div>
                        </nav>
        )} 
        
      
      <RouterProvider router={router} />
    </>
  );
}

export default App;
