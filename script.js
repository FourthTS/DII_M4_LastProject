var output = document.getElementById('contentArea')
var output2 = document.getElementById('subContentArea')
var id = 642110317

let navBarArea = document.getElementById('navBarArea')
let mainContentArea = document.getElementById('mainContentArea')
let showResult = document.getElementById('showResultSearch')
let subContentAreaHead = document.getElementById('subContentAreaHead')
let ContentAreaBottom = document.getElementById('ContentAreaBottom')

//------------------------------------------------------------ hidden page ---------------------------------------------------------------------//
function hiddenPage() {
    mainContentArea.innerHTML = ''
    output.innerHTML = ''
    navBarArea.innerHTML = ''
    showResult.innerHTML = ''
    output2.innerHTML = ''
    ContentAreaBottom .innerHTML = ''
}

//-------------------------------------------------- search function & search page---------------------------------------------------//

function searchInformation() {
    document.getElementById('searchInputButton').addEventListener('click', function (e) {
        var searchInformation = document.getElementById('searchInputBox').value
        console.log(searchInformation)

        hiddenPage()
        navBar()

        fetch(`https://api.jikan.moe/v4/anime?q=${searchInformation}&&sfw`)
            .then((response) => {
                return response.json()
            }).then((data => {
                Search(data.data)
            }))
  })
}

function Search(dataList) {
    for (data of dataList) {
        addCard(data)
    }
}



function addCard(movie) {

    let cardDiv = document.createElement('div')
    cardDiv.classList.add("col-6")
    cardDiv.classList.add("col-lg-2")
    cardDiv.classList.add("col-md-3")
    cardDiv.classList.add("col-sm-4")

    let card = document.createElement('div')
    card.classList.add("card")
    card.classList.add("h-[13rem]")
    card.classList.add("lg:h-[19rem]")
    card.classList.add("md:h-[17rem]")
    card.classList.add("sm:h-[15rem]")
    card.classList.add("p-2")
    card.classList.add("my-2")
    card.classList.add("bg-no-repeat")
    card.classList.add("bg-cover")
    card.classList.add("bg-center")
    card.setAttribute('style','background-image: url('+movie.images.jpg.large_image_url+')')

    let cardClass = document.createElement('div')
    cardClass.classList.add("description")
    let head = document.createElement('p')
    head.classList.add("card-title")
    let name = movie.title
    head.innerHTML = name
    cardClass.appendChild(head)
    

    card.appendChild(cardClass)
    cardDiv.appendChild(card)
    cardDiv.addEventListener('dblclick', function () {
        console.log(data)
        var r = confirm(`Add ${name} to MyList`);
        if (r == true) {
            allData = { id, movie:{
                "url": `${movie.url}`,
                "image_url": `${movie.images.jpg.image_url}`,
                "title": `${movie.title}`,
                "synopsis":`${movie.synopsis}`,
                "type": `${movie.type}`,
                "episodes": `${movie.episodes}`,
                "score":`${movie.score}`,
                "rated": `${movie.rating}`
            } }
            console.log(allData)
            addtoMylistToDB(allData)

        }
    })
    output.appendChild(cardDiv)
}
//--------------------------------- Add information to My List in Database---------------------------------------------// 

function addtoMylistToDB(al) {
    fetch(`https://se104-project-backend.du.r.appspot.com/movies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(al)
    }).then((response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw Error(response.statusText)
        }
    }).then(data => {
        console.log('yes',data)
        console.log('compleat')
    })
}
// ----------------------------------- Mylist Page -----------------------------------------------------------------------------------//
function myListClick() {
    hiddenPage()
    onLoad()
    navBar()
    showResult.innerHTML = `<div class="ms-3 mt-3"><p class="text-[1rem] md:text-[2rem] font-bold text-[#ffff]">ANIME IN 
                            <span class="text-[#e74538]">MY LIST</span></p></div>`
}

function onLoad() {
    fetch('https://se104-project-backend.du.r.appspot.com/movies/642110317')
        .then((response) => {
            return response.json()
        }).then(data => {
            MyList(data)
            console.log(data)
        })
}
function MyList(dataList) {

    for (data of dataList) {
        addCardMyList(data)
    }
}
//----------------------------------------------------------------card my list ----------------------------------------------------//
function addCardMyList(data) {
    let cardDiv = document.createElement('div')
    cardDiv.classList.add("col-6")
    cardDiv.classList.add("col-lg-2")
    cardDiv.classList.add("col-md-3")
    cardDiv.classList.add("col-sm-4")

    let card = document.createElement('div')
    card.classList.add("card")
    card.classList.add("h-[13rem]")
    card.classList.add("lg:h-[19rem]")
    card.classList.add("md:h-[17rem]")
    card.classList.add("sm:h-[15rem]")
    card.classList.add("p-2")
    card.classList.add("my-2")
    card.classList.add("bg-no-repeat")
    card.classList.add("bg-cover")
    card.classList.add("bg-center")
    card.setAttribute('style','background-image: url('+data.image_url+')')

    let cardClass = document.createElement('div')
    cardClass.classList.add("description")
    let head = document.createElement('p')
    head.classList.add("card-title")
    let name = data.title
    head.innerHTML = name
    cardClass.appendChild(head)
    card.appendChild(cardClass)
    cardDiv.appendChild(card)

    cardDiv.addEventListener('click', function () {
        hiddenPage()
        navBar()
        showDetail(data)
    })

    output.appendChild(cardDiv)

    
    
}

//-------------------------------------------------- delete List ----------------------------------------------------------------//
function deleteMovie(id) {
    fetch(`https://se104-project-backend.du.r.appspot.com/movie?id=642110317&&movieId=${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw Error(response.statusText)
        }
    }).then(data => {
        alert(`${data.title} is now delete`)
        hiddenPage()
        myListClick()
    }).catch(error => {
        alert('Error')
    })
}

