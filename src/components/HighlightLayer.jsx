import React from 'react';
import * as _ from 'underscore';

import FusionTablesLayer from './FusionTablesLayer.jsx';

class HighlightLayer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            teams: [
                {
                    name: 'Team 1',
                    countries: ['DE'],
                    fillColor: '#FF0000',
                    fillOpacity: 0.2
                },
                {
                    name: 'Team 2',
                    countries: ['US'],
                    fillColor: '#0000FF',
                    fillOpacity: 0.2
                }
            ]
        };
    }

    render () {
        return (
            <div>
                <FusionTablesLayer
                    {...this.props}
                    query={{
                        select: 'geometry',
                        from: '1N2LBk4JHwWpOY4d9fobIn27lfnZ5MDy-NoqqRpk',
                        where: `ISO_2DIGIT IN (${this.getCountryString()})`
                    }}
                    styles={[{
                        polygonOptions: {
                            fillColor: '#FF0000',
                            fillOpacity: 0.2
                        }
                    }, {
                        where: `ISO_2DIGIT IN (${this.getCountryString(this.state.teams[1].countries)})`,
                        polygonOptions: {
                            fillColor: '#0000FF',
                            fillOpacity: 0.2
                        }
                    }]}
                    clickable={false}
                    suppressInfoWindows={true}
                />
            </div>
        );
    }

    getCountryString (countries) {
        countries = countries || _.chain(this.state.teams).map(team => team.countries).flatten().value();
        return countries.map(country => `'${country}'`).join(',');
    }

    onMapClick (props, map, event, teamIndex) {
        this.getIsoCode(event.latLng).then(isoCode => {
            const state = { ...this.state };
            const currTeamIndex = _.findIndex(this.state.teams, team => {
                return team.countries.indexOf(isoCode) > -1;
            });

            // Remove selected country if it already in a team
            if (currTeamIndex > -1) {
                const currTeamCountries = _.without(state.teams[currTeamIndex].countries, isoCode);
                state.teams[currTeamIndex].countries = currTeamCountries;
            }
            // Add selected country to new team
            if (currTeamIndex !== teamIndex) {
                const countries = [isoCode].concat(this.state.teams[teamIndex].countries);
                state.teams[teamIndex].countries = countries;
            }
            this.setState(state);
        });
    }

    getIsoCode (latLng) {
        const wrappedGeocodePromise = config => {
            return new Promise((resolve, reject) => {
                const geocode = this.props.google.maps.Geocoder.prototype.geocode;
                geocode(config, (results, status) => {
                    if (status !== 'OK') {
                        reject();
                        return;
                    }
                    resolve(results);
                });
            });
        };
        return wrappedGeocodePromise({
            location: {
                lat: latLng.lat(),
                lng: latLng.lng()
            }
        }).then(results => {
            const country = _.find(results, result => {
                return _.find(result.types, type => type === 'country');
            });
            if (!country) {
                throw new Error('Cant find country');
            }
            return country.address_components[0].short_name;
        });
    }
}

export default HighlightLayer;