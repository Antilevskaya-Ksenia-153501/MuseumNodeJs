import {Layout} from './components/Layout.jsx';
import {Routes, Route} from 'react-router-dom';
import {MainPage} from './pages/MainPage';
import {ExhibitsPage} from './pages/ExhibitsPage';
import {ExhibitPage} from './pages/ExhibitPage';
import {AddExhibitPage} from './pages/AddExhibitPage';
import {EditExhibitPage} from './pages/EditExhibitPage';
import {RegisterPage} from './pages/RegisterPage';
import {SignInPage} from './pages/SignInPage';
import {HallsPage} from './pages/HallsPage';
import {CreateHallPage} from './pages/CreateHallPage';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={ <MainPage/> }/>
        <Route path='/exhibits' element={ <ExhibitsPage/> }/>
        <Route path='/exhibit-details/:id' element={ <ExhibitPage/> }/>
        <Route path='/new-exhibit' element={ <AddExhibitPage/> }/>
        <Route path='/edit-exhibit/:id' element={ <EditExhibitPage/> }/>
        <Route path='/register' element={ <RegisterPage/> }/>
        <Route path='/signin' element={ <SignInPage/> }/>
        <Route path='/halls' element={ <HallsPage/> }/>
        <Route path='/create-hall' element={ <CreateHallPage/> }/>
      </Routes>

      <ToastContainer position='bottom-right'></ToastContainer>
    </Layout>
  );
}

export default App;