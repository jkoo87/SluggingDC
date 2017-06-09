import React, {Component} from 'react'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class Map extends Component {

    render() {
      const markers = this.props.markers || []
      console.log(this.props.markers)
        return (
            <GoogleMap
              defaultZoom={15}
              defaultCenter={{ lat: this.props.address.lat, lng: this.props.address.lng }}>
              {markers.map((marker, index) => (
                <Marker {...marker}/>
                )
              )}
            </GoogleMap>
        )
    }
}

export default withGoogleMap(Map)
