# Development

### Link to Deployed Website
https:panickypanther201.github.io/development
If you used the stencil code, this is `https://<your GitHub username>.github.io/<name of your repository>`

### Goal and Value of the Application
The goal of this app was to help keep track of anime shows that users were watching and allow them to create list of their favorite ones and filter them genre.

### Usability Principles Considered
I have a basic grid layout that allows for simplicity and clarity. There is a tilte header, adnd underneath it is the navbar. Then there is the main section, which is split up into two sections: Anime cards on the left and the Favoriteditems on the right. Users will have a simple time scrolling through and selecting which Anime they want to add to their favorites, which will be seen on the left. The FavoritedItems list also keeps track of the total amount of episodes of your favorite shows. 

### Organization of Components
I followed a similar structure to the React studio. I used two main components, an AniCard component which allowed me to display the Anime items from the database and a LikedItem, which I used to display the shows that the user adds to their favorites. The props for the AniCard were essentially the named attributes from the json data and I used those props to pass in the data. For LikedItem, I only needed the image source and the name of the anime, so those were the props I used for that. I struggle a lot with managing how to use the states, specifically with filling in and keeping trck of liked Anime. I utilized several states, one to keep track of the selected filter type, another for the sort type, and one to keep track of which anime were liked (this one in particular was the missing key in the way I was trying to implement my app). I used the sortType and filter type as explained in the slides. The liststate of likedItems is just a list of ones and zeros, which tells me which anime are currently liked and ensures that even when filtering, the anime that is filtered out that the user likes isn't reset. 

### How Data is Passed Down Through Components
Oh, I explained this a bit in the previous section, but the data is first contained in a json file called anime-data. Initially, with no filters or sorts selected, animeData is parsed into cards for each element in the list, similar to how BakeryItems were formed. This process remains the same, with the filters augmenting the list that is used to pass data in the AniCards. Then for the likedItems, I filter the primary list and pass the remaining elements into LikedItems, which are then showcased on the right section of the site.

### How the User Triggers State Changes
The user triggers state changes by either selecting a sorting type, a filter type, or by liking an anime. Selecting a sort type will rearrange the current showcase of cards and will also affect what is shown on favorites list as well, keeping only those who fall into the selected genre; selecting a genre type will list the anime that fall into that genre; and liking/unliking an anime will add/remove it from the list on the right. 

