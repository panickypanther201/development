import "./../css/App.css";
import { useState } from "react";
import animeData from "../assets/anime-data.json";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


function CheckAiring(props) {
  if (props.airing) {
    return "Currently Airing";
  }
}

function LikedItem(props) {
  return (
    <div className="cart-item">
      <img alt="aniImage" className="cart-img" src={props.image} />
      <p>{props.name}</p>
    </div>
  )
}

function App() {
  const [likes, setLikes] = useState(Array(animeData.length).fill(0))
  const [aniList, setAniList] = useState(animeData);
  const [sortType, setSort] = useState(0);



  const filterByGenre = (type) => {
    const result = [...animeData].filter((anime) => {
      return (anime.type[0] === type || anime.type[1] === type)
    })
    if (sortType === 1) {
      result.sort((a, b) => ((b.episodes - a.episodes)))
    } else if (sortType === 2) {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }
    setAniList(result)
  }

  const filterByAiring = () => {
    const result = [...animeData].filter((anime) => {
      return (anime.airing)
    })
    if (sortType === 1) {
      result.sort((a, b) => ((b.episodes - a.episodes)))
    } else if (sortType === 2) {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }
    setAniList(result)
  }

  const sortByCount = () => {
    setSort(1);
    const result = [...aniList].sort((a, b) => {
      return b.episodes - a.episodes;
    })
    setAniList(result)
  }

  const sortByAlpha = () => {
    setSort(2);
    const result = [...aniList].sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
    setAniList(result)
  }

  function AniCard(props) {
    let change = likes[props.index];

    const handleChange = () => {
      let temp = [...likes]
      if (change === 1) {
        temp[props.index]--;
      } else {
        temp[props.index]++;
      }
      setLikes(temp)

    };

    return (
      <Card sx={{ maxWidth: 300 }}>
        <CardMedia
          component="img"
          height="450"
          image={props.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {props.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <text id="airing"><CheckAiring airing={props.airing} /></text>
            <text >{props.type[0]}, {props.type[1]}</text>
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="secondary"
            onClick={() => handleChange()}
            style={{ backgroundColor: change === 1 ? "red" : "grey" }}
          >{change === 1 ? "Unlike" : "Like"}</Button>
          <text > Episode count: {props.episodes}</text>
        </CardActions>
      </Card>
    );
  }
  function FilterSection() {
    return (
      <div className="filter-container">
        <h5>Filter by genre:  </h5>

        <ButtonGroup aria-label="Genre group" size="sm">
          <Button variant="secondary" onClick={() => filterByGenre('Action')}>Action</Button>
          <Button variant="secondary" onClick={() => filterByGenre('Comedy')}>Comedy</Button>
          <Button variant="secondary" onClick={() => filterByGenre('Romance')}>Romance</Button>
          <Button variant="secondary" onClick={() => filterByGenre('Drama')}>Drama</Button>
          <Button variant="secondary" onClick={() => filterByGenre('Horror')}>Horror</Button>
          <Button variant="secondary" onClick={() => filterByGenre('Mystery')}>Mystery</Button>
          <Button variant="secondary" onClick={() => filterByAiring()}>Airing</Button>
        </ButtonGroup>

      </div>
    );
  }

  function SortSection() {
    return (
      <div className="sort-container">
        <h5>Sort by: </h5>
        <ButtonGroup aria-label="Sort group" size="sm">
          <Button variant="secondary" onClick={() => sortByCount()}>Episode Count</Button>
          <Button variant="secondary" onClick={() => sortByAlpha()}>A to Z</Button>
        </ButtonGroup>
      </div>
    );
  }

  function LikedSection() {
    let likedItems = []
    // let reduceLiked = Array(animeData.length).fill(0)
    aniList.forEach((item) => {
      if (likes[item.id] === 1){
        likedItems.push(item)
      }
    })

    const total = (likedItems.reduce((prev, curr, index) => {
      return prev + curr.episodes
    }, 0))

    return (
      <div className="liked-section">
        <div className="cart-container">
          <h5> Favorite Anime:</h5>
          {likedItems.map((item) =>
            <LikedItem
              image={item.image}
              name={item.name}
            />)
          }
          <div>
          <h6 className="total">
            Total # of Episodes: {total}!
            
          </h6>
        </div>
        </div>
        
      </div>
    )
  }

  function reset() {
    setAniList(animeData)
    setLikes(Array(animeData.length).fill(0))
  }

  return (
    <div className="App">
      <div className="Banner">
        <header className="App-header">
          <h1>
            Development: MyAniList!
          </h1>
        </header>
        <Navbar bg="light">
          <div className="Nav Sections">
            <SortSection />
            <FilterSection />
            <Button size="sm" variant="secondary" onClick={() => reset()}>Reset</Button>
          </div>
        </Navbar>
      </div>
      <div className="Banner-buffer">
      </div>
      <div className="Main-Section">
        <div className="items-container">
          {aniList.map((item, index) =>
            <AniCard
              name={item.name}
              description={item.description}
              episodes={item.episodes}
              airing={item.airing}
              type={item.type}
              image={item.image}
              index={item.id}

            />
          )}
        </div>
        <LikedSection />
      </div>
    </div>
  );
}


export default App;
