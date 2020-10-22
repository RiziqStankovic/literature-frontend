import React, { useState, useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Context } from '../context/Context';

import MyProfileData from './MyProfileData';
import ChangeProfilePhoto from './ChangeProfilePhoto';

import { MdEmail, MdLocationOn } from 'react-icons/md';
import { FaTransgender, FaPhoneAlt } from 'react-icons/fa';

const MyProfile = (props) => {
  const [state] = useContext(Context);
  const [showEditModal, setShowEditModal] = useState(false);
  const { email, gender, phone, address, photo } = state.user;
  return (
    <div className="profile-container">
      <Row>
        <Col>
          <h2 className="heading">Profile</h2>
          <div className="data-container">
            <Row noGutters>
              <Col className="datas">
                <MyProfileData
                  icon={<MdEmail size="30px" color="#af2e1c" />}
                  data={email}
                  label="Email"
                />
                <MyProfileData
                  icon={<FaTransgender size="30px" color="#af2e1c" />}
                  data={gender}
                  label="Gender"
                />
                <MyProfileData
                  icon={<FaPhoneAlt size="25px" color="#af2e1c" />}
                  data={phone}
                  label="Mobile phone"
                />
                <MyProfileData
                  icon={<MdLocationOn size="30px" color="#af2e1c" />}
                  data={address}
                  label="Address"
                />
              </Col>
              <Col md="auto">
                <img
                  src={`http://localhost:5000/photos/${photo}`}
                  alt="photo"
                  style={{
                    display: 'block',
                    width: 200,
                    height: 200,
                    objectFit: 'cover',
                  }}
                  className="mb-2"
                />

                <Button
                  className="primary"
                  blocked
                  onClick={() => setShowEditModal(true)}
                >
                  Change Profile Photo
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <ChangeProfilePhoto
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onSubmit={() => setShowEditModal(false)}
      />
    </div>
  );
};

export default MyProfile;
