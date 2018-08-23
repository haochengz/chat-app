
import React from 'react'
import {
  TabBar
} from 'antd-mobile'

import ListIconUnSelected from '../../assets/img/icon/menu-1.svg'
import ListIconSelected from '../../assets/img/icon/menu-2.svg'
import MsgIconUnSelected from '../../assets/img/icon/mail-1.svg'
import MsgIconSelected from '../../assets/img/icon/mail-2.svg'
import UserIconUnSelected from '../../assets/img/icon/user-1.svg'
import UserIconSelected from '../../assets/img/icon/user-2.svg'

function BarIcon(image) {
  return (
    <div style={{
        width: '22px',
        height: '22px'
      }}
    >
      <img src={image} alt="" />
    </div>
  )
}

const views = [
  {
    title: 'List',
    icon: BarIcon(ListIconUnSelected),
    selectedIcon: BarIcon(ListIconSelected)
  },
  {
    title: 'Message',
    icon: BarIcon(MsgIconUnSelected),
    selectedIcon: BarIcon(MsgIconSelected)
  },
  {
    title: 'Me',
    icon: BarIcon(UserIconUnSelected),
    selectedIcon: BarIcon(UserIconSelected)
  },
]

export default class Footer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      fullScreen: false
    }
  }

  renderContent(v) {
    return this.props.renderContent(v)
  }

  render() {
    return (
      <div
        style={
          this.state.fullScreen
            ? { position: 'fixed', height: '100%', width: '100%', top: 0 }
            : { height: 600 }
        }
      >
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          {
            views.map(v => {
              return (
                <TabBar.Item
                  title={v.title}
                  key={v.title}
                  icon={v.icon}
                  selectedIcon={v.selectedIcon}
                  selected={this.props.selected === v.title}
                  onPress={() => this.props.focusChange(v.title)}
                  data-seed="logId"
                >
                  {this.renderContent(v.title)}
                </TabBar.Item>
              )
            })
          }
        </TabBar>
      </div>
    )
  }
}
