import * as React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { RootState } from '../../redux/store'
import { fetchData } from '../../redux/actions/examples'
import { FetchDataType } from '../../redux/reducers/examples'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface OwnProps {}

interface DispatchProps {
  getData: () => void;
}

interface StateProps {
  data: FetchDataType;
}

type Props = StateProps & OwnProps & DispatchProps

class Home extends React.Component<Props, State> {
  getData() {
    this.props.getData()
  }

  render() {
    console.log(this.props.data)
    return (
      <div>
        <section>
          <Button
            onClick={() => {
              this.getData()
            }}
          >
            TEST
          </Button>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (states: RootState, ownProps: OwnProps): StateProps => {
  return {
    data: states.example,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>,
  ownProps: OwnProps
): DispatchProps => {
  return {
    getData: async () => {
      await dispatch(fetchData())
    },
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  mapStateToProps,
  mapDispatchToProps
)(Home)
