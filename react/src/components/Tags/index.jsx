import React from 'react';
import ReactDom from 'react-dom';
import Tag from 'components/Tag'
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
              <Tag key={index} className={cssClasses} dataTerm={tag} label={tag} onClick={this.props.handleClick.bind(this)} />
            );
          })}
        </ul>
        <Graphic id={this.props.iframeId} attrs={this.props.iframeAttrs} />
      </span>
    );
  }
};

export default Tags;
