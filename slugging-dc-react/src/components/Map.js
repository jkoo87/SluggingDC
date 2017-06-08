import React, {Component} from 'react'
import { withGoogleMap, GoogleMap } from "react-google-maps";

class Map extends Component {

    render() {
        return (

            <GoogleMap
              defaultZoom={15}
              defaultCenter={{ lat: this.props.address.lat, lng: this.props.address.lng }}>
            </GoogleMap>
        )
    }
}

export default withGoogleMap(Map)
