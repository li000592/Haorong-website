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
const dateConverter = (date) => {
  let month = date.slice(5, 7)
  const day = date.slice(8, 10)
  const year = date.slice(0, 4)

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
  return `${month} ${day},${year}`
}
const updateBlogCard = (data) => {
  for (let index = 0; index < 3; index++) {
    console.log(data[index])
    const blog = document.getElementById(`blog-${index + 1}`)
    blog.querySelector("img").src = data[index].coverImage
    blog.querySelector("h5").textContent = data[index].title
    if (data[index].brief.length > 120) {
      blog.querySelectorAll("p")[1].textContent = data[index].brief.slice(0, 120) + "..."
    } else {
      blog.querySelectorAll("p")[1].textContent = data[index].brief
    }

    blog.querySelectorAll("p")[0].textContent = dateConverter(data[index].dateAdded)
    blog.querySelector("a").href = "https://haorong.hashnode.dev/" + data[index].slug
  }
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

gql(query(0))
  .then((response) => response.data.user.publication.posts)
  .then((data) => updateBlogCard(data))
