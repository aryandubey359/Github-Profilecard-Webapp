const APIURL = "https://api.github.com/users/";
let GITURL = "https://github.com/";
let REPOURL = "https://github.com/";
const showButton = document.getElementById("show-data");
const github_username = document.getElementById("github-username");
const list = document.getElementById("list");
const repo_container = document.getElementById("repo-container");
let userRepoData = null;

async function getUserData(userid){
    const resp = await fetch(APIURL + userid);
    const respData = await resp.json();
    GITURL = GITURL + userid;
    REPOURL = REPOURL + userid + "?tab=repositories";
    showData(respData);
    console.log(respData);
}

async function getUserRepoData(userid){
    const repoResp = await fetch(APIURL + userid + "/repos")
    const repoRespData = await repoResp.json();
    userRepoData = repoRespData;
    console.log(repoRespData);
    console.log(userRepoData);
}

showButton.addEventListener("click", () => {
    userid = github_username.value;
    console.log(userid);
    getUserData(userid);
})  

function invalidUserData(){
    const github_username = document.getElementById("github-username");
    userid = github_username.value;
    console.log(userid);
    getUserData(userid);
}


function showData(respData){
    if(respData.message == 'Not Found'){
        document.getElementById("profile-container").innerHTML = `
            <h2>Please enter a valid Github username!</h2>
            <div class="input" id="input">
          <input type="text" id="github-username" placeholder="Github username"/>
          <div class="show-button" id="show-button">
            <button id="show-data" onclick="invalidUserData()">Show User Data</button>
          </div>
        </div>
        `
    }
    else{
        document.getElementById("profile-container").innerHTML = `
        <img src="${respData.avatar_url}" alt="">
        <div class="profile-details" id="profile-details">
            <p class="name" id="name">${respData.name} <a href="${GITURL}" target="_blank">(${respData.login})</a></p>
            <p class="company" id="company">${respData.company}</p><br>
            <p class="bio" id="bio">${respData.bio}</p>
            <br>
            <div class="follow" id="follow">
                <a href="${REPOURL}"target="_blank">
                <button id="repo">Repositories: ${respData.public_repos}</button></a>
                <span class="followers" id="followers">Followers: ${respData.followers}</span>
                <span class="following" id="following">Following: ${respData.following}</span>
            </div>
        </div>    
    `
    }
}
