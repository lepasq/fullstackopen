import { useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
		const field = event.target.value
		dispatch(filter(field))
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

export default Filter
