import React from 'react';
import ReactDom from 'react-dom';
import Graphic from 'components/Graphic'

class Tags extends React.Component {

  render () {
    let self = this;
    return (
      <span>
        <ul id={this.props.id}>
          {this.props.tags.map((tag, index) => {
            let cssClasses = 'easyseo__tag';

            if (self.props.activeTag && self.props.activeTag.dataset.term == tag) {
              cssClasses += ' active';
            }

            return (
              <li key={index} className={cssClasses} data-term={tag} onClick={this.props.handleClick.bind(this)}>{tag}</li>
            );
          })}
        </ul>
        <Graphic id={this.props.iframeId} attrs={this.props.iframeAttrs} />
      </span>
    );
  }
};

export default Tags;
