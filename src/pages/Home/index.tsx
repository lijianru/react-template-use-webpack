import React, { ReactElement, useEffect, useCallback } from 'react';
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

export function Home({ getAllExamples, examples }: Props): ReactElement {
  useEffect(() => {
    getAllExamples();
  }, [getAllExamples]);

  const getData = useCallback(() => {
    getAllExamples();
  }, [getAllExamples]);

  return (
    <div>
      <section>
        <Button onClick={getData}>TEST</Button>
      </section>
      <Table columns={columns} dataSource={examples} />
    </div>
  );
}

const mapStateToProps = (states: AppState): StateProps => {
  return {
    examples: states.exampleState.examples,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, undefined, any>): DispatchProps => {
  return {
    getAllExamples: async (): Promise<void> => {
      await dispatch(getAllExamples());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
