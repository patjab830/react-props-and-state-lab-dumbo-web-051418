import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  petIsAdopted = (inputId) => {
    // const pet = this.state.pets.find((pet) => pet.id === id)
    // pet.isAdopted = true

    this.setState((previousState) => {
      const thePets = []
      for (let pet of this.state.pets) {
        if (pet.id === inputId) {
          thePets.push({
            ...pet, 
            isAdopted: true
          })
        } else {
          thePets.push(pet)
        }
      }
      return {pets: thePets}
    })
  }

  updateFiltersType = (newType) => {
    this.setState(
      {
        filters: {
          type: newType
        }
      }
    )
  }

  // TAKE THE STATE AND PUT IT INTO PETBROWSER

  findPetsClick = (type) => {
    let url
    this.state.filters.type === 'all' ? url = `/api/pets` : url = `/api/pets?type=${this.state.filters.type}`
    fetch(url).then(r => r.json()).then((data) => {
      this.setState({pets: data})
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.updateFiltersType} onFindPetsClick={this.findPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.petIsAdopted}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App


//The app's initial state is already defined. App has two children: the <Filters /> and <PetBrowser /> components.
// App should pass a callback prop, onChangeType, to <Filters />. This callback needs to update <App />'s state.filters.type
//
// <Filters /> needs a callback prop, onFindPetsClick. When the <Filters /> component calls onFindPetsClick, <App /> should fetch a list of pets using fetch().
//
// The URL of the API is /api/pets with an optional query parameter.
// Use app's state.filters to control/update this parameter
// If the type is 'all', send a request to /api/pets
// If the type is 'cat', send a request to /api/pets?type=cat. Do the same thing for dog and micropig.
// Finally set <App/>'s state.pets with the results of your fetch request so you can pass the pet data down as props to <PetBrowser />
// Even though we're using fetch here, its responses have been mocked in order to make the tests work properly. That means it's important to use the exact URLs as described above, or your tests will fail!
