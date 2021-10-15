const types = {
    video: "youtube#video",
    channel: "youtube#channel"
}
Object.freeze(types);

window.addEventListener("load", function(){
    const searchBtn = document.getElementById("submit");
    searchBtn.addEventListener("click", handleSearch);
})

function getVideoResults(q){
    return fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${q}&key=AIzaSyBRYJ22kk_nQjRNrYNrSxZhCKhcpVMUZwE`)
    .then(response => response.json())
    .then(response => response)
    .catch(error => console.log(error))
}

function createVideoCards(data){
    
    const videoDiv = document.createElement("div");
    videoDiv.setAttribute("class", "video-card")

    const imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "video-img");

    const textDiv = document.createElement("div");
    textDiv.setAttribute("class", "video-info");

    const videoName = data.snippet.title;
    
    const channelName = data.snippet.channelTitle;
    const vidInfo = data.snippet.description;
    const videoImg = data.snippet.thumbnails.high.url;

    const titleText = document.createElement("p");
    titleText.textContent = videoName;
    titleText.setAttribute("class", "video-title");

    const channelDiv = document.createElement("div");
    channelDiv.setAttribute("class", "channel-info");

    const channelPic = document.createElement("div");
    channelPic.setAttribute("class", "channel-pic")

    const channelText = document.createElement("p");
    channelText.textContent = channelName;
    channelText.setAttribute("class", "vid-infotext");

    const infoText = document.createElement("p");
    infoText.textContent = vidInfo;
    infoText.setAttribute("class", "vid-infotext");

    channelDiv.append(channelPic, channelText);
    textDiv.append(titleText, channelDiv, infoText);

    imgDiv.innerHTML = `<img id="vid-img" src="${videoImg}" />`;

    if ( data.id.kind === types.channel){
        return false;
    }
    
    videoDiv.append(imgDiv, textDiv)
    return videoDiv;

}

async function handleSearch(){

    const search = document.getElementById("search-input").value;
    try{
        const {items: results} = await getVideoResults(search);
        console.log(results);
        const allCards = [];

        for (let video of results){
            const card = createVideoCards(video);

            card.addEventListener("click", () => {
                var win = window.open(`https://www.youtube.com/watch?v=${video.id.videoId}`, '_blank');
                win.focus();
            })

            if (card){
                allCards.push(card);
            }
        }

        const resultsContainer = document.getElementById("search-results");
        resultsContainer.innerHTML = null;
        resultsContainer.style.padding = "2.5%";
        resultsContainer.append(...allCards)
    }
    catch{

    }
}