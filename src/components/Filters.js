import React from 'react'

class Filters extends React.Component {
  state = {
    type: "all"
  }

  selectChangeHandler = (e) => {
    this.setState({type: e.target.value}, ()=>{
      this.props.onChangeType(this.state.type)
    })
  }

  findPetsButtonHandler = () => {
    this.props.onFindPetsClick(this.state.type)
  }


  render() {
    return (
      <div className="ui form">
        <h3>Animal type</h3>
        <div className="field">
          <select name="type" id="type" onChange={this.selectChangeHandler}>
            <option value="all">All</option>
            <option value="cat">Cats</option>
            <option value="dog">Dogs</option>
            <option value="micropig">Micropigs</option>
          </select>
        </div>

        <div className="field">
          <button className="ui secondary button" onClick={this.findPetsButtonHandler}>Find pets</button>
        </div>
      </div>
    )
  }
}

export default Filters
