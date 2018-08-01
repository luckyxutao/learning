import React from 'react';
export default class Bundle extends React.Component{
    state={Mod: null}
    componentWillMount() {
        this.props.load().then(mod=>this.setState({Mod: mod.default? mod.default:mod}));
    }
    render() {
        let Mod=this.state.Mod;
        return Mod&&<Mod  {...this.props}/>;
    }
}
