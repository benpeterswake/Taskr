class Notifications extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div class="inner">
        <h5>Notifications</h5>
        <hr/>
            <div>
            {
              this.props.state.notificationsNum > 0?
              <div>
              {
                this.props.state.posts.map((post, index) => {
                  return post.offers.map((offer, index) => {
                    return (
                      <div class="col-lg-8 text-cente mt-3 mx-auto">
                        <div class="card text-white bg-secondary ">
                          <div class="card-body">
                            <span class="badge badge-warning">Pending Your Approval</span><br/>
                            <p class="card-text mt-2">{offer.name} made an offer on <strong>{post.title}</strong></p>
                            <h5 class="card-text">${offer.budget}{offer.total?null:'/hr'}</h5>
                            <p><button onClick={() => this.props.acceptOffer(offer, post._id)} class="btn btn-success btn-sm">Accept Offer</button></p>
                            <p><button onClick={() => this.props.declineOffer(offer, post._id)} class="btn btn-danger btn-sm">Decline Offer</button></p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                })
              }
              </div>
              :
              <div class="col-lg-8 text-center mx-auto">
                  <i class="fas fa-bullhorn mt-4"></i>
                 <h5 class="mt-4 mb-4">You have no notifications...</h5>
              </div>
            }
            </div>
      </div>
    )
  }
}

class MyWork extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div class="inner">
        <h5>My Work</h5>
        <hr/>
        <span>
            {
             this.props.state.offerSuccess?
             <div class="alert alert-success" role="alert">
               Offer successfull made!
               <button type="button" class="close" onClick={() => this.props.toggleState(null,null,"createSuccess")}>
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>:null
             }
          </span>
          <h6 class="mt-4 text-center">Offers Made</h6>
          <div class="row">
          {
            this.props.state.offers.length > 0?
            this.props.state.offers.map((offer, index) => {
              return (
                <div class="col-lg-6 mt-3">
                  <div class="card text-white bg-secondary ">
                    <div class="card-body">
                      <span class="badge badge-warning float-right">Pending</span>
                      <span class="card-text">Task: {offer.title}</span><br/>
                      <span class="card-text">User: {offer.name}</span><br/>
                      <span class="card-text">budget: ${offer.budget}{offer.total?null:'/hr'}</span><br/>
                      <span class="card-text">Due date: {offer.date}</span>
                    </div>
                  </div>
                </div>

              )
            })
            :
            <div class="col-lg-8 text-center mx-auto">
                <i class="fas fa-bullhorn mt-4"></i>
               <h5 class="mt-4 mb-4 small">You have no new offers on tasks...</h5>
            </div>
          }
          </div>
          <hr/>

          <h6 class="mt-4 text-center">Accepted Offers</h6>
          <div class="row">
          {
            this.props.state.accepted.length > 0?
            this.props.state.accepted.map((accepted, index) => {
              return (
                <div class="col-lg-6 mt-3">
                  <div class="card text-white bg-secondary ">
                    <div class="card-body">
                      <span class="badge badge-success float-right">Accepted</span>
                      <span class="card-text">Task: {accepted.title}</span><br/>
                      <span class="card-text">User: {accepted.name}</span><br/>
                      <span class="card-text">budget: ${accepted.budget}{accepted.total?null:'/hr'}</span><br/>
                      <span class="card-text">Due date: {accepted.date}</span>
                    </div>
                  </div>
                </div>
              )
            })
            :
            <div class="col-lg-8 text-center mx-auto">
                <i class="fas fa-bullhorn mt-4"></i>
               <h5 class="mt-4 mb-4 small">You have no new offers on tasks...</h5>
            </div>
          }
          </div>
      </div>
    )
  }
}
// <div class="col-lg-8 text-center mx-auto">
// <i class="fas fa-bullhorn mt-4"></i>
// <h5 class="mt-4 mb-4 small">You have no accepted offers...</h5>
// </div>
class Dashboard extends React.Component{
  constructor(props){
    super(props)

  }
  componentDidMount(){
    this.props.getOffers()
    this.props.getAccepted()
    this.props.getPost()
  }

