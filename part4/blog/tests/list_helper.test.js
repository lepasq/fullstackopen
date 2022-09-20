const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
	const emptyList = []

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]


  const biggerList = [
    {
      _id: '5a422aa71b54a676234d17f1',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 3,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f2',
      title: 'First blog post',
      author: 'Leonardo Pasquarelli',
      url: 'http://www.facebook.com',
      likes: 1,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f3',
      title: 'Tour through Helsinki',
      author: 'Jelle Smits',
      url: 'http://www.youtube.com',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f4',
      title: 'Weather',
      author: 'Marco Peterson',
      url: 'http://www.google.com',
      likes: 9,
      __v: 0
    },
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has multiple blogs, equals the likes of that', () => {
    const result = listHelper.totalLikes(biggerList)
    expect(result).toBe(13)
  })
})





describe('favourite blog', () => {
	const emptyList = []

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const biggerList = [
    {
      _id: '5a422aa71b54a676234d17f1',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 3,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f2',
      title: 'First blog post',
      author: 'Leonardo Pasquarelli',
      url: 'http://www.facebook.com',
      likes: 1,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f3',
      title: 'Tour through Helsinki',
      author: 'Jelle Smits',
      url: 'http://www.youtube.com',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f4',
      title: 'Weather',
      author: 'Marco Peterson',
      url: 'http://www.google.com',
      likes: 9,
      __v: 0
    },
  ]

  test('of empty list is zero', () => {
    const result = listHelper.favouriteBlog(emptyList)
    expect(result).toStrictEqual({})
  })

  test('when list has only one blog, returns that blog', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog)
    expect(result).toStrictEqual(
			{
				'title': listWithOneBlog[0].title, 
				'author': listWithOneBlog[0].author, 
				'likes': listWithOneBlog[0].likes
			}
		)
	})

  test('when list has multiple blogs, returns max blog', () => {
    const result = listHelper.favouriteBlog(biggerList)
    expect(result).toStrictEqual(
			{
				'title': 'Weather',
				'author': 'Marco Peterson',
				'likes': 9,
			}
		)
  })
})



describe('most blogs', () => {
	const emptyList = []

	const listWithOneBlog = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		}
	]

  const biggerList = [
    {
      _id: '5a422aa71b54a676234d17f1',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 3,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f2',
      title: 'First blog post',
      author: 'Leonardo Pasquarelli',
      url: 'http://www.facebook.com',
      likes: 1,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f3',
      title: 'Tour through Helsinki',
      author: 'Leonardo Pasquarelli',
      url: 'http://www.youtube.com',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f4',
      title: 'Second post',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.amazon.com',
      likes: 9,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f5',
      title: 'Weather',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.google.com',
      likes: 9,
      __v: 0
    },
  ]

	test('of empty list is zero', () => {
		const result = listHelper.mostBlogs(emptyList)
		expect(result).toStrictEqual({})
	})

	test('when list has only one blog, returns that author', () => {
		const result = listHelper.mostBlogs(listWithOneBlog)
		expect(result).toStrictEqual(
			{
				'author': listWithOneBlog[0].author, 
				'blogs': 1
			}
		)
	})

  test('when list has multiple blogs, returns max author', () => {
    const result = listHelper.mostBlogs(biggerList)
		expect(result).toStrictEqual(
			{
				'author': 'Edsger W. Dijkstra',
				'blogs': 3,
			}
		)
  })
})


describe('most likes', () => {
	const emptyList = []

	const listWithOneBlog = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		}
	]

  const biggerList = [
    {
      _id: '5a422aa71b54a676234d17f1',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 3,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f2',
      title: 'First blog post',
      author: 'Leonardo Pasquarelli',
      url: 'http://www.facebook.com',
      likes: 15,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f3',
      title: 'Tour through Helsinki',
      author: 'Leonardo Pasquarelli',
      url: 'http://www.youtube.com',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f4',
      title: 'Second post',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.amazon.com',
      likes: 9,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f5',
      title: 'Weather',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.google.com',
      likes: 9,
      __v: 0
    },
  ]

	test('of empty list is zero', () => {
		const result = listHelper.mostLikes(emptyList)
		expect(result).toStrictEqual({})
	})

	test('when list has only one blog, returns author', () => {
		const result = listHelper.mostLikes(listWithOneBlog)
		expect(result).toStrictEqual(
			{
				'author': listWithOneBlog[0].author, 
				'likes': listWithOneBlog[0].likes
			}
		)
	})

  test('when list has multiple blogs, returns max likes', () => {
    const result = listHelper.mostLikes(biggerList)
		expect(result).toStrictEqual(
			{
				'author': 'Leonardo Pasquarelli',
				'likes': 25,
			}
		)
  })
})
