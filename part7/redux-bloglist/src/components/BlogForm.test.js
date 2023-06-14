import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> calls onSubmit', async () => {
  const user = userEvent.setup()

  const setFormVisible = jest.fn()
  const createBlog = jest.fn()

  const { container } = render(
    <BlogForm
      formVisible={true}
      setFormVisible={setFormVisible}
      createBlog={createBlog}
    />
  )

  const titleInput = container.querySelector('input[name="title"]')
  const urlInput = container.querySelector('input[name="url"]')
  const authorInput = container.querySelector('input[name="author"]')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'testing a form...')
  await user.type(urlInput, 'testing a form...')
  await user.type(authorInput, 'testing a form...')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
})
