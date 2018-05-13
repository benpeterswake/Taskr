class Post extends React.Component{
  constructor(props){
    super(props)

    let month = new Date().getMonth()+1
    if(month < 10){
      month = "0" + new Date().getMonth()
    }
    let day = new Date().getDate()
    if(day < 10){
      day = "0" + new Date().getDate()
    }
    console.log(day);
    let year = new Date().getFullYear()

    this.date = year + "-" + month + "-" +  day;

    this.state = {
      name: this.props.name,
      title: '',
      description: '',
      location: '',
      date: this.date,
      budget: null,
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
      date: this.date,
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
        if(this.state.people < 1 || this.state.budget === null){
          this.setState({
            error: true
          })
        }else{
          $('#postBtn').attr('type', 'submit')
          $('#nav-profile-tab').addClass('disabled')
          $('#nav-contact-tab').addClass('disabled')
          $('#nav-home-tab').trigger('click')
        }
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
