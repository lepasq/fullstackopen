import { connect } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    event.preventDefault()
		const field = event.target.value
		props.filter(field)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name="filter" onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = {
	filter,
}

const ConnectedFilter = connect(
	mapStateToProps, 
	mapDispatchToProps
)(Filter)

export default ConnectedFilter
