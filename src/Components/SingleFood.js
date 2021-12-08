import React from 'react';

const SingleFood = ({ selectedFood }) => {
  return (
    <div className='singleFood' key={selectedFood.id}>
      <div id='video'>
        <iframe width="500" height="400"
          src={selectedFood.videoUrl}>
        </iframe>
      </div> 
      <div id='foodDetails'>
        <div id='foodContainer'>
            <img id='foodImg' src={selectedFood.imgURL}/>
        </div>
        <h1 id='name'>{selectedFood.name}</h1>
        <div id='flagContainer'>
            <img id='flagImg' src={selectedFood.country.imgURL}/>
        </div>
        <p>{selectedFood.bio}</p>
      </div>
    </div>
  )
}

export default SingleFood