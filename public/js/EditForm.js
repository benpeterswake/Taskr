class EditForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      id: '',
      title: '',
      description: '',
      location: '',
      budget: '',
      date: '',
      people: '',
      completed: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    this.setState({
      id: this.props.state.post._id,
      title: this.props.state.post.title,
      description: this.props.state.post.description,
      location: this.props.state.post.location,
      budget: this.props.state.post.budget,
      date: this.props.state.post.date,
      people: this.props.state.post.people,
      completed: this.props.state.post.completed
    })
  }

  handleChange(event){
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  handleClick(post){
    event.preventDefault();
    this.props.deletePost(post)
  }

  handleSubmit(event){
    event.preventDefault();
    console.log(this.state);
    this.props.editPost(this.state)
    this.props.toggleEdit(null, {})
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <div class="card text-white bg-secondary mt-4">
         <div class="card-header">
         <label>Title:</label>
          <input id="title" type="text" onChange={this.handleChange} value={this.state.title}/>
          <span class="badge badge-success float-right">{this.props.state.post.completed?'Completed':'Active'}</span>
         </div>
          <div class="card-body">
            <p class="card-text">
              <label>Budget: ${this.props.state.post.hourly?'/hr':null}</label>
              <input id="budget" type="number" onChange={this.handleChange} value={this.state.budget} />
            </p>
            <p class="card-text">
              <label>People:</label>
              <input id="people" type="number" min="1" onChange={this.handleChange} value={this.state.people} />
            </p>
            <p class="card-text">
              <label>Due Date:</label>
              <input id="date" type="date" onChange={this.handleChange} value={this.state.date}/>
            </p>
            <p class="card-text">
              <label>Location:</label>
              <input id="location" type="text" onChange={this.handleChange} value={this.state.location}/>
            </p>
            <p class="card-text">
              <label>Description:</label><br/>
              <textarea id="description" cols="50" rows="6" onChange={this.handleChange} value={this.state.description}></textarea>
            </p>
          </div>
          <div class="card-footer bg-dark">
            <button type="submit" class="card-link btn btn-success">Save Task</button>
            <a href="#" class="card-link text-danger" onClick={() => this.handleClick(this.state)}>Delete Task</a>
          </div>
        </div>
      </form>
    )
  }
}
