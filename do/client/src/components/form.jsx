import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,getLatLng
} from "react-places-autocomplete";

import { classnames } from "./formdata";
// const areas;
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areas:[],
      address: "",
      errorMessage: "",
      latitude: '',
      longitude: '',
      isGeocoding: false,
      city:'',
      state:'',
      place_id: '',
      none:'',
      t:true
    };
  }
componentDidMount(){
  if(this.state.t){
    this.setState({
      address:"knd"
    })
  }
}
  handleChange = address => {
    this.setState({
      address,
     
      errorMessage: ""
    });
  };
  administrative_area_level_2

  handle_data = (data,selected) => {
    data.address_components.map((item) => (
      item.types.map((items) => (
   (items === 'administrative_area_level_1') ? this.setState({state:item.long_name}) : this.setState({none:item.long_name})
     
        ))
     
      ))

      data.address_components.map((item) => (
        item.types.map((items) => (
     (items === 'administrative_area_level_2') ? this.setState({city:item.long_name}) : this.setState({none:item.long_name})
       
          ))
       
        ))
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
     
      
      var nameArr = data.formatted_address.split(','),
      areas = 	{
        	'city':this.state.city,
        	'state':this.state.state,
        	'place_id':data.place_id,
        	'lat':lat,
        	'lng':lng,
        	'first_line':  nameArr[0]  ,
        	'second_line':  nameArr[1],
        	'third_line':nameArr[3]
        }
        console.log(areas)
      
          

      })
      console.log(data);
      
  };
  

  handleSelect = selected => {
    this.setState({ isGeocoding: true, address: selected });
    geocodeByAddress(selected)
      .then(res => res[0])
      
      .then(
        data => 
        this.handle_data(data,selected) ,  
        
  
      )
      

      .catch(error => {
        this.setState({ isGeocoding: false });
        console.log("error", error); // eslint-disable-line no-console
      });
  };

  handleCloseClick = () => {
    this.setState({
      address: "",
      latitude: null,
      longitude: null
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log("Error from Google Maps API", status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  render() {
   
    const { address, errorMessage } = this.state;
     
    return (
      <div>
        <PlacesAutocomplete
          onChange={this.handleChange}
          value={address}
          onSelect={this.handleSelect}
          onError={this.handleError}
          
          // shouldFetchSuggestions={address.length > 2}
        >
          
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div className="Demo__search-bar-container">
                  
                <div className="Demo__search-input-container">
                  <input
                    {...getInputProps({
                      placeholder: "Search Places...",
                      className: "Demo__search-input"
                    })}
                  />
                  {this.state.address.length > 0 && (
                    <button
                      className="Demo__clear-button"
                      onClick={this.handleCloseClick}
                    >
                      x
                    </button>
                  )}
                </div>
                {suggestions.length > 0 && (
                  <div className="Demo__autocomplete-container">
                    {suggestions.map(suggestion => {
                      const className = classnames("Demo__suggestion-item", {
                        "Demo__suggestion-item--active": suggestion.active
                      });

                      return (
                        /* eslint-disable react/jsx-key */
                        <div
                          {...getSuggestionItemProps(suggestion, { className })}
                        >
                          <strong>
                            {suggestion.formattedSuggestion.mainText}
                          </strong>{" "}
                          <small>
                            {suggestion.formattedSuggestion.secondaryText}
                          </small>
                        </div>
                      );
                      /* eslint-enable react/jsx-key */
                    })}
                  </div>
                )}
              </div>
            );
          }}
        </PlacesAutocomplete>
        {errorMessage.length > 0 && (
          <div className="Demo__error-message">{this.state.errorMessage}</div>
        )}
      </div>
    );
  }
}

export default SearchBar;
