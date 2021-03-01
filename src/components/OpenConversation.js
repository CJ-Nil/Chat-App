import React, { useState, useCallback } from 'react'
import {Form,InputGroup,Button } from 'react-bootstrap'
import { useConversations } from '../Context/ConversationProvider'
import { Telegram,ImageFill } from 'react-bootstrap-icons'
export default function OpenConversation() {

    const [text,setText]=useState('')
    const [imgUP,setImgUp] = useState(false)
    const setRef = useCallback(node => {
        if(node){
            node.scrollIntoView({smooth:true})
        }
    },[])
    const brodcastid='*'
    const {sendMessage,selectedConversation} = useConversations()
    function handleSubmit(e){
        e.preventDefault()
        sendMessage(
            selectedConversation.recipients.map(r => r.id),
            text
        )
        setText('')
    }
    function uploadImage(){
        setImgUp(previmgUp =>{
            return (!previmgUp)
        })
    }
    return (
        <div className="d-flex flex-column flex-grow-1" style={{background:'#f0f0f0'}}>
            <div className='text-center text-white' style={{fontSize:'30px',fontWeight:'bolder',fontFamily:'initial',background:'#ec584a'}}>
                {
                    selectedConversation.recipients.map(r => {
                        if(r.name === brodcastid)
                        return "#Broadcast"
                        else return r.name
                    }).join(', ')
                }
            </div>
            <div className="flex-grow-1 overflow-auto" style={{scrollbarWidth:'none',msOverflowStyle:'none',WebkitScrollSnapType:'none'}}>
                <div className="d-flex flex-column align-items-start justify-content-end" 
                style={{paddingLeft :'5vw',paddingRight:'5vw'}}
                >
                    
                    {selectedConversation.messages.map((message,index) => {
                            const lastMessage = selectedConversation.messages.length - 1 === index
                            return(
                                <div 
                                ref = {lastMessage?setRef : null}
                                key = {index}
                                className ={`my-1 rounded px-2 d-flex flex-column border ${message.fromMe? 'align-self-end align-items-end':'align-items-start'}`}
                                >
                                    <div className ='text-muted small ' >
                                        {message.fromMe ? 'You' : message.senderName}
                                    </div>
                                    <div className={` lead ${message.fromMe
                                        ?' text-primary' : 'text-warning'}`} 
                                        style={{fontWeight:'600',fontFamily:'cursive',maxWidth:'400px', overflowWrap:'break-word',wordWrap:'break-word',hyphens:'auto'}}>
                                        {message.text}
                                    </div>
                                    
                                    <div className="small text-muted">
                                       {(message.date !== null)? checkDate(message.date):''} 
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                    
                        <ImageFill color='#ec584a' size={50} 
                            style={{marginLeft:'5px',marginRight:'5px',cursor:'pointer'}}
                            onClick={() => uploadImage()}
                        >
                        </ImageFill>
                        {
                            imgUP?
                            <div>
                            <Button className=''
                            style={{border: '5px solid #ec584a',backgroundColor:'#fff',padding: '8px 20px',borderRadius: '8px',
                            fontSize: '20px',fontWeight:'bold',color:'#ec584a'
                            }}
                            >Select Image</Button>
                            <Form.Control type="file" required hidden />
                            </div>
                            :
                            <Form.Control type="text" required value={text}
                            onChange={e => setText(e.target.value)}
                            style={{height:'50px',resize:'none',fontFamily:'cursive',fontSize:'20px',background:'#000',}}
                            className=' text-white rounded'
                            />
                        }
                        <InputGroup.Append>
                            <Button type="submit" 
                            className=''
                            style={{marginLeft:'5px',marginRight:'2px',height:'50px',width:'50px',borderRadius:'50%',transform: 'rotate(55deg)',backgroundColor:'whitesmoke'}}
                            >
                                <Telegram color='#ec584a' size={50} 
                                    style={{marginLeft:'-13px',marginTop:'-7px'}}
                                >
                                </Telegram>
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}
function checkDate(d){
    const today = new Date();
    var rday = new Date(d);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    var m= months[rday.getMonth()]
    var y = rday.getFullYear()
    var day = rday.getDate()
    let date="";
    if(today.getDate() === rday.getDate() && today.getMonth()=== rday.getMonth() && today.getFullYear() === rday.getFullYear())
    date= date+"Today "
    else 
    {
        date+=m+" ";
        date+= day.toString()+" "
        if(today.getFullYear() !== rday.getFullYear())
        date += y.toString()+" "
    }
    date+=rday.getHours()+":"+rday.getMinutes();
    return date;
}
