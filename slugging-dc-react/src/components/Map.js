import React, {Component} from 'react'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class Map extends Component {

    render() {

        const marker = [
          {
            position:{
              lat: this.props.address.lat,
              lng: this.props.address.lng
            }
          }
        ]
        return (
            <GoogleMap
              defaultZoom={15}
              defaultCenter={{ lat: this.props.address.lat, lng: this.props.address.lng }}
              marker={marker}
              // markers={{lat: this.props.address.lat, lng: this.props.address.lng}}
              >
              {marker.map((marker, i) => (
                <Marker key={i} {...marker}/>
                )
              )}
            </GoogleMap>
        )
    }
}

export default withGoogleMap(Map)
