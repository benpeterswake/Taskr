
class CallToAction extends React.Component{
  render(){
    return <section class="py-5 bg-red">
          <div class="container">
            <div class="col-lg-6 mx-auto text-center">
                <i class="far fa-thumbs-up"></i>
                <h5 class="mt-4">Join taskr now and start completing more tasks! </h5>
                <button class="btn btn-block btn-danger mt-4" data-toggle="modal" data-target="#signupModal">Sign up!</button>
            </div>
          </div>
        </section>
  }
}
