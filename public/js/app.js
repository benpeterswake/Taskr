class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false,
      name: '',
      id: '',
      myTasks: false,
      myWork: false,
      dashboard: true,
      browseTasks: false,
      notifications: false,
      posts: [],
      accepted: [],
      recentPosts:[],
      allPosts: [],
      post: {},
      offers: [],
      notifications: null,
      editPost: null,
      completedSum: 0,
      workSum: 0,
      createSuccess: false,
      offerSuccess: false
    }
    this.toggleState = this.toggleState.bind(this)
    this.checkSession = this.checkSession.bind(this)
    this.createPost = this.createPost.bind(this)
    this.getPost = this.getPost.bind(this)
    this.editPost = this.editPost.bind(this)
    this.completePost = this.completePost.bind(this)
    this.deletePost = this.deletePost.bind(this)
    this.getAllPosts = this.getAllPosts.bind(this)
    this.getRecentPosts = this.getRecentPosts.bind(this)
    this.logOut = this.logOut.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.goToTop = this.goToTop.bind(this)
    this.createOffer = this.createOffer.bind(this)
    this.getOffers = this.getOffers.bind(this)
    this.acceptOffer = this.acceptOffer.bind(this)
    this.getAccepted = this.getAccepted.bind(this)
  }

  componentDidMount(){
    this.checkSession()
    this.getRecentPosts()
    this.getAllPosts()
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
        let num = 0;
        for(let i=0; i<data.posts.length; i++){
          num += data.posts[i].offers.length
        }
        this.setState({
          posts: data.posts,
          completedSum: 0,
          notificationsNum: num,
        })
      }else{
        console.log('no posts');
      }
      for(let i=0; i<this.state.posts.length; i++){
        if(this.state.posts[i].completed){
          this.setState({
            completedSum: this.state.completedSum+=1
          })
        }
      }
    }).catch(error => console.log(error))
  }

  getAllPosts(){
    fetch('/post/all', {
      credentials: "same-origin"
    }).then(res => res.json())
      .then(data => {
        console.log(data);
      if(data.success){
        this.setState({
          allPosts: data.posts,
        })
        console.log(this.state);
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

  deletePost(post){
    fetch('/post/' + post._id, {
      credentials: "same-origin",
      method: 'DELETE'
    }).then(res => res.json())
      .then(data => {
        if(data.success){
          this.getPost()
        }else{
          console.log(data.error);
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
          this.setState({
            createSuccess: true
          })
          this.toggleState("myTasks", "dashboard","myWork","browseTasks","notifications");
          this.getPost()
          $('.list-group-item-danger').removeClass('list-group-item-danger');
          $('#myTasks').addClass('list-group-item-danger')
        }
    }).catch(error => console.log(error))
  }

  completePost(post){
    post.completed = !post.completed
    console.log(post);
    fetch('/post/completed', {
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

  createOffer(post, index){
    post.name = this.state.name
    fetch('/offer', {
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
          post: data.post,
          offerSuccess: true,
          notifications: false,
          dashboard: false,
          myTasks: false,
          myWork: true,
          browseTasks: false
        })
        this.getPost()
      }else{
        console.log('no posts');
      }
    }).catch(error => console.log(error))
  }

  getOffers(){
    fetch('/offer', {
      credentials: "same-origin",
      method: 'GET',
    }).then(res => res.json())
      .then(data => {
      if(data.success){
        this.setState({
          offers: data.offers,
        })
        console.log(this.state);
      }else{
        console.log('no posts');
      }
    }).catch(error => console.log(error))
  }

  getAccepted(){
    fetch('/offer/accept', {
      credentials: "same-origin"
    }).then(res => res.json())
      .then(data => {
        console.log(data);
      if(data.success){
        let num = 0;
        for(let i=0; i<data.post.length; i++){
          num += data.post[i].accepted.length
        }
        this.setState({
          accepted: data.post,
          workSum: num
        })
      }else{
        console.log('no posts');
      }
    }).catch(error => console.log(error))
  }

  acceptOffer(post, id){
    post.id = id
    fetch('/offer/accept', {
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
          post: data.post,
          notifications: false,
          dashboard: false,
          myTasks: true,
          myWork: false,
          browseTasks: false
        })
        this.getPost()
      }else{
        console.log('no posts');
      }
    }).catch(error => console.log(error))
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
          name: data.user.first_name + " " + data.user.last_name,
          id: data.user._id
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
            id: '',
            myTasks: false,
            myWork: false,
            dashboard: true,
            browseTasks: false,
            notifications:false,
            posts: [],
            allPosts: [],
            post: {},
            offers: [],
            editPost: null,
            completedSum: 0,
            createSuccess: false,
            offerSuccess: false,
          })
        }
    }).catch(error => console.log(error))
  }

  toggleState(st1, st2, st3, st4, st5, st6){
    this.setState({
      [st1]: true,
      [st2]: false,
      [st3]: false,
      [st4]: false,
      [st5]: false,
      [st6]: false
    })
  }

  toggleEdit(index, post){
    this.setState({
        editPost: index,
        post: post
    })
  }

  changeActive(id){
    $('.list-group-item-danger').removeClass('list-group-item-danger');
    $('#'+id).addClass('list-group-item-danger')
  }

  goToTop(){
    window.scrollTo(0,0);
  }

  render(){
    return(
      <section>
        {
          this.state.loggedIn ?
          <div>
            <Nav changeActive={this.changeActive} state={this.state} goToTop={this.goToTop} toggleState={this.toggleState} logOut={this.logOut} name={this.state.name} loggedIn={this.state.loggedIn} />
            <Post name={this.state.name} createPost={this.createPost}/>
            {
              this.state.browseTasks?
              <BrowseTasks getAllPosts={this.getAllPosts} toggleState={this.toggleState} createOffer={this.createOffer} state={this.state}/>
              :
              <Dashboard getAccepted={this.getAccepted} acceptOffer={this.acceptOffer} changeActive={this.changeActive} getOffers={this.getOffers} toggleState={this.toggleState} goToTop={this.goToTop} completePost={this.completePost} deletePost={this.deletePost} editPost={this.editPost} toggleEdit={this.toggleEdit} logOut={this.logOut} getPost={this.getPost} toggleState={this.toggleState} state={this.state} />
            }
          </div>
          :
          <div>
            <Auth toggleState={this.toggleState} checkSession={this.checkSession} />
            <Nav state={this.state} goToTop={this.goToTop} toggleState={this.toggleState}/>
            {
              this.state.browseTasks?
              <BrowseTasks getAllPosts={this.getAllPosts} state={this.state}/>
              :
              <section>
                <Header />
                <Services goToTop={this.goToTop} toggleState={this.toggleState}/>
                <About />
                <Info />
                <Recent goToTop={this.goToTop} toggleState={this.toggleState} state={this.state}/>
                <Data />
                <CallToAction />
                <Footer />
              </section>
            }
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
