import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import PetScreen from './screens/PetScreen'
import AdoptionScreen from './screens/AdoptionScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import InformationScreen from './screens/InformationScreen'
import DiagnosisScreen from './screens/DiagnosisScreen'
import RequestScreen from './screens/RequestScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import PetListScreen from './screens/PetListScreen'
import MyPetListScreen from './screens/MyPetListScreen'
import MyPetRequestScreen from './screens/MyPetRequestScreen'
import PetEditScreen from './screens/PetEditScreen'
import UserPetEditScreen from './screens/UserPetEditScreen'
import ConfirmationScreen from './screens/ConfirmationScreen'
import RequestListScreen from './screens/RequestListScreen'
import AcceptRequestScreen from './screens/AcceptRequestScreen'


function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/mypets' component={MyPetListScreen} />
          <Route path='/myrequests' component={MyPetRequestScreen} />
          <Route path='/information' component={InformationScreen} />
          <Route path='/diagnosis' component={DiagnosisScreen} />
          <Route path='/request/:id' component={RequestScreen} />
          <Route path='/accept/:id' component={AcceptRequestScreen} />
          <Route path='/pet/:id' component={PetScreen}  />
          <Route path='/adoption/:id?' component={AdoptionScreen}  />
          <Route path='/confirm' component={ConfirmationScreen}  />
          <Route path='/admin/userlist' component={UserListScreen}  />
          <Route path='/admin/user/:id/edit' component={UserEditScreen}  />

          <Route path='/admin/petlist' component={PetListScreen}  />
          <Route path='/admin/requestlist' component={RequestListScreen}  />
          <Route path='/admin/pet/:id/edit' component={PetEditScreen}  />
          <Route path='/user/pet/:id/edit' component={UserPetEditScreen}  />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}
export default App;
