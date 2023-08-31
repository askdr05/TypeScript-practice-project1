"use strict";
const getUserName = document.querySelector("#user");
const formSbmit = document.querySelector("#form");
const main_container = document.querySelector(".main_container");
//reUseable fun
const myCoustomFetcher = async (url, options) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Network response was not ok - ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
};
//display card ui
const showResultUi = (singleUser) => {
    const { avatar_url, login, url } = singleUser;
    main_container.insertAdjacentHTML("beforeend", `
        <div class='card'>
         <img src="${avatar_url}" alt="${login}"/>
         <hr/>
         <div class='card_footer'>
         <img src="${avatar_url}" alt="${login}"/>
         <a href="${url}"> Github </a>
         </div>
        </div>
        `);
};
function fetchUserData(url) {
    myCoustomFetcher(url, {}).then((userInfo) => {
        userInfo.map((singleUser) => showResultUi(singleUser));
    });
}
//default fun call
fetchUserData("https://api.github.com/users");
//handel search
formSbmit.addEventListener("click", async (e) => {
    e.preventDefault();
    const searchValue = getUserName.value.toLocaleLowerCase();
    const url = "https://api.github.com/users";
    try {
        const allUser = await myCoustomFetcher(url, {});
        const searchedUsers = allUser.filter((user) => {
            return user.login.toLocaleLowerCase().includes(searchValue);
        });
        main_container.innerHTML = "";
        if (searchedUsers.length === 0) {
            main_container.insertAdjacentHTML("beforeend", `<p class="empty-msg"> No matching user found </p>`);
        }
        else {
            searchedUsers.map((singleUser) => {
                showResultUi(singleUser);
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
