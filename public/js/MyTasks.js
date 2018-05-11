class MyTasks extends React.Component{
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleComplete = this.handleComplete.bind(this)
  }

  handleClick(post){
    event.preventDefault();
    this.props.deletePost(post)
  }

  handleComplete(post){
    event.preventDefault();
    this.props.completePost(post)
  }

  render(){
    return(
      <div class="inner">
        <h5 class="text-gery">My Tasks</h5>
        <hr/>
        <div class="container mb-5">
             {
              this.props.state.createSuccess?
              <div class="alert alert-success" role="alert">
                Post successfull created!
                <button type="button" class="close" onClick={() => this.props.toggleState(null,null,"createSuccess")}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>:null
              }
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
                        {post.completed?<span class="badge badge-danger float-right">Completed</span>:<span class="badge badge-success float-right">Active</span>}
                       </div>
                        <div class="card-body">
                          <p class="card-text">Posted By: {post.name}</p>
                          <p class="card-text">Budget: ${post.budget} {post.hourly?'/hr':null} | Due Date: {post.date}</p>
                          <p class="card-text">Location: {post.location} | People: {post.people}</p>
                          <p class="card-text">Offers: {post.offers.length>0? post.offers: 'None'}</p>
                          <p class="card-text">Description: {post.description}</p>
                        </div>
                        <div class="card-footer bg-dark">
                        <a href="#" class="card-link" onClick={() => this.props.toggleEdit(index, post)}>Edit Task</a>
                        <a href="#" class="card-link text-danger" onClick={() => this.handleClick(post)}>Delete Task</a>
                        {post.completed?<a href="#" class="card-link text-warning" onClick={() => this.handleComplete(post)}>Mark As Active</a>:<a href="#" class="card-link text-success" onClick={() => this.handleComplete(post)}>Mark As Completed</a>}

                        </div>
                      </div>
                      :
                      <EditForm deletePost={this.props.deletePost} editPost={this.props.editPost} toggleEdit={this.props.toggleEdit} state={this.props.state} />
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
