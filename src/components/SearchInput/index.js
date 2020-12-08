import React, { Component } from 'react';

class SearchInput extends Component {
  state = {
    text: '',
  }

   handleSubmit = (e) => {
     e.preventDefault();

     this.setState({
       text: '',
     });
   }

   handleChange = (e) => {
     this.setState({
       [e.target.name]: e.target.value,
     });
   }

   render() {
     return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' name='text' value={this.state.text} onChange={this.handleChange} placeholder='Enter a Title or Author' />
      </form>
     );
   }
}

export default SearchInput;
