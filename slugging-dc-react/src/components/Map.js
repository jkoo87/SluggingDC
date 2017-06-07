import React, {Component} from 'react'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class Map extends Component {
    constructor(props){
      super(props)
      this.state={
        address: this.props.address
      }
    }
    componentWillReceiveProps(nextProps){
      this.setState({
        address: nextProps.address
      })
    }

    render() {
        console.log(this.state.address.lat)
        const markers = this.props.markers || []

        return (
            <GoogleMap
              defaultZoom={15}
              defaultCenter={{ lat: this.state.address.lat, lng: this.state.address.lat }}>
              {markers.map((marker, index) => (
                <Marker {...marker}/>
                )
              )}
            </GoogleMap>

        )
    }
}

export default withGoogleMap(Map)
