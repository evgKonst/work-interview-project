const input = document.querySelector('#seachInp');
const main = document.querySelector('main')
const button = document.querySelector('#seachButt');
button.addEventListener('click', async (event)=>{
event.preventDefault()
console.log('click01')
const response = await fetch('/find', {
  method: 'POST',
  headers: {
    'Content-Type':'application/json'
  },
  body: JSON.stringify({
    company: input.value
  })

})
const otvet = await response.json();
console.log(otvet.company.id)

const newForm = await (await fetch('/partitials/formSeach.hbs')).text();
const template = Handlebars.compile(newForm)
main.innerHTML = template(otvet)
})
