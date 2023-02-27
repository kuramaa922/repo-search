const input = document.querySelector(".input")
const listBox = document.querySelector(".box")
const infoBox = document.querySelector(".info-box")

let filteredArr = []


const getRepos = async (e) => {
  deleteAutoComplete()

  let val = e.target.value
  if (val.length === 0) return

  const url = `https://api.github.com/search/repositories?q=${ val }&per_page=5`
  const res = await fetch(url)
  const data = await res.json()
  filteredArr = data.items


  createAutoComlete()
}


function createAutoComlete() {
  const ul = document.createElement("ul")
  listBox.appendChild(ul)
  filteredArr.forEach((el, _, arr) => {
    const li = document.createElement("li")
    li.textContent = el.name
    li.addEventListener("click", () => {
      createRepoInfo(el)
      deleteAutoComplete()
      input.value = ""
      arr.splice(0)
    })
    ul.appendChild(li)
  })


}


function deleteAutoComplete() {
  const ulList = document.querySelector("ul")
  if (ulList) ulList.remove()

}


function createRepoInfo(obj) {
  let box = document.createElement("div")
  box.classList.add("boxInfo")

  let div = document.createElement("div")
  box.append(div)

  let name = document.createElement("p")
  let login = document.createElement("p")
  let stars = document.createElement("p")
  name.textContent = `name: ${ obj.name }`
  div.appendChild(name)

  login.textContent = `owner: ${ obj.owner.login }`
  div.appendChild(login)

  stars.textContent = `stars: ${ obj.stargazers_count }`
  div.appendChild(stars)

  let btn = document.createElement("button")
  btn.textContent = "X"
  btn.classList.add("deleteBtn")
  btn.setAttribute("id", obj.id)
  box.appendChild(btn)
  btn.addEventListener("click", delBox)
  infoBox.appendChild(box)
}


const delBox = (e) => {
  let btn = e.target
  let box = btn.parentNode
  infoBox.removeChild(box)
}



const fetchData = debounce(getRepos, 500)

input.addEventListener("input", fetchData)


