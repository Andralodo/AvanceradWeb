export const accounts = [
	{id: 1, name: "Alice"},
	{id: 2, name: "Bob"},
	{id: 3, name: "Claire"},
]

export const posts = [
	{id: 1, authorId: 1, title: "Adventure 1", content: "Alice's adventure Part 1"},
	{id: 2, authorId: 2, title: "Birthday", content: "My birthday!"},
	{id: 3, authorId: 1, title: "Adventure 2", content: "Alice's adventure Part 2"},
]

export const comments = [
	{id: 1, postId: 1, commenterId: 2, comment: "Exciting, can't wait for Part 2!"},
	{id: 2, postId: 2, commenterId: 1, comment: "Happy birthday Bob!"},
	{id: 3, postId: 2, commenterId: 3, comment: "🎉🎂"},
]