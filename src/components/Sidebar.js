import React, { useState } from 'react'
import {Tab, Nav, Button,Modal} from 'react-bootstrap'
import Contacts from './Contacts'
import Conversations from './Conversations'
import NewConversationModal from './NewConversationModal'
import NewContactModal from './NewContactModal'
const CONVERSATIONS_KEY = 'conversations'
const CONTACTS_KEY = 'contacts'
export default function Sidebar({ id }) {
    const [activeKey,setActiveKey] = useState(CONVERSATIONS_KEY)
    const [modalOpen, setModalOpen] = useState(false)

    const conversationOpen = activeKey === CONVERSATIONS_KEY
    function closeModal(){
        setModalOpen(false)
    }
    return (
        <div style={{width:'220px',fontWeight:'600',background:'#f0f0f0'}} className="d-flex flex-column" >
            <Tab.Container activeKey = {activeKey} onSelect={setActiveKey} >
                <Nav variant="tabs" style={{fontSize:'20px',fontWeight:'bolder',fontFamily:'-moz-initial'}} className="justify-content-left">
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATIONS_KEY}>Chats</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                        <Conversations/>
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACTS_KEY}>
                        <Contacts/>
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 border-top border-right small">
                    Your Id: <span className="text-muted">{id}</span>
                </div>
                <Button onClick={()=> setModalOpen(true) }
                className="rounded-0 btn-success">New {conversationOpen ? 'Conversation' : 'Contact'}</Button>
            </Tab.Container>
            <Modal show={modalOpen} onHide={closeModal}>
                {
                conversationOpen ?
                <NewConversationModal closeModal={closeModal} /> :
                <NewContactModal closeModal={closeModal} />
                }
            </Modal>
        </div>
    )
}
