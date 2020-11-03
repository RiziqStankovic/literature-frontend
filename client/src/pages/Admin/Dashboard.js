import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useRouteMatch } from 'react-router-dom';
import { useQuery } from 'react-query';

import { API } from '../../config/config';

import { PageLoading } from '../../components/Loading';

const useQueryMultiple = () => {
  let match = useRouteMatch({
    path: '/admin',
  });

  match && require('./admin.css');

  const res1 = useQuery('getLiteratures', () => API.get('/literatures'));
  const res2 = useQuery('getUsers', () => API.get('/users'));

  return [res1, res2];
};

const Dashboard = () => {
  const res = useQueryMultiple();
  const literatures = res[0];
  const users = res[1];

  return literatures.isLoading || users.isLoading ? (
    <PageLoading />
  ) : (
    <div className="admin">
      <Container>
        <Row>
          <Col>
            <h3>Literatures</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Literatures</h4>
            <p>{literatures.data.data.data.length}</p>
          </Col>
          <Col className="text-approved">
            <h4>Approved</h4>
            <p>
              {
                literatures.data.data.data.filter(
                  (data) => data.status === 'Approved'
                ).length
              }
            </p>
          </Col>
          <Col className="text-warning">
            <h4>Pending</h4>
            <p>
              {
                literatures.data.data.data.filter(
                  (data) => data.status === 'Pending'
                ).length
              }
            </p>
          </Col>
          <Col className="text-cancel">
            <h4>Rejected</h4>
            <p>
              {
                literatures.data.data.data.filter(
                  (data) => data.status === 'Rejected'
                ).length
              }
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Users</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Admin</h4>
            <p>
              {
                users.data.data.data.filter((user) => user.role === 'admin')
                  .length
              }
            </p>
          </Col>
          <Col>
            <h4>User</h4>
            <p>
              {
                users.data.data.data.filter((user) => user.role === 'user')
                  .length
              }
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
