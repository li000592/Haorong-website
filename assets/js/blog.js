const HASHNODE_API = "/.netlify/functions/hashnode-proxy"

const query = () => {
  return `query {
      publication(host: "haorong.hashnode.dev") {
        posts(first: 3) {
          edges {
            node {
              title
              brief
              slug
              publishedAt
              coverImage {
                url
              }
            }
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
    blog.querySelector("img").src = data[index].node.coverImage.url
    blog.querySelector("h5").textContent = data[index].node.title
    if (data[index].node.brief.length > 120) {
      blog.querySelectorAll("p")[1].textContent = data[index].node.brief.slice(0, 120) + "..."
    } else {
      blog.querySelectorAll("p")[1].textContent = data[index].node.brief
    }

    blog.querySelectorAll("p")[0].textContent = dateConverter(data[index].node.publishedAt)
    blog.querySelector("a").href = "https://haorong.hashnode.dev/" + data[index].node.slug
  }
}
console.log(window.ReactQuery)
async function gql(query, variables = {}) {
  const data = await fetch(HASHNODE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  return data.json()
}

gql(query())
  .then((response) => response.data.publication.posts.edges)
  .then((data) => updateBlogCard(data))
