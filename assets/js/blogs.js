const HASHNODE_API = "https://api.hashnode.com/"
const AUTH = "b9b3a936-f112-4c56-9d89-5dd364769aa3"

const query = (page) => {
  return `{
      user(username: "haorong") {
        publication {
          posts(page: ${page}) {
            title
            brief
            slug
            dateAdded
            coverImage
            popularity
          }
        }
      }
    }`
}
const renderBlogCard = (data) => {
  data.forEach((element) => {
    let contianer = document.querySelector("#blogs")
    var template = document.getElementById("blogCard")
    let blogCard = template.content.cloneNode(true)
    blogCard.querySelector("img").src = element.coverImage
    blogCard.querySelector("h5").textContent = element.title
    blogCard.querySelector("p").textContent = element.brief
    blogCard.querySelector(".day").textContent = element.dateAdded.slice(8, 10)
    blogCard.querySelector(".blogLink").href = "https://haorong.hashnode.dev/" + element.slug
    let month = element.dateAdded.slice(5, 7)
    switch (month) {
      case "01":
        month = "Jan"
        break
      case "02":
        month = "Feb"
        break
      case "03":
        month = "Mar"
        break
      case "04":
        month = "Apr"
        break
      case "05":
        month = "May"
        break
      case "06":
        month = "Jun"
        break
      case "07":
        month = "Jul"
        break
      case "08":
        month = "Aug"
        break
      case "09":
        month = "Sep"
        break
      case "10":
        month = "Oct"
        break
      case "11":
        month = "Nov"
        break
      case "12":
        month = "Dec"
        break

      default:
        console.log(`Sorry, we are out of ${month}.`)
    }
    blogCard.querySelector(".month").textContent = month
    contianer.appendChild(blogCard)
  })
}
console.log(window.ReactQuery)
async function gql(query, variables = {}) {
  const data = await fetch(HASHNODE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: AUTH,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  return data.json()
}

if ("content" in document.createElement("template")) {
  gql(query(1))
    .then((response) => response.data.user.publication.posts)
    .then((data) => renderBlogCard(data))
  gql(query(0))
    .then((response) => response.data.user.publication.posts)
    .then((data) => renderBlogCard(data))
}
let loadedPage = 2

window.onscroll = function (ev) {
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
    // you're at the bottom of the page
    gql(query(loadedPage))
      .then((response) => response.data.user.publication.posts)
      .then((data) => renderBlogCard(data))
    loadedPage++
  }
}
