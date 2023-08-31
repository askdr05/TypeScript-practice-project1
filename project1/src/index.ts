const getUserName = document.querySelector("#user") as HTMLInputElement;
const formSbmit = document.querySelector("#form") as HTMLFormElement;
const main_container = document.querySelector(".main_container") as HTMLDivElement;

interface userData {
    id: number;
    login: string;
    avatar_url: string;
    url: string
}

//reUseable fun

const myCoustomFetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Network response was not ok - ${response.status}`)
    }

    const data = await response.json()
    console.log(data)
    return data



}
//display card ui
const showResultUi = (singleUser: userData) => {
    const { avatar_url, login, url } = singleUser
    main_container.insertAdjacentHTML(
        "beforeend",
        `
        <div class='card'>
         <img src="${avatar_url}" alt="${login}"/>
         <hr/>
         <div class='card_footer'>
         <img src="${avatar_url}" alt="${login}"/>
         <a href="${url}"> Github </a>
         </div>
        </div>
        `
    )
}

function fetchUserData(url: string) {
    myCoustomFetcher<userData[]>(url, {}).then((userInfo) => {
        userInfo.map((singleUser) => showResultUi(singleUser))
    })
}

//default fun call
fetchUserData("https://api.github.com/users");

//handel search

formSbmit.addEventListener("click", async(e) => {
    e.preventDefault()
    const searchValue:string = getUserName.value.toLocaleLowerCase()
    const url : string = "https://api.github.com/users"
    try {
       const allUser = await myCoustomFetcher<userData[]>(url,{})
       const searchedUsers:userData[] = allUser.filter((user)=>{
        return user.login.toLocaleLowerCase().includes(searchValue)
       })

       main_container.innerHTML = ""
       
       if(searchedUsers.length===0){
        main_container.insertAdjacentHTML(
            "beforeend",
            `<p class="empty-msg"> No matching user found </p>`
        )
       }else{
        searchedUsers.map((singleUser:userData)=>{
            showResultUi(singleUser)
        })
       }

    } catch (error) {
        console.log(error)
    }

})