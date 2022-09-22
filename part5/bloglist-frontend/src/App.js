import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
	const [notification, setNotification] = useState(null)
	const [isSuccess, setIsSuccess] = useState(false)

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {    
		const loggedUserJSON = window.localStorage.getItem('loggedUser')    
		if (loggedUserJSON) {      
			const user = JSON.parse(loggedUserJSON)      
			setUser(user)      
			blogService.setToken(user.token)    
		}  
	}, [])

const handleLogin = async (event) => {
	event.preventDefault()
	try {
		const user = await loginService.login({
			username, password,
		})
		setUser(user)
		blogService.setToken(user.token)
		window.localStorage.setItem(
			'loggedUser', JSON.stringify(user)
		) 
		setUsername('')
		setPassword('')
	} catch (exception) {
		setNotification('wrong credentials')
		setIsSuccess(false)
		setTimeout(() => {
			setNotification(null)
			setIsSuccess(false)
		}, 5000)
	}
}


const handleLogout = async (event) => {
	event.preventDefault()
		setUser(null)
		blogService.setToken(null)
		window.localStorage.removeItem('loggedUser') 
}

const addBlog = event => {
	event.preventDefault()
	const blogObject = {
		title: blogTitle,
		author: blogAuthor,
		url: blogUrl
	}

	blogService
		.create(blogObject)
		.then(returnedBlog => {
			setBlogs(blogs.concat(returnedBlog))
			setIsSuccess(true)
			setNotification(`a new blog ${blogTitle} by ${blogAuthor} was added`)

			setBlogTitle('')
			setBlogAuthor('')
			setBlogUrl('')
			setTimeout(() => {
				setNotification(null)
				setIsSuccess(false)
			}, 5000)
		}).catch(exception => {
			setIsSuccess(false)
			setNotification(`missing fields`)
			setTimeout(() => {
				setNotification(null)
				setIsSuccess(false)
			}, 5000)
		})
}

const addBlogForm = () => (
    <form onSubmit={addBlog}>
					title:
          <input
            type="text"
            value={blogTitle}
            name="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
					<br/>author:
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
					<br/>url:
          <input
            type="text"
            value={blogUrl}
            name="Url"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
			<br/>
      <button type="submit">create</button>
    </form>      
)


  return (
    <div>
      <h2>blogs</h2>
			<Notification message={notification} isSuccess={isSuccess}/>
		   {user === null ? 
			<LoginForm handleLogin={handleLogin} 
								 username={username} 
								 password={password} 
								 setUsername={setUsername} 
								 setPassword={setPassword}  /> :
			<div>
			<p>{user.name} logged in <button onClick={(event) => handleLogout(event)}>logout</button>  </p>
				{addBlogForm()}
				</div>
			 }
		
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
		</div>
  )
}

export default App
