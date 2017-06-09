import React, {Component} from 'react'
import '../css/Home.css'

class Home extends Component {
    render() {
        return (
            <div className="homeBody">
                <div className="titleWrapper">
                  <h1 className="title">Slugging</h1>
                  <h2 className="d">D</h2>
                  <p className="c">C</p>
                </div>
                <div className="subWrapper">
                  <div className="sub1">No</div>
                  <div className="sub2">More</div>
                  <div className="sub3">Traffic</div>
                  <div className="sub4">Jams</div>
                </div>
            </div>
        );
    }
}

export default Home;