//-------------------------------------------------- showDetail in Mylist ----------------------------------------------------------------//
function showDetail(data) {
    let divShowDetail =document.createElement('div')
    divShowDetail.classList.add('px-[12px]')
    divShowDetail.classList.add('md:px-[40px]')
    divShowDetail.classList.add('grid')
    divShowDetail.classList.add('grid-cols-1')
    divShowDetail.classList.add('justify-items-center')
    divShowDetail.classList.add('gap-[70px]')
    divShowDetail.classList.add('md:grid-cols-[250px_1fr]')
    divShowDetail.classList.add('md:gap-[18px]')
    divShowDetail.classList.add('my-3')

    let divCard = document.createElement('div')
    divCard.classList.add('max-h-[40vh]')

    let divImgCard = document.createElement('div')
    divImgCard.classList.add('w-full')
    divImgCard.classList.add('min-w-full')
    divImgCard.classList.add('h-full')

    let img = document.createElement('img')
    
    img.src = data.image_url

    img.classList.add('object-cover')
    img.classList.add('min-w-full')
    img.classList.add('min-h-full')
    img.classList.add('h-full')
    img.classList.add('w-full')
    img.classList.add('rounded-3')

    divImgCard.appendChild(img)

    let divButton = document.createElement('div')
    divButton.classList.add('my-2')


    let button = document.createElement('button')
    button.classList.add('text-sm')
    button.classList.add('text-white')
    button.classList.add('h-[37px]')
    button.classList.add('w-full')
    button.classList.add('flex')
    button.classList.add('items-center')
    button.classList.add('justify-center')
    button.classList.add('bg-[#e74538]')
    button.classList.add('rounded-3')

    button.innerHTML="Remove from MyList"
    button.addEventListener('click', function () {
        var r = confirm(`delete ${data.title} On MyList`);
        if (r == true) {
            deleteMovie(data.id)
            output.innerHTML = ''
        }
    })

    divButton.appendChild(button)

    divCard.appendChild(divImgCard)
    divCard.appendChild(divButton)

    let divShowInformation = document.createElement('div')
    divShowInformation.classList.add("grid")
    divShowInformation.classList.add("auto-rows-min")
    divShowInformation.classList.add("bg-slate-800")
    divShowInformation.classList.add("p-3")
    divShowInformation.classList.add("rounded-3")

    let divButtonB = document.createElement('div')
    divButtonB.classList.add('flex')
    divButtonB.classList.add('flex-end')
    divButtonB.classList.add('justify-end')
    divButtonB.classList.add('content-end')

    let buttonBack = document.createElement('button')
    buttonBack.classList.add('h-[37px]')
    buttonBack.classList.add('text-center')
    buttonBack.classList.add('w-[3rem]')
    buttonBack.classList.add('absolute')
    buttonBack.classList.add('bg-lime-800')
    buttonBack.classList.add('rounded-3')

    buttonBack.innerHTML="Back"
    buttonBack.addEventListener('click', function () {
      myListClick()
    })

    divButtonB.appendChild(buttonBack)

    let head = document.createElement('p')
    head.classList.add("mb-3")
    head.classList.add("text-[1.5rem]")
    head.classList.add("md:text-[2rem]")
    head.classList.add("font-bold")
    head.classList.add("text-white")

    let link = document.createElement('a')
    link.href = `${data.url}` 
    link.classList.add("hover:text-[#e74538]")  
    link.innerHTML = data.title

    head.appendChild(link)

    let score = document.createElement('p')
    score.classList.add("text-[1rem]")
    score.classList.add("md:text-[1.5rem]")
    score.classList.add("text-[#e74538]")
    score.innerHTML = "Score : "
    
    let scoreDetile = document.createElement('span')
    scoreDetile.classList.add("text-white")
    scoreDetile.classList.add("ps-[5rem]")
    scoreDetile.classList.add("opacity-80")
    scoreDetile.classList.add("text-[1rem]")
    scoreDetile.classList.add("md:text-[1rem]")
    scoreDetile.innerHTML = data.score

    score.appendChild(scoreDetile)

    let type = document.createElement('p')
    type.classList.add("text-[1rem]")
    type.classList.add("md:text-[1.5rem]")
    type.classList.add("text-[#e74538]")
    type.innerHTML = "Type : "
    
    let typeDetile = document.createElement('span')
    typeDetile.classList.add("text-white")
    typeDetile.classList.add("ps-[5rem]")
    typeDetile.classList.add("opacity-80")
    typeDetile.classList.add("text-[1rem]")
    typeDetile.classList.add("md:text-[1rem]")
    typeDetile.innerHTML = data.type

    type.appendChild(typeDetile)

    let rate = document.createElement('p')
    rate.classList.add("text-[1rem]")
    rate.classList.add("md:text-[1.5rem]")
    rate.classList.add("text-[#e74538]")
    rate.innerHTML = "Rate : "
    
    let rateDetile = document.createElement('span')
    rateDetile.classList.add("text-white")
    rateDetile.classList.add("ps-[5rem]")
    rateDetile.classList.add("opacity-80")
    rateDetile.classList.add("text-[1rem]")
    rateDetile.classList.add("md:text-[1rem]")
    rateDetile.innerHTML = data.rated

    rate.appendChild(rateDetile)

    let synopsis = document.createElement('p')
    synopsis.classList.add("text-[1rem]")
    synopsis.classList.add("md:text-[1.5rem]")
    synopsis.classList.add("text-[#e74538]")
    synopsis.innerHTML = "Synopsis"
    
    let synopsisDetile = document.createElement('p')
    synopsisDetile.classList.add("text-white")
    synopsisDetile.classList.add("opacity-80")
    synopsisDetile.classList.add("text-[1rem]")
    synopsisDetile.classList.add("md:text-[1rem]")
    synopsisDetile.innerHTML = data.synopsis

    divShowInformation.appendChild(divButtonB)
    divShowInformation.appendChild(head)
    divShowInformation.appendChild(score)
    divShowInformation.appendChild(type)
    divShowInformation.appendChild(rate)
    divShowInformation.appendChild(synopsis)
    divShowInformation.appendChild(synopsisDetile)
    

    divShowDetail.appendChild(divCard)
    divShowDetail.appendChild(divShowInformation)
    output.appendChild(divShowDetail)

}
// ----------------------------------- All Anime Page -----------------------------------------------------------------------------------//
function allAnimePage() {
    hiddenPage()
    navBar()
    mainContentArea.innerHTML = ` 
  <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
    
    
    
    <div class="carousel-inner w-[100%] h-[25rem]">
      
      <div class="carousel-item active bg-no-repeat"style="height:25rem; background-image: url(https://pbs.twimg.com/media/EPERK6XWoAAiraW.jpg); background-position: center; background-size: cover;">
        <div class="rox justify-content-center align-item-center position-absolute top-50 start-50 translate-middle"  onclick="countTAnimeTContent()">
          <h5 class="text-center font-bold text-[2rem]">Top <span class="font-bold text-[2rem] text-[#e74538]">ANIME</span></h5>
          <p  class="text-center text-[1rem]">Ranking fo ANIME </p>
        </div>
      </div>


      <div class="carousel-item bg-no-repeat" style="height:25rem; background-image: url(https://www.online-station.net/wp-content/uploads/2021/12/02suzumenotojimari-00a.jpg); background-position: center; background-size: cover;>
        <div class="d-flex justify-content-center align-item-center" onclick="countNAnimeContent()">
          <div class="rox justify-content-center align-item-center position-absolute top-50 start-50 translate-middle" onclick="countNAnimeContent()">
              <h5 class="text-center font-bold text-[2rem]">ANIME <span class="font-bold text-[2rem] text-[#e74538]">UPCOMING</span></h5>
              <p class="text-center text-[1rem]">New Anime Coming Soon.</p>
          </div>
        </div>
      


      <div class="carousel-item bg-no-repeat" style="height:25rem; background-image: url(https://images8.alphacoders.com/667/thumb-1920-667873.png); background-position: center; background-size: cover;>
        <div class="d-flex justify-content-center align-item-center" onclick="countAAnimeContent()">
          <div class="rox justify-content-center align-item-center position-absolute top-50 start-50 translate-middle">
              <h5 class="text-center font-bold text-[2rem]">ANIME <span class="font-bold text-[2rem] text-[#e74538]">AIRING</span></h5>
              <p class="text-center text-[1rem]">All Anime Airing To Day</p>
          </div>
        </div>
    
    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`
  countAnimeContent()
}
// -------------------------------------------------------------- count anime page content ----------------------------------------------//
let count = 1