  render(){
    return(
      <section id="dashboard">
        <div class="container">
          <div class="col-lg-12 mx-auto">
            <div class="row full text-center">
                <div class="col-lg-3 left-col">
                  <div class="inner">
                    <i class="far fa-user-circle"></i>
                  </div>
                  <p class="text-muted">{this.props.state.name}</p>
                  <li id="dashboard-btn" class="list-group-item  list-group-item-danger mt-5" onClick={() => {this.props.toggleState("dashboard", "myTasks", "myWork","notifications"); this.props.changeActive("dashboard-btn")}}>Dashboard</li>
                  <li id="myTasks" class="list-group-item" onClick={() => {this.props.toggleState("myTasks", "dashboard","myWork","notifications"); this.props.changeActive("myTasks")}}>My Tasks <span class="badge badge-pill badge-warning">{this.props.state.inProgress}</span></li>
                  <li id="myWork" class="list-group-item" onClick={(event) => {this.props.toggleState("myWork", "dashboard", "myTasks","notifications"); this.props.changeActive("myWork")}}>My Work <span class="badge badge-pill badge-success"> {this.props.state.workSum}</span></li>
                  <li id="notifications" class="list-group-item" onClick={(event) => {this.props.toggleState("notifications","myWork", "dashboard", "myTasks"); this.props.changeActive("notifications")}}>Notifications <span class="badge badge-pill badge-warning">{this.props.state.notificationsNum}</span></li>
                  <li class="list-group-item text-danger" onClick={this.props.logOut}>Logout</li>
                </div>
                <div class="col-lg-9 right-col">
                  {
                    this.props.state.dashboard?
                    <div class="inner">
                      <h5>Dashboard</h5>
                      <hr/>
                      <div class="alert alert-secondary" role="alert">
                        <div class="row text-center mt-3">
                          <div class="col-lg-7">
                          {this.props.state.posts.length <= 0 ? <h5>Post your first task!</h5>:<h5>Post another task!</h5> }
                          <p>or <a class="text-danger" onClick={() =>{ this.props.toggleState('browseTasks', 'myTasks', 'dashboard'); this.props.goToTop()}}>browse tasks</a>.</p>
                          </div>
                          <div class="col-lg-5 mt-2" data-toggle="modal" data-target="#postModal">
                             <button class="btn btn-danger btn-block" data-toggle="modal" data-target="#postModal">Post A Task</button>
                          </div>
                        </div>
                      </div>
                      <div class="container dashboard-categories">
                        <h5 class="text-center mt-5">Here are some popular categories!</h5>
                        <div class="row mt-4">
                          <div class="col-lg-3">
                              <div class="card"  data-toggle="modal" data-target="#postModal">
                                <img class="card-img-top" src="https://www.workingtraveller.com/wp-content/uploads/2015/08/1038x584xhandyman.jpg.pagespeed.ic.EiH2e84r9E.jpg" alt="" />
                                <div class="card-footer text-muted">
                                  Handyman Services
                                </div>
                            </div>
                          </div>
                            <div class="col-lg-3">
                              <div class="card"  data-toggle="modal" data-target="#postModal">
                                  <img class="card-img-top" src="http://nebula.wsimg.com/5acaf68bb4af12bc91b69f0124f53862?AccessKeyId=376756677743E771C432&disposition=0&alloworigin=1" alt="" />
                                  <div class="card-footer text-muted">
                                    Garden Maintenance
                                  </div>
                              </div>
                            </div>
                            <div class="col-lg-3">
                              <div class="card" data-toggle="modal" data-target="#postModal">
                                  <img class="card-img-top" src="https://northwestfire.org/wp-content/uploads/2016/05/Delivery.jpg" alt="" />
                                  <div class="card-footer text-muted">
                                    Pickup & Delivery
                                  </div>
                              </div>
                            </div>
                            <div class="col-lg-3">
                              <div class="card" data-toggle="modal" data-target="#postModal">
                                  <img class="card-img-top" src="http://rosascleaningservicellc.com/wp-content/uploads/sites/4466/2017/09/slide-1.jpg" alt="" />
                                  <div class="card-footer text-muted">
                                    House Cleaning Services
                                  </div>
                              </div>
                            </div>
                        </div>

                      <h5 class="text-center mt-5">Your Task Summary <br/><small>(Tasks you posted)</small></h5>
                      <div class="row text-center sum mt-4">
                        <div class="col-lg-3">
                          <div class="card text-white bg-success" onClick={() => {this.props.toggleState("myTasks", "dashboard"); this.props.changeActive("myTasks")}}>
                              <h4>{this.props.state.posts.length}</h4>
                              <div class="card-footer">
                                Active Posts
                              </div>
                          </div>
                        </div>
                        <div class="col-lg-3">
                          <div class="card text-white bg-warning" onClick={() => {this.props.toggleState("notifications","myTasks", "dashboard"); this.props.changeActive("notifications")}}>
                              <h4>{this.props.state.notificationsNum}</h4>
                            <div class="card-footer">
                              Offers
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-3">
                          <div class="card text-white bg-primary" onClick={() => {this.props.toggleState("myTasks", "dashboard","notifications"); this.props.changeActive("myTasks")}}>
                                <h4>0</h4>
                              <div class="card-footer">
                                Accepted
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-3">
                            <div class="card text-white bg-info" onClick={() => {this.props.toggleState("myTasks", "dashboard","notifications"); this.props.changeActive("myTasks")}}>
                              <h4>
                              {this.props.state.completedSum}
                              </h4>
                              <div class="card-footer">
                              Completed
                              </div>
                            </div>
                        </div>
                      </div>

                        <h5 class="text-center mt-5">Your Work Summary <br/> <small>(Tasks you offered to complete)</small></h5>
                        <div class="row text-center sum mt-4 mb-5">
                          <div class="col-lg-3">
                            <div class="card  text-white bg-secondary">
                                <h4>{this.props.state.offers.length}</h4>
                                <div class="card-footer">
                                  Offers Made
                                </div>
                            </div>
                          </div>
                          <div class="col-lg-3">
                            <div class="card  text-white bg-secondary">
                              <h4>{this.props.state.workSum}</h4>
                              <div class="card-footer">
                                Offers Accepted
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-3">
                            <div class="card  text-white bg-secondary">
                                <h4>0</h4>
                                <div class="card-footer">
                                  Completed
                                </div>
                              </div>
                            </div>
                          <div class="col-lg-3">
                            <div class="card  text-white bg-secondary">
                                  <h4>$0</h4>
                                  <div class="card-footer">
                                    Earnings
                                  </div>
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
                    :null
                  }

                  {
                  this.props.state.myTasks?
                    <MyTasks changeActive={this.props.changeActive} toggleState={this.props.toggleState} completePost={this.props.completePost} deletePost={this.props.deletePost} state={this.props.state} editPost={this.props.editPost} toggleEdit={this.props.toggleEdit}/>
                  :
                  null
                  }
                  {
                  this.props.state.myWork?
                    <MyWork state={this.props.state}/>
                  :
                  null
                  }
                  {
                  this.props.state.notifications?
                    <Notifications declineOffer={this.props.declineOffer} acceptOffer={this.props.acceptOffer} state={this.props.state}/>
                  :
                  null
                  }

                </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
