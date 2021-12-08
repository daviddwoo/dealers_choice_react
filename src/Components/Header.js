import React from 'react';

const Header = ({selectedFood, goBack, createFood, onSubmit}) => {
  const text = selectedFood.id ? 'Back to List!' : 'Create a Cuisine!'
  return (
    <div className='header'>
      <img id='flags' src='flags-world.png'/>
      <h1>World Cuisines</h1>
      {
        selectedFood.id ? 
          <button className='backButton' onClick={() => goBack()}>{text}</button> :
          <form onSubmit={onSubmit}>
            <button className='createFood' type='submit'>{text}</button>
          </form>
      }
    </div>
  )
}

export default Header