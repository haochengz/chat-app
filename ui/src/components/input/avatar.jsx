
import React from 'react'
import {
  Grid
} from 'antd-mobile'

const R = require('ramda')

export default class AvatarSelector extends React.PureComponent {

  select(v) {
    this.props.input(v.text)
  }

  render() {
    const avatars = R.range(1, 25)
      .map(num => ({
        icon: require('../../assets/img/avatar/avatar-' + num + '.jpeg'),
        text: 'avatar-' + num
      }))
    return (
      <div>
        Please choose an avatar:
        <Grid
          data={avatars}
          columnNum={3}
          isCarousel={true}
          carouselMaxRow={2}
          onClick={this.select.bind(this)}
          renderItem={item => {
            let style = {
              width: '100px',
              height: '100px',
              borderRadius: '25%',
              opacity: '0.3'
            }
            if(item.text === this.props.currentAvatar) {
              style = {
                ...style,
                opacity: '1'
              }
            }
            return (
              <div style={{ padding: '3.5px' }}>
                <img src={item.icon} style={style} alt="avatar"/>
                <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                </div>
              </div>
            )
          }}
        />
      </div>
    )
  }
}