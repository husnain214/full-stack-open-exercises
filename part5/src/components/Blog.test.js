import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('tests for toggleable blog details', () => {
  let container
  const mockHandler = jest.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    const blog = {
      title: 'rrrrrrrrrrr',
      author: 'ddddddddd',
      url: 'ssssssssss',
      likes: 5,
    }

    container = render( <Blog blog = {blog} setBlogs = { mockHandler } /> ).container
  })

  test('blog details are not rendered by default', () => {
    expect(
      container.querySelector('.blog-details')
    ).toHaveStyle('display: none')
  })

  test('after clicking the button, blog details are displayed', async () => {
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog-details')
    expect(div).not.toHaveStyle('display: none')
  })

  // test('if the like button is clicked twice, the event handler is called twice', async () => {
  //   const likesButton = screen.getByText('like')

  //   await user.click(likesButton)
  //   await user.click(likesButton)

  //   expect(mockHandler.mock.calls).toHaveLength(2)
  // })
})

