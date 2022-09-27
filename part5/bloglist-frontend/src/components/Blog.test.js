import React from 'react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog content but not details', () => {
  const blog = {
    title: 'Great title',
    author: 'Leonardo',
    url: 'fullstackopen.com',
    user: {
      username: 'Leo',
      name: 'Leonardo'
    }
  }

  const { container } = render(<Blog blog={blog}
    updateLike={() => (console.log('incrementing like!'))}
    removeBlog={() => console.log()} />)

  let element = screen.getByText('Great title')
  expect(element).toBeDefined()

  element = screen.getByText('Leonardo')
  expect(element).toBeDefined()

  let div = container.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: none')
})


test('renders url and likes when clicking button', async () => {
  const blog = {
    title: 'Great title',
    author: 'Leonardo',
    url: 'fullstackopen.com',
    user: {
      username: 'Leo',
      name: 'Leonardo'
    }
  }

  const mockHandler = jest.fn()
  const user = userEvent.setup()


  const component = render(<Blog blog={blog}
    updateLike={() => (console.log('incrementing like!'))}
    removeBlog={() => console.log()} />)


  const button = component.getByText('show details')
  await user.click(button)

  const likes = component.getByText('likes:')
  expect(likes).toBeDefined()
  const url = component.getByText('fullstackopen.com')
  expect(url).toBeDefined()

  const like = await component.findByText('like')

  const bound = mockHandler.bind(user.click(like))

  await bound()
  await bound()
  expect(mockHandler.mock.calls).toHaveLength(2)
})



