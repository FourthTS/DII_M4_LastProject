var output = document.getElementById('contentArea')
var id = 642110317

let navBarArea = document.getElementById('navBarArea')
let mainContentArea = document.getElementById('mainContentArea')


//------------------------------------------------------------ hidden page ---------------------------------------------------------------------//
function hiddenPage() {
    mainContentArea.innerHTML = ''
    output.innerHTML = ''
    navBarArea.innerHTML = ''
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

function Search(dataList) {
    for (data of dataList) {
        addCard(data)
    }
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
        console.log(data.title)
        checkInformations(data.title)
    }
}
//---------------------------------------------------------------- check information -----------------------------------------------//
function checkInformations(dataList) {
    fetch(`https://api.jikan.moe/v4/anime?q=${dataList}`)
            .then((response) => {
                console.log(response)
            }).then((data => {
                console.log('jiKan')
                console.log(data)
            }))
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
    button.setAttribute("onclick", "deleteMovie(data.id)")
    divButton.appendChild(button)

    divCard.appendChild(divImgCard)
    divCard.appendChild(divButton)

    let divShowInformation = document.createElement('div')
    divShowInformation.classList.add("grid")
    divShowInformation.classList.add("auto-rows-min")

    let head = document.createElement('p')
    head.classList.add("my-4")
    head.classList.add("text-[1.5rem]")
    head.classList.add("md:text-[2rem]")
    head.classList.add("font-bold")
    head.classList.add("text-white")
    head.innerHTML = data.title

    let synopsis = document.createElement('p')
    synopsis.classList.add("text-[1rem]")
    synopsis.classList.add("md:text-[1.5rem]")
    synopsis.classList.add("font-bold")
    synopsis.classList.add("text-[#e74538]")
    synopsis.innerHTML = "Synopsis"
    
    let synopsisDetile = document.createElement('p')
    synopsisDetile.classList.add("text-white")
    synopsisDetile.classList.add("opacity-80")
    synopsisDetile.classList.add("text-[12px]")
    synopsisDetile.classList.add("text-[11px]")
    synopsisDetile.classList.add("md:text-[1rem")
    synopsisDetile.innerHTML = data.synopsis

    divShowInformation.appendChild(head)
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
    divStart.innerHTML = `<p class="text-1rem sm:text-[1.5rem] md:text-[2rem] font-semibold tracking-wide text-[#fff]">ANI<span class="text-[#e74538] cursor-pointer">MA</span></p>`
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
    divAnime.classList.add("basis-20")
    divAnime.classList.add("text-center")
    divAnime.classList.add("rounded-md")
    divAnime.classList.add("hover:bg-[#e74538]")
    divAnime.classList.add("hover:text-[#151f2e]")
    divAnime.classList.add("cursor-pointer")

    divAnime.id="animePage"
    divAnime.innerText = 'ANIME'

    let divManga = document.createElement('div')
    divManga.classList.add("py-[0.7rem]")
    divManga.classList.add("basis-20")
    divManga.classList.add("text-center")
    divManga.classList.add("rounded-md")
    divManga.classList.add("hover:bg-[#e74538]")
    divManga.classList.add("hover:text-[#151f2e]")
    divManga.classList.add("cursor-pointer")

    divManga.id="mangaPage"
    divManga.innerText = 'MANGA'

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
    divCenter.appendChild(divManga)
    divCenter.appendChild(divManga)
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
      <div class="py-[0.7rem] basis-20 text-center rounded-md hover:bg-[#e74538] hover:text-[#151f2e] cursor-pointer " id="animePage">ANIME</div>
      <div class="py-[0.7rem] basis-20 text-center rounded-md hover:bg-[#e74538] hover:text-[#151f2e] cursor-pointer " id="mangaPage">MANGA</div>
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

