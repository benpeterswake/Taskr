class MyTasks extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div class="inner">
        <h5 class="text-gery">My Tasks <small>(Tasks you posted)</small></h5>
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
                          <p class="card-text">Offers: {post.offers.length>0? post.offers: 'None'}</p>
                        </div>
                        <div class="card-footer bg-dark">
                        <a href="#" class="card-link" onClick={() => this.props.toggleEdit(index, post)}>Edit Task</a>
                        <a href="#" class="card-link text-danger">Delete Task</a>
                        <a href="#" class="card-link text-success">Mark As Completed</a>
                        </div>
                      </div>
                      :
                      <form>
                        <div class="card text-white bg-secondary mt-4">
                         <div class="card-header">
                          <input type="text" value={post.title}/>
                          <span class="badge badge-success float-right">{post.completed?'Completed':'Active'}</span>
                         </div>
                          <div class="card-body">
                            <p class="card-text">
                              <label>Budget:</label>
                              <input type="number" value={post.budget} />
                            </p>
                            <p class="card-text">
                              <label>Due Date:</label>
                              <input type="date" value={post.date} />
                            </p>
                            <p class="card-text">
                              <label>Location:</label>
                              <input type="text" value={post.location} />
                            </p>
                            <p class="card-text">
                              <label>Description:</label><br/>
                              <textarea cols="50" rows="6" value={post.description}></textarea>
                            </p>
                          </div>
                          <div class="card-footer bg-dark">
                          <a href="#" class="card-link text-success">Save Task</a>
                          <a href="#" class="card-link text-danger">Delete Task</a>
                          </div>
                        </div>
                      </form>
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
