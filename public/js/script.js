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
    }],
    autoplay: true
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

// Option Search
const searchOption = document.querySelector("[button-search]");
if(searchOption){
  let url = new URL(window.location.href);

  const buttonSelectons = searchOption.querySelectorAll("[data-name]");
  
  buttonSelectons.forEach(button => {
    button.addEventListener("click", () => {
      const option = button.getAttribute("data-name");

      let href = "";
      if(option){
        href = url.origin + `/search/${option}/` + url.search;
      }
      else{
        href = url.origin + `/search/` + url.search;
      }

      window.location.href = href;
    });
  });
}
// End Option Search