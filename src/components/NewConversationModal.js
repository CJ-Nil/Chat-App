import React,{useState} from 'react'
import {Form, Modal,Button} from 'react-bootstrap'
import {useContacts} from "../Context/ContactsProvider"
import {useConversations} from "../Context/ConversationProvider"
export default function NewConversationModal({closeModal}) {
    const [selectedContactIds,setSelectedContactIds] = useState([])
    const {contacts}=useContacts()
    const {createConversation} = useConversations()
    const brodcastid='*'
    function handleSubmit(e) {
        e.preventDefault()
        createConversation(selectedContactIds)
        closeModal()
    }

    function handleCheckBoxChange(contactId){
        setSelectedContactIds(prevSelectedContactIds =>{
            if(prevSelectedContactIds.includes(contactId)) {
                return prevSelectedContactIds.filter( prevId => {
                    return contactId !== prevId
                })
            } else{
                prevSelectedContactIds = prevSelectedContactIds.filter(I => I !== '*')
                return [...prevSelectedContactIds,contactId]
            }
        })
    }
    function handleBroadcast(){
        setSelectedContactIds(prevSelectedContactIds =>{
            
            if(prevSelectedContactIds.includes(brodcastid)) {
                return []
            } else{
                prevSelectedContactIds=[]
                return [...prevSelectedContactIds,brodcastid]
            }
        })
        console.log(selectedContactIds)
    }
    return (
        <>
        <Modal.Header closeButton className='bg-info'>
            <div className="" style={{width:'100vh',}}>
                <div className='text-white lead' style={{fontWeight:'bold'}}>Create Conversation</div>
                <div style={{marginLeft:'30vh'}}>
                   
                </div>
            </div>
        </Modal.Header>
        
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
               <Form.Group>
                   <Form.Check
                   type="checkbox"
                   label="#Broadcast"
                   checked={selectedContactIds.includes(brodcastid)}
                   value={selectedContactIds.includes(brodcastid)}
                   onChange={() => handleBroadcast()}
                   />
               </Form.Group>
                {contacts.map(contact => (
                    <Form.Group controlId={contact.id} key={contact.id}>
                        <Form.Check 
                        type="checkbox"
                        value={selectedContactIds.includes(contact.id)}
                        label={contact.name}
                        onChange={()=> handleCheckBoxChange(contact.id)}
                        checked={selectedContactIds.includes(contact.id)}
                        />
                    </Form.Group>
                ))}
                <Button className='align-items-start' type ="submit">Create</Button>
            </Form>
        </Modal.Body>
    </>
    )
}