function countAnimeContent(){
  output2.innerHTML=''
  subAllAnimeContent(count)
}
function nextPageClick(){
  count +=1 
  output2.innerHTML=''
  subAllAnimeContent(count)
}
function backPageClick(){
  count -=1 
  output2.innerHTML=''
  subAllAnimeContent(count)
}

//--------------------------------------------------------------- All Anime page Sub content --------------------------------------------//
function subAllAnimeContent (page){
  output.innerHTML = `<div class="text-[2rem] font-bold text-[#e74538]">All ANIME</div>`;

  ContentAreaBottom.innerHTML = `<div class="flex justify-end my-3 ">
                                  <div class="flex justify-evenly border border-indigo-600 rounded-3">
                                    <div class="text-[#e74538] p-2 mx-2 cursor-pointer" onclick="backPageClick()"> << Prev </div>
                                      <p class="text-[#e74538] p-2">${page}</p>
                                    <div class="text-[#e74538] p-2 mx-2 cursor-pointer" onclick="nextPageClick()">Next >></div>
                                  </div>
                                </div>`

  fetch(`https://api.jikan.moe/v4/anime?page=${page}&&sfw`)
            .then((response) => {
                return response.json()
            }).then((data => {
                ListInformation(data.data)
            }))
}

function  ListInformation(dataList) {
    for (data of dataList) {
        addCard2(data)
    }
}

