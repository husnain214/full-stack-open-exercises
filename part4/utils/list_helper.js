const authorAlreadyExists = (authorsBlogs, blog) => {
  Object.keys(authorsBlogs)
    .filter(key => key === blog.author)
    .length === 0
}

const intitalizeAuthorArray = (authorsBlogs, blogs) => {
  blogs.forEach(blog => {
    if( !authorAlreadyExists(authorsBlogs, blog) ) 
      authorsBlogs[blog.author] = 0
  })
}

const storeCount = (authorsBlogs, blogs) => {
  blogs.forEach( blog => authorsBlogs[blog.author]++ )
}

const authorSumOfLikes = (blogs, author) => {
  return blogs
    .filter(blog => blog.author === author)
    .reduce((sum, blog) => sum + blog.likes, 0)
}

const storeSumOfLikes = (authorsBlogs, blogs) => {
  for( const author of Object.keys(authorsBlogs) ) {
    authorsBlogs[author] = authorSumOfLikes(blogs, author)
  }
}

const findLargestValue = authorsBlogs => Math.max(...Object.values(authorsBlogs))

const authorWithLargestValue = (value, authorsBlogs) => {
  for(const key of Object.keys(authorsBlogs)) {
    if( authorsBlogs[key] !== findLargestValue(authorsBlogs) ) 
      continue
    
    return { author: key, [value]: authorsBlogs[key] }
  }
}

const totalLikes = blogs => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = blogs => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  const mostLikedBlog = blogs.find(blog => blog.likes === sortedBlogs[0].likes)

  return ({
    title: mostLikedBlog.title, 
    author: mostLikedBlog.author, 
    likes: mostLikedBlog.likes
  })
}

const mostBlogs = blogs => {
  let authorsBlogs = {}

  intitalizeAuthorArray(authorsBlogs, blogs)

  storeCount(authorsBlogs, blogs)

  return authorWithLargestValue('blogs', authorsBlogs)
}

const mostLikes = blogs => {
  let authorsBlogs = {}
  
  intitalizeAuthorArray(authorsBlogs, blogs)

  storeSumOfLikes(authorsBlogs, blogs)

  return authorWithLargestValue('likes', authorsBlogs)
}

module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLikes }