class BrowseTasks extends React.Component{
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    this.props.getAllPosts()
  }

  handleClick(post, index){
    console.log(post);
    this.props.createOffer(post, index)
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
                        let found = false;
                        for(let i=0; i<post.offers.length; i++){
                          if(post.offers[i].user_id === this.props.state.id){
                            found = true
                          }
                        }
                        return(
                          <div class="col-lg-12 ">
                          {
                            post.accepted.length > 0? null:
                            <span>
                            {
                              post.user_id === this.props.state.id?null:
                              <span>
                              {
                                post.completed?null:
                              <div class="card text-white bg-secondary  mt-3">
                              {
                               this.props.state.offerSuccess === index?
                               <div class="alert alert-success" role="alert">
                                 Offer made! The owner of the post as been notified
                               </div>:null
                               }
                               <div class="card-header">
                                {post.title}
                                {post.completed?<span class="badge badge-danger float-right">Completed</span>:<span class="badge badge-success float-right">Active</span>}
                               </div>
                                <div class="card-body">
                                  <h4 class="float-right">${post.budget}{post.hourly?'/hr':null}
                                  <br/>
                                  <span class="small">Offers:
                                        {
                                          post.offers.length>0?
                                           " " + post.offers.length
                                          : ' None'
                                        }
                                  </span><br/>
                                  <span class="small">People required: {post.people}</span>
                                  </h4>
                                  <span class="small"><i class="fas fa-user-tag"></i> {post.name}</span><br/>
                                  <span class="small"><i class="far fa-calendar"></i> {post.date}</span><br/>
                                  <span class="small"><i class="fas fa-map-marker"></i>  {post.location}</span><br/>

                                  <span class="small"><i class="fas fa-align-left"></i> {post.description}</span>
                                </div>
                                <div class="card-footer bg-dark">
                                  <span>
                                  {
                                    this.props.state.loggedIn?
                                    <span>
                                      {
                                        found?
                                        <span class="small">You have already applied to this posting</span>
                                        :
                                        <a href="#" onClick={() => this.handleClick(post, index)} class="card-link">Submit Offer</a>
                                      }
                                      </span>
                                    :
                                    <a  href="#" class="card-link" data-toggle="modal" data-target="#loginModal">Submit Offer</a>
                                  }
                                  </span>
                                </div>
                              </div>
                              }
                              </span>
                            }
                            </span>
                          }

                          </div>
                        )
                      })
                      :
                      <div class="col-lg-6 text-center mx-auto">
                          <i class="fas fa-bullhorn mt-4"></i>
                         <h5 class="mt-4 mb-4">Loading Posts...</h5>
                      </div>
                    }
                    <div class="mt-4 mb-4"></div>
                </div>
                <div class="col-lg-6 left-col-browse mt-6">
                  <iframe
                  id="map"
                  frameborder="0"
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCcW5MvI978Kzo00mC8SYZMLRApYx3ceyw&q=Atlanta+GA" allowfullscreen>
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
  }
}
