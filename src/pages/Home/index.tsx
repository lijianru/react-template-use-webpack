import React, { ReactElement } from 'react';
import { Button, Table } from 'antd';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppState } from 'store/index';
import { getAllExamples } from 'store/actions/exampleAction';
import { Example, Author } from 'store/reducers/exampleReducer';

type State = {};

type OwnProps = {};

type DispatchProps = {
  getAllExamples: () => void;
};

type StateProps = {
  examples: Example[];
};

type Props = StateProps & OwnProps & DispatchProps;

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author_id',
    // eslint-disable-next-line react/display-name
    render: (author: Author): ReactElement => (
      <div>
        <h3>{author.loginname}</h3>
        <img src={author.avatar_url} />
      </div>
    ),
  },
  {
    title: 'Visit',
    dataIndex: 'visit_count',
    key: 'visit_count',
  },
];

class Home extends React.Component<Props, State> {
  componentDidMount(): void {
    this.props.getAllExamples();
  }

  getData(): void {
    this.props.getAllExamples();
  }

  render(): React.ReactElement {
    return (
      <div>
        <section>
          <Button
            onClick={(): void => {
              this.getData();
            }}
          >
            TEST
          </Button>
        </section>
        <Table columns={columns} dataSource={this.props.examples} />
      </div>
    );
  }
}

// ownProps 参数未使用
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = (states: AppState, ownProps: OwnProps): StateProps => {
  return {
    examples: states.exampleState.examples,
  };
};

const mapDispatchToProps = (
  // TODO
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: ThunkDispatch<AppState, undefined, any>,
  // ownProps 参数未使用
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ownProps: OwnProps
): DispatchProps => {
  return {
    getAllExamples: async (): Promise<void> => {
      await dispatch(getAllExamples());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
