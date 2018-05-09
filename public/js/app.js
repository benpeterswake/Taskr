class Dashboard extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    this.props.getPost()
  }
  changeActive(event){
    $('.list-group-item-danger').removeClass('list-group-item-danger');
    $(event.target).addClass('list-group-item-danger')
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
                  <li class="list-group-item  list-group-item-danger mt-4" onClick={(event) => {this.props.toggleState("dashboard", "myTasks"); this.changeActive(event)}}>Dashboard</li>
                  <li class="list-group-item" onClick={(event) => {this.props.toggleState("myTasks", "dashboard"); this.changeActive(event)}}>My Tasks</li>
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
                          <h5>Post another task!</h5>
                          <p>or <a href="btn">browse tasks</a>.</p>
                          </div>
                          <div class="col-lg-5 mt-2">
                             <button class="btn btn-danger btn-block" data-toggle="modal" data-target="#postModal">Post A Task</button>
                          </div>
                        </div>
                      </div>
                      <div class="container">
                        <h5 class="text-center mt-5">Here are some popular categories!</h5>
                        <div class="row mt-4">
                        <div class="col-lg-3">
                            <div class="card">
                              <img class="card-img-top" src="http://placehold.it/300x200" alt="" />
                              <div class="card-footer text-muted">
                                Handyman Services
                              </div>
                          </div>
                        </div>
                          <div class="col-lg-3">
                            <div class="card">
                                <img class="card-img-top" src="http://placehold.it/300x200" alt="" />
                                <div class="card-footer text-muted">
                                  Garden Maintenance
                                </div>
                            </div>
                          </div>
                          <div class="col-lg-3">
                            <div class="card">
                                <img class="card-img-top" src="http://placehold.it/300x200" alt="" />
                                <div class="card-footer text-muted">
                                  Pickup & Delivery
                                </div>
                            </div>
                          </div>
                          <div class="col-lg-3">
                            <div class="card">
                                <img class="card-img-top" src="http://placehold.it/300x200" alt="" />
                                <div class="card-footer text-muted">
                                  House Cleaning Services
                                </div>
                            </div>
                          </div>
                        </div>
                        <h5 class="text-center mt-5">Your Tasks Summary</h5>
                      </div>
                    </div>
                    :null
                  }

                  {
                  this.props.state.myTasks?
                    <div class="inner">
                      <h5 class="text-gery">My Tasks</h5>
                      <hr/>
                      <div class="container">
                            {
                              this.props.state.posts.length > 0 ?
                              this.props.state.posts.map((post, index) => {
                                return(
                                  <div class="col-lg-10 mx-auto">
                                    <div class="card text-white bg-secondary mt-4">
                                     <div class="card-header">
                                      {post.title}
                                      <span class="badge badge-success float-right">{post.completed?'Completed':'Active'}</span>
                                     </div>
                                      <div class="card-body">
                                        <h5 class="card-title"><small>Budget: ${post.budget} {post.hourly?'/hr':null}</small></h5>
                                        <p class="card-text">Due Date: {post.date}</p>
                                        <p class="card-text">Location: {post.location}</p>
                                        <p class="card-text">Offers: {post.offers.length>0? post.offers: 'None'}</p>
                                      </div>
                                      <div class="card-footer bg-light">
                                      <a href="#" class="card-link">Edit Task</a>
                                      <a href="#" class="card-link text-danger">Delete Task</a>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })
                              :
                              <p>You have no posts yet...</p>
                            }
                      </div>
                    </div>
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

class Post extends React.Component{
  constructor(props){
    super(props)

    let month = new Date().getDate()
    if(month < 10){
      month = "0" + new Date().getDate()
    }
    let day = new Date().getDay()
    if(day < 10){
      day = "0" + new Date().getDay()
    }
    let year = new Date().getFullYear()

    this.date = year + "-" + month + "-" +  day;

    this.state = {
      name: this.props.name,
      title: '',
      description: '',
      location: '',
      date: this.date,
      budget: '',
      total: true,
      hourly: false,
      people: 1,
      today: true,
      certain: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clickedNext = this.clickedNext.bind(this)
    this.changeBudget = this.changeBudget.bind(this)
    this.changeDate = this.changeDate.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleChange(event){
      this.setState({
        [event.target.id]: event.target.value,
      })
  }

  handleDateChange(event){
    if(this.state.today !== this.date){
      this.setState({
        [event.target.id]: event.target.value,
        today: false,
        certain: true,
      })
    }else{
      this.setState({
        [event.target.id]: event.target.value,
      })
    }
  }

  handleSubmit(event){
    event.preventDefault();
    console.log(this.state);
    this.props.createPost(this.state)
    this.setState({
      title: '',
      description: '',
      location: '',
      date: '',
      total: true,
      hourly: false,
      budget: null,
      people:1,
      error: false,
      today: true,
      certain: false
    })
  }

  clickedNext(){
    this.setState({
      error: false
    })
    if($('#nav-home-tab').hasClass('active')){
        $('#postBtn').attr('type', 'button')
        if(this.state.title === '' || this.state.description === ''){
          this.setState({
            error: true
          })
        }else{
          $('.nav-tabs > .active').next('a').removeClass('disabled');
          $('.nav-tabs > .active').next('a').trigger('click');
        }
      }else if($('#nav-profile-tab').hasClass('active')){
        $('#postBtn').attr('type', 'button')
        if(this.state.location === '' || this.state.date === ''){
          this.setState({
            error: true
          })
        }else{
          $('.nav-tabs > .active').next('a').removeClass('disabled');
          $('.nav-tabs > .active').next('a').trigger('click');
        }
      }else{
          $('#postBtn').attr('type', 'submit')
    }
  }

  clickedBack(){
    $('.nav-tabs > .active').next('a').addClass('disabled');
      $('#nav-contact-tab').addClass('disabled');
  }

  changeBudget(){
    if(this.state.total === true){
      this.setState({
        total: false,
        hourly: true
      })
    }else{
      this.setState({
        total: true,
        hourly: false
      })
    }
  }
  changeDate(){
    if(this.state.today === true){
      this.setState({
        today: false,
        certain: true,
        date: ''
      })
    }else{
      this.setState({
        today: true,
        certain: false,
        date: this.date
      })
    }
  }
  render(){
    return(
      <div class="modal fade" id="postModal" tabindex="-1" role="dialog" aria-labelledby="postModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-top" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title" id="postModal">Post a task</h3>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={this.handleSubmit}>
              { this.state.error?
                <div class="alert alert-danger" role="alert">
                  Please fill out all fields!
                </div>: null
              }
              <div class="modal-body">
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true" onClick={this.clickedBack}>Details</a>
                <a class="nav-item nav-link disabled" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false" onClick={this.clickedBack}>Location</a>
                <a class="nav-item nav-link disabled" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Budget</a>
              </div>

              <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                  <div class="form-group mt-4">
                    <label>Task title</label>
                    <input type="text" id="title" class="form-control" onChange={this.handleChange} value={this.state.title}  placeholder="Title" required/>
                  </div>
                  <div class="form-group">
                    <label>Describe your task in more detail</label>
                    <p class="small">For your safety, please do not share personal information, e.g., email, phone or address</p>
                    <textarea rows="5" type="textarea" id="description" class="form-control" onChange={this.handleChange} value={this.state.description}  placeholder="Description" required></textarea>
                  </div>
                </div>

                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                  <div class="form-group mt-4">
                    <label>Location</label>
                    <input type="text" id="location" class="form-control" onChange={this.handleChange} value={this.state.location}  placeholder="Location" required/>
                  </div>
                  <div class="form-group">
                    <label>Due Date</label><br/>
                    <input id="datebox1" type="radio" onClick={ this.changeDate } checked={this.state.today}/> <label for="datebox1"> Today (A.S.A.P)</label> <input id="datebox2" type="radio" onClick={ this.changeDate } checked={this.state.certain} /> <label for="datebox2">By Certain Date</label>
                    <input type="date" id="date" class="form-control" onChange={this.handleDateChange} value={this.state.date}  placeholder="Due Date" required/>
                  </div>
                </div>

                <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                  <div class="form-group mt-4">
                      <label>How many people do you need?</label>
                      <input type="number" id="people" class="form-control" min="1" onChange={this.handleChange} value={this.state.people} required/>
                  </div>
                  <div class="form-group">
                      <label>What is your budget?</label><br/>
                      <input id="total" type="radio" onClick={this.changeBudget} checked={this.state.total}/> <label for="total">Total</label> <input id="hourly" type="radio" onClick={this.changeBudget} checked={this.state.hourly} /> <label for="hourly">Hourly </label>
                      <div class="input-group">
                       <div class="input-group-prepend">
                         <div class="input-group-text">$ {this.state.hourly?<span>/hr</span>: null}</div>
                       </div>
                       <input type="number" id="budget" class="form-control" onChange={this.handleChange} value={this.state.budget} required/>
                     </div>
                  </div>
                 </div>
                </div>
              </div>
              <div class="modal-footer">
                  <button type="button" id="postBtn" onClick={this.clickedNext} class="btn btn-danger btn-block">Next</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false,
      name: '',
      myTasks: false,
      dashboard: true,
      posts: []
    }
    this.toggleState = this.toggleState.bind(this)
    this.checkSession = this.checkSession.bind(this)
    this.createPost = this.createPost.bind(this)
    this.getPost = this.getPost.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  componentDidMount(){
    this.checkSession()
  }

  getPost(){
    fetch('/post', {
      credentials: "same-origin",
    }).then(res => res.json())
      .then(data => {
      if(data.success){
        this.setState({
          posts: data.posts
        })
        console.log(this.state.posts);
      }else{
        console.log('no posts');
      }
    }).catch(error => console.log(error))
  }

  createPost(post){
    fetch('/post', {
      credentials: "same-origin",
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        if(data.success){
          $('#postModal').modal('hide');
        }
    }).catch(error => console.log(error))
  }

  toggleState(st1, st2){
    this.setState({
      [st1]: true,
      [st2]: false,
    })
  }

  checkSession(){
    fetch('/login', {
      credentials: "same-origin"
    })
    .then(res => res.json())
    .then(data => {
      if(data.auth === 'logged in'){
        this.setState({
          loggedIn: true,
          name: data.user.first_name + " " + data.user.last_name
        })
      }
    }).catch(error => console.log(error))
  }

  logOut(){
    fetch('/login', {
      credentials: "same-origin",
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        if(data.auth === "logged out"){
          this.setState({
            loggedIn: false
          })
        }
    }).catch(error => console.log(error))
  }

  render(){
    return(
      <section>
        {
          this.state.loggedIn ?
          <div>
            <Nav logOut={this.logOut} name={this.state.name} loggedIn={this.state.loggedIn} />
            <Post name={this.state.name} createPost={this.createPost}/>
            <Dashboard logOut={this.logOut} getPost={this.getPost} toggleState={this.toggleState} state={this.state} />
          </div>
          :
          <div>
            <Auth checkSession={this.checkSession} />
            <Nav />
            <Header />
            <Services />
            <About />
            <Info />
            <Recent />
            <Data />
            <CallToAction />
            <Footer />
          </div>
        }
    </section>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('main')
)
