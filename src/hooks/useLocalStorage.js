import {useEffect,useState} from 'react'
const PREFIX = 'cj-app'
export default function useLocalStorage(key,initialValue) {
    const prefixkey = PREFIX + key
   
    const [value,setValue] = useState(() =>{
        const jsonvalue = localStorage.getItem(prefixkey)
        if(jsonvalue != null) return JSON.parse(jsonvalue)
        if(typeof initialValue == 'function'){
            return initialValue()
        } else {
            return initialValue
        }

    })
    useEffect(() => {
        localStorage.setItem(prefixkey,JSON.stringify(value))
    }, [prefixkey,value])
    return [value,setValue]

}
