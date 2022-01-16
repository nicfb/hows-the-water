import React from 'react';
import { PropagateLoader } from 'react-spinners';

//TODO: move to functional compnent
class ParameterCodeDropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            site: this.props.site,
            parameterCodes: [],
            selectedValue: this.props.selectedValue
        }
    }

    //some parameter descriptions from USGS are very long
    //this prevents them from making the dropdown too wide
    trimString = (text, length) => {
        return text.substring(0, length) + "...";
    }

    componentDidMount() {
        if (!this.state.site) return;
        
        fetch(`https://waterservices.usgs.gov/nwis/iv/?sites=${this.state.site}&period=P7D&siteStatus=all&format=json`)
        .then(response => response.json())
        .then(json => {
            let params = []
            json.value.timeSeries.forEach(timeSeries => {
                let rawText = timeSeries.variable.variableDescription;
                let text = rawText.length > 40 ? this.trimString(rawText, 40) : rawText;
                params.push({
                    value: timeSeries.variable.variableCode[0].value,
                    text: text
                });
            });
            this.setState({
                isLoaded: true,
                site: this.state.site,
                parameterCodes: params
            });
        });
    }

    render() {
        var {isLoaded, parameterCodes} = this.state;

        if (!isLoaded) {
            return (
                <div className="flex justify-center mt-4">
                    <PropagateLoader />
                </div>
            )
        }
        else {
            return(
                <div>
                    <div className="relative inline-flex">
                        <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 412 232">
                                <path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                                        fill="#648299"
                                        fillRule="nonzero" />
                        </svg>
                        <select onChange={this.props.handleParameterCodeChange}
                                value={this.props.selectedValue}
                                className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                        <option value=''>Parameter Code</option>
                            {parameterCodes.map((param, i) => (
                                <option key={i} value={param.value}>{param.text}</option>   
                            ))}
                        </select>
                    </div>
                </div>
            )
        }
    }
}

export default ParameterCodeDropDown;