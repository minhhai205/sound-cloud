// Aplayer
const aplayer = document.querySelector("#aplayer");
if(aplayer){
  let dataSong = aplayer.getAttribute("data-song");
  dataSong = JSON.parse(dataSong);

  const ap = new APlayer({
    container: aplayer,
    audio: [{
        name: dataSong.title,
        artist: 'artist?',
        url: dataSong.audio,
        cover: dataSong.avatar,
    }]
  });
}
// End Aplayer

// Button Like
const buttonLike = document.querySelector("[button-like]");
//console.log(buttonLike)
if(buttonLike){
  buttonLike.addEventListener("click", () => {
    const id = buttonLike.getAttribute("button-like");
    
    const type = buttonLike.classList.contains("active") ? "dislike" : "like";

    fetch(`/songs/like/${type}/${id}`,{
      method: "PATCH"
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == 200) {
          const elementNumber = buttonLike.querySelector(".inner-number");
          elementNumber.innerHTML = data.like;
          buttonLike.classList.toggle("active");
        }
       
      })
  });
}
// End Button Like