class Auth extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      success: null,
      error: null,
    }
      this.signUp = this.signUp.bind(this)
      this.logIn = this.logIn.bind(this)
  }

  logIn(user){
    this.setState({
      success: null,
      error: null
    });
    fetch('/login', {
      credentials: "same-origin",
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        if(data.error){
          this.setState({
            error: data.error
          });
        }else{
          this.props.checkSession()
          $('#loginModal').modal('hide');
        }

    }).catch(error => console.log(error))
  }

  signUp(user){
    this.setState({
      success: null,
      error: null
    });
    fetch('/signup', {
      credentials: "same-origin",
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        if(data.success){
          this.setState({
            success: data.success,
          });
          $('#signupModal').modal('hide');
          $('#loginModal').modal('show');
        }else{
          this.setState({
            error: data.error,
          });
        }
    }).catch(error => console.log(error))
   }

  render(){
    return(
      <section>
        <Signup signUp={this.signUp} error={this.state.error} />
        <Login logIn={this.logIn} success={this.state.success} error={this.state.error}/>
      </section>
    )
  }
}