function addCard2(movie) {

    let cardDiv = document.createElement('div')
    cardDiv.classList.add("col-6")
    cardDiv.classList.add("col-lg-2")
    cardDiv.classList.add("col-md-3")
    cardDiv.classList.add("col-sm-4")

    let card = document.createElement('div')
    card.classList.add("card")
    card.classList.add("h-[13rem]")
    card.classList.add("lg:h-[19rem]")
    card.classList.add("md:h-[17rem]")
    card.classList.add("sm:h-[15rem]")
    card.classList.add("p-2")
    card.classList.add("my-2")
    card.classList.add("bg-no-repeat")
    card.classList.add("bg-cover")
    card.classList.add("bg-center")
    card.setAttribute('style','background-image: url('+movie.images.jpg.large_image_url+')')

    let cardClass = document.createElement('div')
    cardClass.classList.add("description")
    let head = document.createElement('p')
    head.classList.add("card-title")
    let name = movie.title
    head.innerHTML = name
    cardClass.appendChild(head)
    

    card.appendChild(cardClass)
    cardDiv.appendChild(card)
    cardDiv.addEventListener('click', function () {
      hiddenPage()
      navBar()
      showDetail2(movie)
        
    })
    output2.appendChild(cardDiv)
}
// -------------------------------------------------------------- count Top anime page content ----------------------------------------------//
let countT = 1

function countTAnimeTContent(){
  hiddenPage()
  navBar()
  TopAnimeContent(countT)
}
function nextPageTClick(){
  countT +=1 
  output2.innerHTML=''
  TopAnimeContent(countT)
}
function backPageTClick(){
  countT -=1 
  output2.innerHTML=''
  TopAnimeContent(countT)
}

//--------------------------------------------------------------- TOP Anime page Sub content --------------------------------------------//
function TopAnimeContent (page){
  output.innerHTML = `<div class="text-[2rem] font-bold text-[#e74538]">TOP ANIME</div>`;

  ContentAreaBottom.innerHTML = `<div class="flex justify-end my-3 ">
                                  <div class="flex justify-evenly border border-indigo-600 rounded-3">
                                    <div class="text-[#e74538] p-2 mx-2 cursor-pointer" onclick="backPageTClick()"> << Prev </div>
                                      <p class="text-[#e74538] p-2">${page}</p>
                                    <div class="text-[#e74538] p-2 mx-2 cursor-pointer" onclick="nextPageTClick()">Next >></div>
                                  </div>
                                </div>`

  fetch(`https://api.jikan.moe/v4/top/anime?page=${page}&&sfw`)
            .then((response) => {
                return response.json()
            }).then((data => {
                ListInformation(data.data)
            }))
}

function  ListInformation(dataList) {
    for (data of dataList) {
        addCard2(data)
    }
}


function addCard2(movie) {

    let cardDiv = document.createElement('div')
    cardDiv.classList.add("col-6")
    cardDiv.classList.add("col-lg-2")
    cardDiv.classList.add("col-md-3")
    cardDiv.classList.add("col-sm-4")

    let card = document.createElement('div')
    card.classList.add("card")
    card.classList.add("h-[13rem]")
    card.classList.add("lg:h-[19rem]")
    card.classList.add("md:h-[17rem]")
    card.classList.add("sm:h-[15rem]")
    card.classList.add("p-2")
    card.classList.add("my-2")
    card.classList.add("bg-no-repeat")
    card.classList.add("bg-cover")
    card.classList.add("bg-center")
    card.setAttribute('style','background-image: url('+movie.images.jpg.large_image_url+')')

    let cardClass = document.createElement('div')
    cardClass.classList.add("description")
    let head = document.createElement('p')
    head.classList.add("card-title")
    let name = movie.title
    head.innerHTML = name
    cardClass.appendChild(head)
    

    card.appendChild(cardClass)
    cardDiv.appendChild(card)
    cardDiv.addEventListener('click', function () {
      hiddenPage()
      navBar()
      showDetail2(movie)
        
    })
    output2.appendChild(cardDiv)
}
// -------------------------------------------------------------- count New anime page content ----------------------------------------------//
let countN = 1

