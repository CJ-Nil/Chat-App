import React from 'react'
import Login from './Login'
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard'
import { ContactsProvider } from '../Context/ContactsProvider'
import { ConversationsProvider } from '../Context/ConversationProvider';
import { SocketProvider } from '../Context/SocketProvider';

function App() {
  const[id,setId] = useLocalStorage('id')
  const dashboard = (
    <SocketProvider id ={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id = {id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
    
  )
  return (
    id? dashboard : <Login onIdSubmit={setId}/>
  );
}

export default App;
