class Nav extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container">
        {
          this.props.loggedIn ?
          <a class="navbar-brand" onClick={() => {this.props.toggleState('dashboard','browseTasks', 'myTasks','myWork','notifications'); this.props.goToTop()}}>Taskr</a>
          :
          <a class="navbar-brand" onClick={() => {this.props.toggleState(null, null, 'browseTasks'); this.props.goToTop()}}>Taskr</a>
        }
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="vl"></div>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            {
              this.props.loggedIn ?
              <ul class="navbar-nav">
                <li class="nav-item">
                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#postModal">Post a task</button>
                </li>
                <li class="nav-item">
                {
                  this.props.state.dashboard?
                <a class="nav-link text-danger" onClick={() =>{this.props.toggleState( 'dashboard',  'myWork','browseTasks', 'myTasks','notifications'); this.props.changeActive("dashboard-btn"); this.props.goToTop()}}>Dashboard</a>
                  :
                  <a class="nav-link" onClick={() =>{this.props.toggleState( 'dashboard', 'myWork','browseTasks', 'myTasks','notifications'); this.props.changeActive("dashboard-btn"); this.props.goToTop()}}>Dashboard</a>
                }
                </li>
                <li class="nav-item">
                {
                  this.props.state.browseTasks?
                  <a class="nav-link text-danger" onClick={() =>{ this.props.toggleState('browseTasks', 'myTasks','myWork','dashboard','notifications'); this.props.goToTop()}}> Browse Tasks</a>
                  :
                  <a class="nav-link" onClick={() =>{ this.props.toggleState('browseTasks', 'myTasks', 'myWork','dashboard','notifications'); this.props.goToTop()}}> Browse Tasks</a>
                }
                </li>

              </ul>
              :
              <ul class="navbar-nav">
                <li class="nav-item">
                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#loginModal">Post a task</button>
                </li>
                <li class="nav-item">
                  {
                    this.props.state.browseTasks?
                    <a class="nav-link text-danger" onClick={() =>{ this.props.toggleState('browseTasks', 'myTasks', 'dashboard','notifications'); this.props.goToTop()}}> Browse Tasks</a>
                    :
                    <a class="nav-link" onClick={() =>{ this.props.toggleState('browseTasks', 'myTasks',  'dashboard','notifications'); this.props.goToTop()}}> Browse Tasks</a>
                  }

                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#link" onClick={() => {this.props.toggleState(null, null, 'browseTasks');this.props.goToTop()}}>How it works</a>
                </li>
              </ul>
            }

            {
              this.props.loggedIn ?
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <div class="dropdown">
                    <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="fas fa-user"></i> {this.props.name}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item">Dashboard</a>
                      <a class="dropdown-item">My Tasks</a>
                      <a class="dropdown-item">My Offers</a>
                      <a class="dropdown-item">Notifications</a>
                      <a class="dropdown-item">Browse Tasks</a>
                      <a class="dropdown-item"><button class="btn btn-danger btn-block" onClick={this.props.logOut}>Logout</button></a>
                    </div>
                  </div>
                </li>
              </ul>
                  :
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <a class="nav-link">Help</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="modal" data-target="#signupModal">Sign Up</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="modal" data-target="#loginModal">Login</a>
                </li>
              </ul>
            }
          </div>
        </div>
      </nav>
    )
  }
}
