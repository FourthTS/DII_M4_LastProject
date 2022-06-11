var output = document.getElementById('contentArea')
//------------------------------------------------------------ search function ---------------------------------------------------//
document.getElementById('searchInputButton').addEventListener('click', function (e) {
    var searchInformation = document.getElementById('searchInputBox').value
    console.log(searchInformation) 
    document.getElementById('SearchArea').style.display = 'none'
    document.getElementById('showResultSearch').innerHTML = `Result of " ${searchInformation} "`
    fetch(`https://api.jikan.moe/v4/anime?q=${searchInformation}`)
        .then((response) => {
            console.log('not found')
            return response.json()
        }).then((data => {
            Search(data.data)
        }))
})
//------------------------------------------------------show card search function ---------------------------------------------------//
function Search(dataList) {
    for (data of dataList) {
        addcard(data)
    }
}
function addcard(movie) {

    let cardDiv = document.createElement('div')
    cardDiv.classList.add("col-2")
    //ลายละเอียดคุณสมบัติต่างๆ
    let cardDetail = document.createElement('div')
    cardDetail.classList.add("card")
    cardDetail.classList.add("shadow")
    cardDetail.classList.add("m-3")

    let img = document.createElement('img')
    img.classList.add("card")
    let imgUrl = movie.images.jpg.image_url
    img.setAttribute('src', imgUrl)

    let titleCard = document.createElement('div')
    titleCard.classList.add("description")
    let title = document.createElement('h1')
    let animeName = movie.title
    title.innerHTML = animeName
    titleCard.appendChild(title)

    cardDetail.appendChild(img)
    cardDetail.appendChild(titleCard)
    cardDiv.appendChild(cardDetail)
    cardDiv.addEventListener('dblclick', function () {
        console.log(data)
        var r = confirm(`Add ${animeName} to MyList`);
        if (r == true) {
            alldata = { id, movie }
            console.log(alldata)
            addtoMylistToDB(alldata)

        }
    })
    output.appendChild (cardDiv)
}