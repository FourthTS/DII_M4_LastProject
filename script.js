var output = document.getElementById('contentArea')
var id = 642110317

let navBarArea = document.getElementById('navBarArea')
let mainContentArea = document.getElementById('mainContentArea')


//------------------------------------------------------------ hidden page ---------------------------------------------------------------------//
function hiddenPage() {
    mainContentArea.innerHTML = ''
    output.innerHTML = ''
}

//------------------------------------------------- MY LIST Click ----------------------------------------------------------------------//

document.getElementById('myListPage').addEventListener('click', (event) => {
    output.innerHTML = ''
    onLoad()
})

//-------------------------------------------------- search function & search page---------------------------------------------------//

document.getElementById('searchInputButton').addEventListener('click', function (e) {
    var searchInformation = document.getElementById('searchInputBox').value
    console.log(searchInformation)

    hiddenPage()

    fetch(`https://api.jikan.moe/v4/anime?q=${searchInformation}&&sfw`)
        .then((response) => {
            console.log('not found')
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
    card.classList.add("m-2")
    
    let img = document.createElement('img')
    img.classList.add("card-img-top")
    let imgUrl = movie.images.jpg.image_url
    img.setAttribute('src', imgUrl)

    let cardClass = document.createElement('div')
    cardClass.classList.add("description")
    let head = document.createElement('h1')
    head.classList.add("card-title")
    let name = movie.title
    head.innerHTML = name
    cardClass.appendChild(head)
    card.appendChild(img)
    card.appendChild(cardClass)
    cardDiv.appendChild(card)
    cardDiv.addEventListener('dblclick', function () {
        console.log(data)
        var r = confirm(`Add ${name} to MyList`);
        if (r == true) {
            allData = { id, movie }
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

function navBar() {
    let navBar = document.createElement('div')
    navBar.classList.add("flex")
    navBar.classList.add("justify-center")
    navBar.classList.add("text-[#e74538]")
    navBar.id="navBar"

    let id = document.createElement('id')
    id.classList.add("navBar")

    let divHome = document.createElement('div')
    divHome.classList.add("p-2")
    divHome.classList.add("basis-20")
    divHome.classList.add("text-center")
    divHome.id="homePage"
    divHome.innerText = 'HOME'

    let divAnime = document.createElement('div')
    divAnime.classList.add("p-2")
    divAnime.classList.add("basis-20")
    divAnime.classList.add("text-center")
    divAnime.id="animePage"
    divAnime.innerText = 'ANIME'

    let divManga = document.createElement('div')
    divManga.classList.add("p-2")
    divManga.classList.add("basis-20")
    divManga.classList.add("text-center")
    divManga.id="mangaPage"
    divManga.innerText = 'MANGA'

    let divMyList = document.createElement('div')
    divMyList.classList.add("p-2")
    divMyList.classList.add("basis-20")
    divMyList.classList.add("text-center")
    divMyList.id="myListPage"
    divMyList.innerText = 'MYLIST'

    navBar.appendChild(divHome)
    navBar.appendChild(divAnime)
    navBar.appendChild(divManga)
    navBar.appendChild(divManga)
    navBar.appendChild(divMyList)

    navBarArea.appendChild(navBar)
    
}

function homePageClick() {
    hiddenPage()
    mainContentArea.innerHTML =`<div class="w-full h-auto min-h-[80vh]  flex justify-center bg-no-repeat bg-cover"style="background-image: linear-gradient(to right, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), url(&quot;https://images8.alphacoders.com/632/thumb-1920-632051.png&quot;) ; background-position: 50% center;">
    <div class="w-100 flex justify-center items-center content-center">
      <div class="px-[12px] w-full flex flex-wrap justify-center items-center content-center max-w-[100%]">
          <div class="w-full text-white text-center ">
            <h2 class="text-5xl md:text-6xl font-semibold tracking-wide mb-2">Welcome to ANI<span class="text-[#e74538]">MAN</span></h2>
            <p>website for Everyone who Loves <span class="text-[#e74538]">ANIME</span> and <span class="text-[#e74538]">MANGA</span></p>
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

