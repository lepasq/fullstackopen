import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


const Blog = ({ blog }) => {
  const style = {
    padding: 3,
    margin: 5,
    borderStyle: 'solid',
    borderWidth: 1,
  }

  const link = () => {
    return `blogs/${blog.id}`
  }

  return (
    <div style={style} className="blog">
      <Link to={link()}> {blog.title}</Link>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
}

export default Blog
