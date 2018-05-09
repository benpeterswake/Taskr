class Dashboard extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    this.props.getPost()
  }
  changeActive(id){
    $('.list-group-item-danger').removeClass('list-group-item-danger');
    $('#'+id).addClass('list-group-item-danger')
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
                  <li id="dashboard-btn" class="list-group-item  list-group-item-danger mt-5" onClick={() => {this.props.toggleState("dashboard", "myTasks"); this.changeActive("dashboard-btn")}}>Dashboard</li>
                  <li id="myTasks" class="list-group-item" onClick={() => {this.props.toggleState("myTasks", "dashboard"); this.changeActive("myTasks")}}>My Tasks</li>
                  <li id="myWork" class="list-group-item" onClick={(event) => {this.props.toggleState("myTasks", "dashboard"); this.changeActive("myWork")}}>My Work</li>
                  <li class="list-group-item">Notifications</li>
                  <li class="list-group-item">Payments</li>
                  <li class="list-group-item">Settings</li>
                  <li class="list-group-item text-danger" onClick={this.props.logOut}>Logout</li>
                </div>
                <div class="col-lg-9 right-col">
                  {
                    this.props.state.dashboard?
                    <div class="inner">
                      <h5 class="text-gery">Dashboard</h5>
                      <hr/>
                      <div class="alert alert-secondary" role="alert">
                        <div class="row text-center mt-3">
                          <div class="col-lg-7">
                          {this.props.state.posts.length <= 0 ? <h5>Post your first task!</h5>:<h5>Post another task!</h5> }
                          <p>or <a class="text-danger">browse tasks</a>.</p>
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
                              <div class="card">
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
                            <div class="card text-white bg-success" onClick={() => {this.props.toggleState("myTasks", "dashboard"); this.changeActive("myTasks")}}>
                                <h4>{this.props.state.posts.length}</h4>
                                <div class="card-footer">
                                  Active Posts
                                </div>
                            </div>
                          </div>
                          <div class="col-lg-3">
                            <div class="card text-white bg-warning" onClick={() => {this.props.toggleState("myTasks", "dashboard"); this.changeActive("myTasks")}}>
                                <h4>0</h4>
                              <div class="card-footer">
                                Offers
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-3">
                            <div class="card text-white bg-primary" onClick={() => {this.props.toggleState("myTasks", "dashboard"); this.changeActive("myTasks")}}>
                                  <h4>0</h4>
                                <div class="card-footer">
                                  Accepted
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-3">
                              <div class="card text-white bg-info" onClick={() => {this.props.toggleState("myTasks", "dashboard"); this.changeActive("myTasks")}}>
                                <h4>0</h4>
                                <div class="card-footer ">
                                Completed
                                </div>
                              </div>
                          </div>
                        </div>
                        <h5 class="text-center mt-5">Your Work Summary <br/> <small>(Tasks you offered to complete)</small></h5>
                        <div class="row text-center sum mt-4 mb-5">
                          <div class="col-lg-3">
                            <div class="card  text-white bg-secondary">
                                <h4>0</h4>
                                <div class="card-footer">
                                  Offers Made
                                </div>
                            </div>
                          </div>
                          <div class="col-lg-3">
                            <div class="card  text-white bg-secondary">
                              <h4>0</h4>
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
                    <MyTasks state={this.props.state} editPost={this.props.editPost} toggleEdit={this.props.toggleEdit}/>
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
