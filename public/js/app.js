/*
fetch is a browser based API and used only in client side
fetch allows us to fetch data from URL and then is a promise of fetch whihc allows us to do something with fetch data (argument is response)
fetch("http://localhost:3000/weather?address=koderma").then(response =>{
    response.json().then(data => {           //response.json - changes the JSON data into javascript object format  
        if(data.error){
            return console.log(data.error)
        }
        console.log(data.placeName)
        console.log(data.forecast)
    })
})
*/

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    const url = "/weather?address="+location

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(url).then((response)=> {
        response.json().then(data => {
            if(data.error){
                return messageOne.textContent = data.error
            }
            messageOne.textContent = data.placeName
            messageTwo.textContent = data.forecast
        })
    })
})
