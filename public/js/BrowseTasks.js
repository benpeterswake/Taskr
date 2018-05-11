class BrowseTasks extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
        <section id="browse">
          <div class="container">
            <div class="col-lg-12 mx-auto">
              <div class="row full text-center">
                <div class="col-lg-6 right-col-browse mt-6">
                    {
                      this.props.state.allPosts.length > 0 ?
                      this.props.state.allPosts.map((post, index) => {
                        return(
                          <div class="col-lg-12">
                            <div class="card text-white bg-secondary mb-3 mt-3">
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
                <div class="col-lg-6 left-col-browse mt-6">
                  <iframe
                  id="map"
                  frameborder="0"
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCcW5MvI978Kzo00mC8SYZMLRApYx3ceyw&q=Space+Needle,Seattle+WA" allowfullscreen>
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
  }
}