function countNAnimeContent(){
  hiddenPage()
  navBar()
  NewAnimeContent(countN)
}
function nextPageNClick(){
  countN +=1 
  if(countN > 2){
    countN += (countN*0) + 2
  }
  output2.innerHTML=''
  NewAnimeContent(countN)
}
function backPageNClick(){
  countN -=1 
  if(countN <= 1){
    countN += (countN*0) + 1
  }
  output2.innerHTML=''
  NewAnimeContent(countN)
}

//---------------------------------------------------------------- New Anime page Sub content --------------------------------------------//
function NewAnimeContent (page){
  output.innerHTML = `<div class="text-[2rem] font-bold text-[#e74538]">ANIME UP COMING</div>`;

  ContentAreaBottom.innerHTML = `<div class="flex justify-end my-3 ">
                                  <div class="flex justify-evenly border border-indigo-600 rounded-3">
                                    <div class="text-[#e74538] p-2 mx-2 cursor-pointer" onclick="backPageNClick()"> << Prev </div>
                                      <p class="text-[#e74538] p-2">${page}</p>
                                    <div class="text-[#e74538] p-2 mx-2 cursor-pointer" onclick="nextPageNClick()">Next >></div>
                                  </div>
                                </div>`

  fetch(`https://api.jikan.moe/v4/anime?type=tv&&status=upcoming&&rating=pg13&&order_by=popularity&&start_date=2022-06&&page=${page}&&sfw`)
            .then((response) => {
                return response.json()
            }).then((data => {
                ListInformation(data.data)
            }))
}

function  ListInformation(dataList) {
    for (data of dataList) {
        addCard2(data)
    }
}

function addCard2(movie) {

    let cardDiv = document.createElement('div')
    cardDiv.classList.add("col-6")
    cardDiv.classList.add("col-lg-2")
    cardDiv.classList.add("col-md-3")
    cardDiv.classList.add("col-sm-4")

    let card = document.createElement('div')
    card.classList.add("card")
    card.classList.add("h-[13rem]")
    card.classList.add("lg:h-[19rem]")
    card.classList.add("md:h-[17rem]")
    card.classList.add("sm:h-[15rem]")
    card.classList.add("p-2")
    card.classList.add("my-2")
    card.classList.add("bg-no-repeat")
    card.classList.add("bg-cover")
    card.classList.add("bg-center")
    card.setAttribute('style','background-image: url('+movie.images.jpg.large_image_url+')')

    let cardClass = document.createElement('div')
    cardClass.classList.add("description")
    let head = document.createElement('p')
    head.classList.add("card-title")
    let name = movie.title
    head.innerHTML = name
    cardClass.appendChild(head)
    

    card.appendChild(cardClass)
    cardDiv.appendChild(card)
    cardDiv.addEventListener('click', function () {
      hiddenPage()
      navBar()
      showDetail2(movie)
        
    })
    output2.appendChild(cardDiv)
}
// -------------------------------------------------------------- count Airing anime page content ----------------------------------------------//
let countA = 1

function countAAnimeContent(){
  hiddenPage()
  navBar()
  AiringAnimeContent(countA)
}
function nextPageAClick(){
  countA +=1 
  output2.innerHTML=''
  AiringAnimeContent(countA)
}
function backPageAClick(){
  countA -=1 
  output2.innerHTML=''
  AiringAnimeContent(countA)
}

//---------------------------------------------------------------- Airing Anime page Sub content --------------------------------------------//
function AiringAnimeContent(page){
  output.innerHTML = `<div class="text-[2rem] font-bold text-[#e74538]">ANIME AIRING</div>`;

  ContentAreaBottom.innerHTML = `<div class="flex justify-end my-3 ">
                                  <div class="flex justify-evenly border border-indigo-600 rounded-3">
                                    <div class="text-[#e74538] p-2 mx-2 cursor-pointer" onclick="backPageAClick()"> << Prev </div>
                                      <p class="text-[#e74538] p-2">${page}</p>
                                    <div class="text-[#e74538] p-2 mx-2 cursor-pointer" onclick="nextPageAClick()">Next >></div>
                                  </div>
                                </div>`

  fetch(`https://api.jikan.moe/v4/anime?status=airing&&page=${page}&&sfw&&rating=pg13`)
            .then((response) => {
                return response.json()
            }).then((data => {
                ListInformation(data.data)
            }))
}

function  ListInformation(dataList) {
    for (data of dataList) {
        addCard2(data)
    }
}

