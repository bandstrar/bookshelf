# Bookshelves

BookShelves is an application that enables a user to track their personal book collection. The user will have access to several shelves that they can add their books to, and can add new shelves. The user will also have access to features to personalize the books in their collection, such as notes and rating.

## Technologies

React, SCSS, Firebase, Google Books API, Reactstrap

## ERD

[Link to Project ERD](https://lucid.app/lucidchart/invitations/accept/d8fa90af-4b67-4aae-918a-eadbb625df7d)

## Wireframe

[Link to Project Wireframe](https://www.figma.com/file/fVZFs0tEgN59Zjmf5fOPxD/BookShelves?node-id=0%3A1)

## Project Overview Walkthrough Video

[Link to Video](https://www.loom.com/share/4938829bdfdf46e5a33cb86f09b69073)

## Details

![Image](https://i.imgur.com/B5AOJPb.png)

BookShelves is only available to authenticated users, so when a user initially visits the application they will be prompted to log in via Google authentication. Once logged in, the user will see their home page, which shows a random selection of books from their Unread shelf. If there are no books on the user's Unread shelf then they'll be encouraged to add a book to their collection via the Search page. The Search page can be navigated to via the Navbar, which also has links to the user's shelves, their book collection, and an option to log out.

![Image](https://i.imgur.com/Uov3QF2.gif)

Once on the Search page, the user can enter a book title or author to bring up a list of books matching the search term they submitted. The user can then add as many of the books to any of the shelves they currently have. The book will then be added to the specific shelf, and to their total collection.

On the Shelves page, the user can see all of the shelves in their collection. There will be some pre-made shelves available, such as Unread and Favorites. On this page, the user can add a new shelf to their collection. After adding the new shelf, the user can now add books to that new shelf. The user can also edit a shelf on this page, and also delete a shelf. Deleting a shelf will remove all books from that shelf, but not from their personal collection. The user can also click on a shelf to go to a page with more details on that shelf.

![Image](https://i.imgur.com/CKS4k17.gif)

On a single shelf page, the user can see all of the books they've added to that shelf. There is a button that selects a random book from that shelf. There is also a quick search form to find a specific book from that shelf. The search form searches for the book's author, title, and tags. On the single shelf page, the user can click on a book, which will take them to a page with details on the book.

![Image](https://i.imgur.com/Uxsl6px.png)

On a single book page, the user will see more information about the book, such as publication date, page count, average rating from all users and tags. The user can also see their personal rating and notes if they've been added. The user can edit certain sections of the book, such as their personal rating, notes, which of their shelves they want it on, and they can add tags to the book.

![Image](https://i.imgur.com/9RSdQNm.gif)

On the Books page, the user can navigate through all of the books they've added to their collection. There is a quick search form and random button that work like they do on the single shelf page, but these search the user's entire book collection. There is also an advanced search button on this page, which opens a modal when clicked. The user can search for any combination of author, page count, published date, and tags.

## Link

[Link to the Application](https://bandstrar-bookshelves.netlify.app/)