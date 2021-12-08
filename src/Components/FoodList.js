import React from 'react';

const FoodList = ({ foods, selectFood, deleteFood }) => {
    return (
      <div id='container'>      
        <div className='row wrap'>
          {
            foods.map((food) => {
              return (
                <div className='foodCard' key={food.id} >
                    <div onClick={() => selectFood(food.id)}>
                      <img id='foodImg' src={food.imgURL}/>
                    </div>
                    <h1>{food.name}</h1>
                    <div>
                      <img id='flagImg' src={food?.country?.imgURL}/>
                    </div>
                    <button id='deleteButton' onClick={() => deleteFood(food.id)}> Delete</button>
                </div>
              )
            })
          }
        </div>
      </div>
    )
};

export default FoodList