function addCard2(movie) {

    let cardDiv = document.createElement('div')
    cardDiv.classList.add("col-6")
    cardDiv.classList.add("col-lg-2")
    cardDiv.classList.add("col-md-3")
    cardDiv.classList.add("col-sm-4")

    let card = document.createElement('div')
    card.classList.add("card")
    card.classList.add("h-[13rem]")
    card.classList.add("lg:h-[19rem]")
    card.classList.add("md:h-[17rem]")
    card.classList.add("sm:h-[15rem]")
    card.classList.add("p-2")
    card.classList.add("my-2")
    card.classList.add("bg-no-repeat")
    card.classList.add("bg-cover")
    card.classList.add("bg-center")
    card.setAttribute('style','background-image: url('+movie.images.jpg.large_image_url+')')

    let cardClass = document.createElement('div')
    cardClass.classList.add("description")
    let head = document.createElement('p')
    head.classList.add("card-title")
    let name = movie.title
    head.innerHTML = name
    cardClass.appendChild(head)
    

    card.appendChild(cardClass)
    cardDiv.appendChild(card)
    cardDiv.addEventListener('click', function () {
      hiddenPage()
      navBar()
      showDetail2(movie)
        
    })
    output2.appendChild(cardDiv)
}


//----------------------------------------------------------------shoe detail 2----------------------------------------------------------//
function showDetail2(data) {
  let divShowDetail =document.createElement('div')
  divShowDetail.classList.add('px-[12px]')
  divShowDetail.classList.add('md:px-[40px]')
  divShowDetail.classList.add('grid')
  divShowDetail.classList.add('grid-cols-1')
  divShowDetail.classList.add('justify-items-center')
  divShowDetail.classList.add('gap-[70px]')
  divShowDetail.classList.add('md:grid-cols-[250px_1fr]')
  divShowDetail.classList.add('md:gap-[18px]')
  divShowDetail.classList.add('my-3')

  let divCard = document.createElement('div')
  divCard.classList.add('max-h-[40vh]')

  let divImgCard = document.createElement('div')
  divImgCard.classList.add('w-full')
  divImgCard.classList.add('min-w-full')
  divImgCard.classList.add('h-full')

  let img = document.createElement('img')
  
  img.src = data.images.jpg.large_image_url

  img.classList.add('object-cover')
  img.classList.add('min-w-full')
  img.classList.add('min-h-full')
  img.classList.add('h-full')
  img.classList.add('w-full')
  img.classList.add('rounded-3')

  divImgCard.appendChild(img)

  let divButton = document.createElement('div')
  divButton.classList.add('my-2')


  let button = document.createElement('button')
  button.classList.add('text-sm')
  button.classList.add('text-white')
  button.classList.add('h-[37px]')
  button.classList.add('w-full')
  button.classList.add('flex')
  button.classList.add('items-center')
  button.classList.add('justify-center')
  button.classList.add('bg-[#e74538]')
  button.classList.add('rounded-3')

  button.innerHTML="Add To MyList"
  button.addEventListener('click', function () {
    var r = confirm(`Add ${data.title} to MyList`);
    if (r == true) {
        allData = { id, movie:{
            "url": `${data.url}`,
            "image_url": `${data.images.jpg.image_url}`,
            "title": `${data.title}`,
            "synopsis":`${data.synopsis}`,
            "type": `${data.type}`,
            "episodes": `${data.episodes}`,
            "score":`${data.score}`,
            "rated": `${data.rating}`
        } }
        console.log(allData)
        addtoMylistToDB(allData)

    }
  })

  divButton.appendChild(button)

  divCard.appendChild(divImgCard)
  divCard.appendChild(divButton)

  let divShowInformation = document.createElement('div')
    divShowInformation.classList.add("grid")
    divShowInformation.classList.add("auto-rows-min")
    divShowInformation.classList.add("bg-slate-800")
    divShowInformation.classList.add("p-3")
    divShowInformation.classList.add("rounded-3")

    let divButtonB = document.createElement('div')
    divButtonB.classList.add('flex')
    divButtonB.classList.add('flex-end')
    divButtonB.classList.add('justify-end')
    divButtonB.classList.add('content-end')

    let buttonBack = document.createElement('button')
    buttonBack.classList.add('h-[37px]')
    buttonBack.classList.add('text-center')
    buttonBack.classList.add('w-[3rem]')
    buttonBack.classList.add('absolute')
    buttonBack.classList.add('bg-lime-800')
    buttonBack.classList.add('rounded-3')

    buttonBack.innerHTML="Back"
    buttonBack.addEventListener('click', function () {
      allAnimePage()
    })

    divButtonB.appendChild(buttonBack)

    let head = document.createElement('p')
    head.classList.add("mb-3")
    head.classList.add("text-[1.5rem]")
    head.classList.add("md:text-[2rem]")
    head.classList.add("font-bold")
    head.classList.add("text-white")

    let link = document.createElement('a')
    link.href = `${data.url}` 
    link.classList.add("hover:text-[#e74538]")  
    link.innerHTML = data.title

    head.appendChild(link)

    let score = document.createElement('p')
    score.classList.add("text-[1rem]")
    score.classList.add("md:text-[1.5rem]")
    score.classList.add("text-[#e74538]")
    score.innerHTML = "Score : "
    
    let scoreDetile = document.createElement('span')
    scoreDetile.classList.add("text-white")
    scoreDetile.classList.add("ps-[5rem]")
    scoreDetile.classList.add("opacity-80")
    scoreDetile.classList.add("text-[1rem]")
    scoreDetile.classList.add("md:text-[1rem]")
    scoreDetile.innerHTML = data.score

    score.appendChild(scoreDetile)

    let type = document.createElement('p')
    type.classList.add("text-[1rem]")
    type.classList.add("md:text-[1.5rem]")
    type.classList.add("text-[#e74538]")
    type.innerHTML = "Type : "
    
    let typeDetile = document.createElement('span')
    typeDetile.classList.add("text-white")
    typeDetile.classList.add("ps-[5rem]")
    typeDetile.classList.add("opacity-80")
    typeDetile.classList.add("text-[1rem]")
    typeDetile.classList.add("md:text-[1rem]")
    typeDetile.innerHTML = data.type

    type.appendChild(typeDetile)

    let rate = document.createElement('p')
    rate.classList.add("text-[1rem]")
    rate.classList.add("md:text-[1.5rem]")
    rate.classList.add("text-[#e74538]")
    rate.innerHTML = "Rate : "
    
    let rateDetile = document.createElement('span')
    rateDetile.classList.add("text-white")
    rateDetile.classList.add("ps-[5rem]")
    rateDetile.classList.add("opacity-80")
    rateDetile.classList.add("text-[1rem]")
    rateDetile.classList.add("md:text-[1rem]")
    rateDetile.innerHTML = data.rating

    rate.appendChild(rateDetile)

    let synopsis = document.createElement('p')
    synopsis.classList.add("text-[1rem]")
    synopsis.classList.add("md:text-[1.5rem]")
    synopsis.classList.add("text-[#e74538]")
    synopsis.innerHTML = "Synopsis"
    
    let synopsisDetile = document.createElement('p')
    synopsisDetile.classList.add("text-white")
    synopsisDetile.classList.add("opacity-80")
    synopsisDetile.classList.add("text-[1rem]")
    synopsisDetile.classList.add("md:text-[1rem]")
    synopsisDetile.innerHTML = data.synopsis

    divShowInformation.appendChild(divButtonB)
    divShowInformation.appendChild(head)
    divShowInformation.appendChild(score)
    divShowInformation.appendChild(type)
    divShowInformation.appendChild(rate)
    divShowInformation.appendChild(synopsis)
    divShowInformation.appendChild(synopsisDetile)
    

    divShowDetail.appendChild(divCard)
    divShowDetail.appendChild(divShowInformation)
    output.appendChild(divShowDetail)

}
//---------------------------------------------------------------- navBar ---------------------------------------------------------------//
function navBar() {
    let navBar = document.createElement('div')
    navBar.classList.add("flex")
    navBar.classList.add("justify-between")
    navBar.classList.add("text-[#e74538]")
    navBar.classList.add("my-2")
    navBar.classList.add("mx-0")
    navBar.id="navBar"

    let divStart = document.createElement('div')
    divStart.classList.add("flex")
    divStart.classList.add("col-2")
    divStart.classList.add("col-md-3")
    divStart.classList.add("pt-1.5")
    divStart.classList.add("sm:pt-0")
    divStart.innerHTML = `<p class="text-1rem sm:text-[1.5rem] md:text-[2rem] ps-3 font-semibold tracking-wide text-[#fff]">ANI<span class="text-[#e74538] cursor-pointer">MA</span></p>`
    divStart.setAttribute("onclick", "homePageClick()")

    let divCenter = document.createElement('div')
    divCenter.classList.add("flex")
    divCenter.classList.add("col-6")
    divCenter.classList.add("col-md-5")
    divCenter.classList.add("justify-evenly")
    divCenter.classList.add("text-[0.7rem]")
    divCenter.classList.add("xs:text-[0.8rem]")
    divCenter.classList.add("sm:text-[0.9rem]")
    divCenter.classList.add("md:text-[1rem]")
    
    let divHome = document.createElement('div')
    divHome.classList.add("py-[0.7rem]")
    divHome.classList.add("basis-20")
    divHome.classList.add("text-center")
    divHome.classList.add("rounded-md")
    divHome.classList.add("hover:bg-[#e74538]")
    divHome.classList.add("hover:text-[#151f2e]")
    divHome.classList.add("cursor-pointer")

    divHome.id="homePage"
    divHome.setAttribute("onclick", "homePageClick()")
    divHome.innerText = 'HOME'

    let divAnime = document.createElement('div')
    divAnime.classList.add("py-[0.7rem]")
    divAnime.classList.add("px-[0.7rem]")
    divAnime.classList.add("base-basis-20")
    divAnime.classList.add("text-center")
    divAnime.classList.add("rounded-md")
    divAnime.classList.add("hover:bg-[#e74538]")
    divAnime.classList.add("hover:text-[#151f2e]")
    divAnime.classList.add("cursor-pointer")

    divAnime.id="animePage"
    divAnime.setAttribute("onclick", "allAnimePage()")
    divAnime.innerText = 'ALL ANIME'



    let divMyList = document.createElement('div')
    divMyList.classList.add("py-[0.7rem]")
    divMyList.classList.add("basis-20")
    divMyList.classList.add("text-center")
    divMyList.classList.add("rounded-md")
    divMyList.classList.add("hover:bg-[#e74538]")
    divMyList.classList.add("hover:text-[#151f2e]")
    divMyList.classList.add("cursor-pointer")

    divMyList.id="myListPage"
    divMyList.setAttribute("onclick", "myListClick()")
    divMyList.innerText = 'MYLIST'

    divCenter.appendChild(divHome)
    divCenter.appendChild(divAnime)
    divCenter.appendChild(divMyList)

    
    let divEnd = document.createElement('div')
    divEnd.classList.add("flex")
    divEnd.classList.add("col-4")
    divEnd.classList.add("col-md-4")

    divEnd.innerHTML = `<div class="relative w-full max-w-[500px] mt-1.5">
    <form class="relative shadow-2xl">
      <div class="w-full">
        <input class="w-full h-[20px] md:h-[38px] text-sm md:text-base px-[23px] leading-[46px] rounded-md" placeholder="search" type="text" id="searchInputBox">
        <button class="bg-[#151f2e] hover:bg-[#e74538] absolute top-[0.1735rem] md:top-0 right-[-1px] inline-flex justify-center items-center content-center h-[20px] md:h-[38px] px-[26px] py-[10px] rounded-r-md" type="button" id="searchInputButton" onclick="searchInformation()">
          <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fa-search" height="1rem" width="1rem">
            <path fill="#f5f5f5" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
          </svg>
        </button>
    </div>
  </form>
</div>`

    navBar.appendChild(divStart)
    navBar.appendChild(divCenter)
    navBar.appendChild(divEnd)

    navBarArea.appendChild(navBar)
    
}
function navBarOld() {
    navBarArea.innerHTML=`<div class="flex justify-between text-[#e74538] my-2 mx-0" id="navBar">
    <div class="flex col-6 col-md-4 text-[1.5rem] md:text-[2rem]">
      <p class="font-semibold tracking-wide ps-3 text-[#fff]">ANI<span class="text-[#e74538]">MA</span></p>
    </div>
    <div class="flex col-6 col-md-4 justify-evenly text-[0.7rem] xs:text-[0.8rem] sm:text-[0.9rem] md:text-[1rem]">
      <div class="py-[0.7rem] basis-20 text-center rounded-md hover:bg-[#e74538] hover:text-[#151f2e] cursor-pointer " id="homePage" onclick="homePageClick()">HOME</div>
      <div class="py-[0.7rem] px-[0.7rem] base-basis-20 text-center rounded-md hover:bg-[#e74538] hover:text-[#151f2e] cursor-pointer " id="animePage" onclick="allAnimePage()">ALL ANIME</div>
      <div class="py-[0.7rem] basis-20 text-center rounded-md hover:bg-[#e74538] hover:text-[#151f2e] cursor-pointer " id="myListPage "onclick="myListClick()">MYLIST</div>
    </div>
    <div div class="flex col-0 col-md-4">

    </div>
  </div>`
}

