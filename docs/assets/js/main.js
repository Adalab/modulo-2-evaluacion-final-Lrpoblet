"use strict";const loading=document.querySelector(".js_loading"),charactersList=document.querySelector(".js_characters"),charactersFavList=document.querySelector(".js_fav"),textInput=document.querySelector(".js_textinput"),btn=document.querySelector(".js_btn"),btnDelete=document.querySelector(".js_btn-delete"),btnAllCharacters=document.querySelector(".js_all");let charactersData=[],charactersSearch=[],charactersFavData=[];const characterListStored=JSON.parse(localStorage.getItem("characterList")),favListStored=JSON.parse(localStorage.getItem("favList"));function renderCharacters(e){let t="",a="";-1===charactersFavData.findIndex(t=>t.char_id===e.char_id)?(t="none",a="hidden"):(t="fav",a="close");const r=document.createElement("li"),c=document.createElement("article"),s=document.createElement("img"),n=document.createElement("h3"),d=document.createElement("p"),i=document.createElement("p"),l=document.createTextNode(e.name),h=document.createTextNode(e.status),o=document.createTextNode("x");s.setAttribute("src",e.img),s.setAttribute("alt",""+e.name),r.setAttribute("id",""+e.char_id),i.setAttribute("id",""+e.char_id),n.appendChild(l),d.appendChild(h),i.appendChild(o),c.appendChild(s),c.appendChild(n),c.appendChild(d),c.appendChild(i),r.appendChild(c),c.classList.add("article-character"),r.classList.add("js_character"),s.classList.add("img"),i.classList.add(a),i.classList.add("js_close"),r.classList.add(t);return r}function renderCharactersList(e){loading.innerHTML="",charactersList.innerHTML="";for(const t of e)charactersList.appendChild(renderCharacters(t));addCharactersListerers()}function renderFilteredList(e){charactersList.innerHTML="";for(const t of e)charactersList.appendChild(renderCharacters(t));addCharactersListerers()}function renderFav(){charactersFavList.innerHTML="";for(const e of charactersFavData)charactersFavList.appendChild(renderCharacters(e));addCCloseListerers()}function charactersSearched(){const e=textInput.value.toLowerCase();fetch("https://breakingbadapi.com/api/characters?name="+e).then(e=>e.json()).then(e=>{charactersSearch=e,renderFilteredList(charactersSearch)}).catch(e=>{console.error(e)})}function handleClick(e){e.preventDefault(),charactersSearched()}function handleEnter(e){13===e.keyCode&&(e.preventDefault(),charactersSearched())}function handleClickAll(e){e.preventDefault(),renderCharactersList(charactersData),textInput.value=""}function selectFav(e){e.currentTarget.classList.remove("none"),e.currentTarget.classList.toggle("fav")}function addFav(e){const t=charactersData.find(t=>t.char_id===parseInt(e.currentTarget.id)),a=charactersFavData.findIndex(t=>t.char_id===parseInt(e.currentTarget.id));-1===a?(charactersFavData.push(t),localStorage.setItem("favList",JSON.stringify(charactersFavData))):(charactersFavData.splice(a,1),localStorage.setItem("favList",JSON.stringify(charactersFavData))),renderFav()}function handleClickCharacter(e){selectFav(e),addFav(e)}function deleteFavCharacters(){charactersFavList.innerHTML="",charactersFavData=[],localStorage.setItem("favList",JSON.stringify(charactersFavData))}function handleClickDelete(){deleteFavCharacters(),renderCharactersList(charactersData)}function handleClose(e){const t=charactersFavData.findIndex(t=>t.char_id===parseInt(e.currentTarget.id));-1!==t&&(charactersFavData.splice(t,1),localStorage.setItem("favList",JSON.stringify(charactersFavData))),renderFav(),renderCharactersList(charactersData)}function addCharactersListerers(){const e=document.querySelectorAll(".js_character");for(const t of e)t.addEventListener("click",handleClickCharacter)}function addCCloseListerers(){const e=document.querySelectorAll(".js_close");for(const t of e)t.addEventListener("click",handleClose)}null!==favListStored&&(charactersFavData=favListStored,renderFav()),null!==characterListStored?(charactersData=characterListStored,renderCharactersList(charactersData)):fetch("https://breakingbadapi.com/api/characters").then(e=>e.json()).then(e=>{charactersData=e,localStorage.setItem("characterList",JSON.stringify(charactersData)),renderCharactersList(charactersData)}).catch(e=>{console.error(e)}),btn.addEventListener("click",handleClick),textInput.addEventListener("keypress",handleEnter),btnDelete.addEventListener("click",handleClickDelete),btnAllCharacters.addEventListener("click",handleClickAll);