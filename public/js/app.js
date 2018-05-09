class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false,
      name: '',
      myTasks: false,
      dashboard: true,
      posts: [],
      recentPosts:[],
      post: {},
      editPost: null
    }
    this.toggleState = this.toggleState.bind(this)
    this.checkSession = this.checkSession.bind(this)
    this.createPost = this.createPost.bind(this)
    this.getPost = this.getPost.bind(this)
    this.editPost = this.editPost.bind(this)
    this.getRecentPosts = this.getRecentPosts.bind(this)
    this.logOut = this.logOut.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
  }

  componentDidMount(){
    this.checkSession()
    this.getRecentPosts()
  }

  getRecentPosts(){
    fetch('/post/recent', {
      credentials: "same-origin",
    }).then(res => res.json())
      .then(data => {
      if(data.success){
        this.setState({
          recentPosts: data.posts
        })
        console.log(this.state.posts);
      }else{
        console.log('no posts');
      }
    }).catch(error => console.log(error))
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

  editPost(post){
    fetch('/post', {
      credentials: "same-origin",
      method: 'PUT',
      body: JSON.stringify(post),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
      if(data.success){
        this.setState({
          post: data.post
        })
        this.getPost()
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
          this.getPost()
        }
    }).catch(error => console.log(error))
  }

  toggleState(st1, st2){
    this.setState({
      [st1]: true,
      [st2]: false,
    })
  }

  toggleEdit(index, post){
    this.setState({
        editPost: index,
        post: post
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
            loggedIn: false,
            name: '',
            myTasks: false,
            dashboard: true,
            post: {},
            posts: [],
            editPost: null
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
            <Dashboard editPost={this.editPost} toggleEdit={this.toggleEdit} logOut={this.logOut} getPost={this.getPost} toggleState={this.toggleState} state={this.state} />
          </div>
          :
          <div>
            <Auth checkSession={this.checkSession} />
            <Nav />
            <Header />
            <Services />
            <About />
            <Info />
            <Recent state={this.state}/>
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
