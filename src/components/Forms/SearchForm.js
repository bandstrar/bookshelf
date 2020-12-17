import React, { Component } from 'react';
import { Button } from 'reactstrap';

class SearchForm extends Component {
  state = {
    author: '',
    minPage: '0',
    maxPage: '20000',
    earliestDate: '0',
    recentDate: new Date(Date.now()),
    tag: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.handleAdvanced(e, this.state);
  }

  render() {
    return (
      <form>
      Author: <input
      type='text'
      name='author'
      value={this.state.author}
      onChange={this.handleChange}
      placeholder='Search for an Author'
      className='form-control form-control-lg m-1'
      />
      Minimum Page Count:
      <input
      type='text'
      name='minPage'
      value={this.state.minPage}
      onChange={this.handleChange}
      placeholder='Minimum Page Count'
      className='form-control form-control-lg m-1'
      />
      Maximum Page Count:
      <input
      type='text'
      name='maxPage'
      value={this.state.maxPage}
      onChange={this.handleChange}
      placeholder='Maximum Page Count'
      className='form-control form-control-lg m-1'
      />
      Published No Earlier Than:
      <input
      type='text'
      name='earliestDate'
      value={this.state.earliestDate}
      onChange={this.handleChange}
      placeholder='Published No Earlier Than'
      className='form-control form-control-lg m-1'
      />
      Published No Later Than:
      <input
      type='text'
      name='recentDate'
      value={this.state.recentDate}
      onChange={this.handleChange}
      placeholder='Published No Later Than'
      className='form-control form-control-lg m-1'
      />
      Tag:
      <input
      type='text'
      name='tag'
      value={this.state.tag}
      onChange={this.handleChange}
      placeholder='Search for a Tag'
      className='form-control form-control-lg m-1'
      />
      <Button className='bookshelves-buttons' onClick={this.handleSubmit}>Submit</Button>
      </form>
    );
  }
}

export default SearchForm;
