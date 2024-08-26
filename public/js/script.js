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