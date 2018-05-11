class BrowseTasks extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
        <div class="container mt-5 mb-5">
          <div class="row">
          <div class="col-lg-6">
              {
                this.props.state.allPosts.length > 0 ?
                this.props.state.allPosts.map((post, index) => {
                  return(
                      <div class="col-lg-12">
                        <div class="card text-white bg-secondary mt-4">
                         <div class="card-header">
                          {post.title}
                          {post.completed?<span class="badge badge-danger float-right">Completed</span>:<span class="badge badge-success float-right">Active</span>}
                         </div>
                          <div class="card-body">
                            <p class="card-text">Posted By: {post.name}</p>
                            <p class="card-text">Budget: ${post.budget} {post.hourly?'/hr':null}</p>
                            <p class="card-text">Due Date: {post.date}</p>
                            <p class="card-text">Location: {post.location}</p>
                            <p class="card-text">People: {post.people}</p>
                            <p class="card-text">Offers: {post.offers.length>0? post.offers: 'None'}</p>
                          </div>
                          <div class="card-footer bg-dark">
                          {
                            post.completed?'This task was completed':
                              <a href="#" class="card-link">Make Offer</a>
                          }
                          </div>
                        </div>
                      </div>
                  )
                })
                :
                <div class="col-lg-6 text-center mx-auto">
                    <i class="fas fa-bullhorn mt-4"></i>
                   <h5 class="mt-4 mb-4">Loading Posts...</h5>
                </div>
              }
              </div>
              <div class="col-lg-6">
                map
              </div>
            </div>
        </div>
    )
  }
}
