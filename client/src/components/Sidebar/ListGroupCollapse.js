import React from 'react';
import { ListGroupItem, Collapse } from 'reactstrap';

class ListGroupCollapse extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        const cat = this.props.cat;

        return (
            <ListGroupItem onClick={this.toggle}>

                <Collapse isOpen={this.state.collapse}>{cat.name}</Collapse>

            </ListGroupItem>
        );
    }
}

export default ListGroupCollapse;