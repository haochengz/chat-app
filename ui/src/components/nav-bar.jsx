
import React from 'react'
import {
  NavBar,
  Icon,
  Popover
} from 'antd-mobile'
import { connect } from 'react-redux'

const Item = Popover.Item
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;

@connect(
  state => ({
    navbar: state.navbar
  }),
  {}
)
class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      selected: ''
    }
  }

  onSelect = opt => {
    this.setState({
      visible: false,
      selected: opt.props.value,
    });
  };
  handleVisibleChange = visible => {
    this.setState({
      visible,
    });
  }

  render() {
    const nav = this.props.navbar
    if(nav.visible === false) return null
    let { icon, iconClick } = [null, null]
    if(nav.leftIconVisible) {
      icon = nav.leftIcon || null
      iconClick = nav.leftIconOnClick || null
    } else {
      icon = null
      iconClick = null
    }
    return (
      <NavBar
        mode="light"
        icon={icon}
        onLeftClick={iconClick}
        rightContent={[
          <Icon
            key="0"
            type="search"
            style={{marginRight: '16px'}}
          />,
          <Popover
            key="1"
            mask
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.visible}
            overlay={[
              (<Item key="4"
                value="scan"
                icon={myImg('tOtXhkIWzwotgGSeptou')}
                data-seed="logId"
              >
                Scan
              </Item>),
              (<Item key="5"
                value="special"
                icon={myImg('PKAgAqZWJVNwKsAJSmXd')}
                style={{ whiteSpace: 'nowrap' }}
              >
                My Qrcode
              </Item>),
              (<Item key="6"
                value="button ct"
                icon={myImg('uQIYTFeRrjPELImDRrPt')}
              >
                <span style={{ marginRight: 5 }}
                >
                  Help
                </span>
              </Item>),
            ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0],
            }}
            onVisibleChange={this.handleVisibleChange}
            onSelect={this.onSelect}
          >
            <div style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              display: 'flex',
              alignItems: 'center',
            }}
            >
              <Icon type="ellipsis" />
            </div>
          </Popover>
        ]}
      >
        {nav.title}
      </NavBar>
    )
  }
}

export default Navigation
