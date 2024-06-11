Written in ReactJS and MaterialUI as per request. I've used Gulp with the workflow to help generate favicons, metadata and create a minified CSS from Sass. I also used Affinity Designer to help recreate parts of the company logo that I wasn't able to find in svg format

The useState hook creates the variable "searchTerm" and a function "setSearchTearm" to update the value the user has typed into the input field. The live search updates while the user typing with an onChange event handler that updates the "searchTerm". 

The useQuery hook to fetch data from GraphQL Server using Books Query that return:
Loading, if the query is in progress
Error, if the query fails
Data, the data returned if the query is successful

The data is then filtered and checks what matches in the either the titles, authors or both, that matches the user's query

When the list shows, the user can choose to add or remove the book they'd like, which updates a useState array "selectedBooks", and is also stored in a localstorage key that useEffect checks when the page loads in order to save what they've added from the previous session.
Ello Take Home Challenge Screenshots:


Large Screenshot:

![1 - Ello-Book-Search xl](https://github.com/markmutai/ello_takehometest/assets/65723770/6be98c0a-cec7-406f-8935-08744e39f6bc)
![2- Ello-Book-Search xl](https://github.com/markmutai/ello_takehometest/assets/65723770/1c4fac12-c7b3-4d2f-a366-4fbc324916e5)
![3 - Ello-Book-Search xl](https://github.com/markmutai/ello_takehometest/assets/65723770/56e3911e-51df-4b7c-9382-ce4db278bbb8)
![4- Ello-Book-Search xl](https://github.com/markmutai/ello_takehometest/assets/65723770/304b926b-1cdc-421e-ba83-26203d01a35d)

Tablet Screenshot:

![5 - Ello-Book-Search md](https://github.com/markmutai/ello_takehometest/assets/65723770/bfac6c0c-5dc6-4a7c-bbec-4def7b7e2017)

Mobile Screenshot:

![6 - Ello-Book-Search xs](https://github.com/markmutai/ello_takehometest/assets/65723770/f8b038c7-5a11-47f0-a040-da7e56d6e113)
![7 - Ello-Book-Search xs](https://github.com/markmutai/ello_takehometest/assets/65723770/3d9cea44-ced9-4862-90cf-9b6fad5893b2)
![8 - Ello-Book-Search xs](https://github.com/markmutai/ello_takehometest/assets/65723770/73cf7367-95ce-4e9e-84ca-61099adab33a)
![9 - Ello-Book-Search xs](https://github.com/markmutai/ello_takehometest/assets/65723770/1f961aee-4dd9-4f38-9d8b-5c10acac891a)
