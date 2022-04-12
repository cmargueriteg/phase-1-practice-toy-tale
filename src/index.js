let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  handleNewToyForm();
  getToys()
  submitNewToy()


});



const submitNewToy = () => {
    
    const toyForm = document.querySelector('.add-toy-form')
  
   
    toyForm.addEventListener('submit', (e) => {
      e.preventDefault()

      if(e.target.name.value.trim() && e.target.image.value.trim() ){
        const newToyName = e.target.name.value
        const newToyImage = e.target.image.value
  
        const newToyObj = {
          name: newToyName,
          image: newToyImage,
          likes: 0
        }
      
        renderAToy(newToyObj)
      }else{
        alert('fill out form')
      }
    })

  }




// ### Fetch Andy's Toys 

function getToys(){

  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => 
    
    toys.forEach(function(toy){
      renderAToy(toy)
    })
          
  

  )}





//### Add Toy Info to the Card

function renderAToy(toy){

const makeCard = document.createElement('div')
makeCard.className = "card"

const toyCollection = document.getElementById('toy-collection')

const toyName = document.createElement('h2')
toyName.innerText = toy.name

const toyImage = document.createElement('img')
toyImage.src = toy.image
toyImage.className = "toy-avatar"

const likeBtn = document.createElement('button')
likeBtn.innerText = 'Like <3'
likeBtn.className = 'like-btn'
likeBtn.id = toy.id

const toyLikes = document.createElement('p')
toyLikes.innerText = `${toy.likes} Likes`

likeBtn.addEventListener('click',(e) => {
  const currentLikesText = e.target.previousSibling.innerText
  const actualLikes = currentLikesText.split(" ")[0]

  e.target.previousSibling.innerText = `${parseInt(actualLikes) + 1} Likes`
})


makeCard.append(toyName, toyImage, toyLikes, likeBtn)
toyCollection.append(makeCard)

}
    
    
 
  

const handleNewToyForm = () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


}