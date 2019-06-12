import React, { Component } from "react";
import { Jumbotron, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Youtube extends Component {



  constructor(props) {
    super(props);
    this.state = {
      allVideos: [],
      currentState: ""
    };
    this.getVideos = this.getVideos.bind(this);
    this.notify = this.notify.bind(this);
  }
  getVideos(event) {

    event.preventDefault();
    this.LoadingBar.staticStart()
    let id = this.refs.id.value;
    let qty = this.refs.qty.value;
    let api_Key = "AIzaSyBdMMs_pVQRnmfTwnAVi0cmADbLrdYhBrs";
    let linkUrl = `https://www.googleapis.com/youtube/v3/search?key=${api_Key}&channelId=${id}&part=snippet,id&order=date&maxResults=${qty}`;
    fetch(linkUrl)
      .then(res => res.json())
      .then(resjson => {
        let video = resjson.items.map((items) => `https://www.youtube.com/embed/${items.id.videoId}`);
        this.setState({
          allVideos: video,
          currentState: true
        })
      }).catch(err => {
        console.log(err);
        this.setState({
          currentState: false
        })
      });
    setTimeout(() => {
      this.LoadingBar.complete()
    }, 3000);
  }

  notify() {


    toast.info("Jay Shetty : UCbV60AGIHKz2xIGvbk0LLvg BeeBom : UCvpfclapgcuJo0M_x65pfRw", {

      className: ({
        color: "red",

      })
    });
  }



  render() {

    let notFound;
    if (this.state.currentState === true) {
      notFound = (<div>
        <h2>
          <i className="fas fa-video" /> Here the Videos are!{" "}
          <i className="far fa-grin-wink" />
        </h2>

      </div>
      )
    } else if (this.state.currentState === false) {
      notFound = (<div>
        <h2>
          <i className="fas fa-heart-broken" /> Oops! Check Channel id otherWise, No Videos Found!

        </h2>
      </div>)
    }


    return (




      <div>
        <LoadingBar
          height={3}
          color="#f11946"
          onRef={ref => (this.LoadingBar = ref)}
        />

        <div>

          <div>

            <div className="toastNot">
              <Button onClick={this.notify} variant="outline-light">Need Channel id's <i class="fas fa-question-circle"></i></Button>
            </div>
            <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnVisibilityChange
draggable={false}
pauseOnHover
/>

          </div>
          <div className="OverAll">
            <Jumbotron fluid>
              <h1 className="App">
                Hola! Fetch the Youtube Videos by Channel ID!
              </h1>
              '
              <div className="formsub">
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Channel ID</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="-E.g: UCXgGY0wkgOzynnHvSEVmE3A"
                      ref="id"
                    />
                    <Form.Text className="text-muted">
                      Find Youtube Channel Id's @
                      "https://commentpicker.com/youtube-channel-id.php"
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>No of Videos</Form.Label>
                    <Form.Control
                      type="Number"
                      placeholder="-E.g: 10"
                      ref="qty"
                    />
                  </Form.Group>
                  <Button onClick={this.getVideos} variant="primary btn-block" type="submit">Submit</Button>
                </Form>
              </div>
            </Jumbotron>
          </div>

          {notFound}
          {this.state.allVideos.map((cur, i) => {
            let out = <iframe  key={i} title={i} width="350" height="204" src={cur} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            return out;
          })
          }
          <div className="grid">
            {this.out}
          </div>

        </div>
      </div>




    );
  }

}

export default Youtube;

