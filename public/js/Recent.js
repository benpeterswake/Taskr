class Recent extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <section id="services">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <h4 class="mt-5 text-center text-muted">Recently posted tasks</h4>
                <div class="row">
                {
                  this.props.state.recentPosts.slice(0, 8).map((post, index) => {
                    return (
                      <div class="col-lg-3 mt-5">
                        <div class="card bg-lightgrey">
                           <div class="card-body">
                             <p class="text-muted">{post.createdAt.split('T')[0]}</p>
                             <h5 class="card-title"><small>{post.title}</small></h5>
                             <p class="card-text">{post.location}</p>
                           </div>
                        </div>
                      </div>
                    )
                  })
                }
                </div>
                <div class="row mt-5">
                  <div class="col-lg-12 text-center">
                    <button class="btn btn-outline-secondary">See more tasks</button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
