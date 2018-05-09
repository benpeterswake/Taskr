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
      people: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    this.setState({
      id: this.props.state.post._id,
      title: this.props.state.post.title,
      description: this.props.state.post.description,
      location: this.props.state.post.location,
      budget: this.props.state.post.budget,
      date: this.props.state.post.date,
      people: this.props.state.post.people
    })
  }

  handleChange(event){
    this.setState({
      [event.target.id]: event.target.value,
    })
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
            <a href="#" class="card-link text-danger">Delete Task</a>
          </div>
        </div>
      </form>
    )
  }
}

class MyTasks extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div class="inner">
        <h5 class="text-gery">My Tasks</h5>
        <hr/>
        <div class="container mb-5">
              {
                this.props.state.posts.length > 0 ?
                this.props.state.posts.map((post, index) => {
                  return(
                    <div class="col-lg-10 mx-auto">
                    {
                      this.props.state.editPost !== index?
                      <div class="card text-white bg-secondary mt-4">
                       <div class="card-header">
                        {post.title}
                        <span class="badge badge-success float-right">{post.completed?'Completed':'Active'}</span>
                       </div>
                        <div class="card-body">
                          <p class="card-text">Budget: ${post.budget} {post.hourly?'/hr':null}</p>
                          <p class="card-text">Due Date: {post.date}</p>
                          <p class="card-text">Location: {post.location}</p>
                          <p class="card-text">People: {post.people}</p>
                          <p class="card-text">Offers: {post.offers.length>0? post.offers: 'None'}</p>
                        </div>
                        <div class="card-footer bg-dark">
                        <a href="#" class="card-link" onClick={() => this.props.toggleEdit(index, post)}>Edit Task</a>
                        <a href="#" class="card-link text-danger">Delete Task</a>
                        <a href="#" class="card-link text-success">Mark As Completed</a>
                        </div>
                      </div>
                      :
                      <EditForm editPost={this.props.editPost} toggleEdit={this.props.toggleEdit} state={this.props.state} />
                     }
                    </div>
                  )
                })
                :
                <div class="col-lg-6 text-center mx-auto">
                    <i class="fas fa-bullhorn mt-4"></i>
                   <h5 class="mt-4 mb-4">You have no posts yet...</h5>
                   <button class="btn btn-danger" data-toggle="modal" data-target="#postModal">Post a task!</button>
                </div>
              }
        </div>
      </div>
    )
  }

}