function homePageClick() {
    hiddenPage()
    navBarOld()
    mainContentArea.innerHTML =` <div class="w-full h-auto min-h-[90vh]  flex justify-center bg-no-repeat bg-cover bg-center" style="background-image: url(https://images8.alphacoders.com/632/thumb-1920-632051.png) ;">
    <div class="w-100 flex justify-center items-center content-center">
      <div class="px-[12px] w-full flex flex-wrap justify-center items-center content-center max-w-[100%]">
          <div class="w-full text-white text-center ">
            <h2 class="text-4xl md:text-5xl font-semibold tracking-wide mb-2">Welcome to ANI<span class="text-[#e74538]">MA<span class="text-[#fff] text-[0.5rem] md:text-[0.9rem]"> WebSite</span></h2>
            <p>website for Everyone who Loves <a class="text-[#e74538] cursor-pointer">ANIME</a> and <a class="text-[#e74538] cursor-pointer">MANGA</a></p>
          </div>
          <div class="relative w-full max-w-[500px] mt-3">
            <form class="relative shadow-2xl">
              <div class="w-full">
                <input class="w-full h-[32px] md:h-[38px] text-sm md:text-base px-[23px] leading-[46px] rounded-md" placeholder="search" type="text" id="searchInputBox">
                <button class="bg-[#151f2e] absolute top-0 right-[-1px] inline-flex justify-center items-center content-center h-[32px] md:h-[38px] px-[26px] py-[10px] rounded-r-md" type="button" id="searchInputButton" onclick="searchInformation()">
                  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fa-search" height="1rem" width="1rem">
                    <path fill="#f5f5f5" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                  </svg>
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>`
}

