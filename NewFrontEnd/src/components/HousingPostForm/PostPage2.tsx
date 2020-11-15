import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { roomTypeIcons, roomTypeUnchosen } from '../../assets/icons/all';
import AutoComplete from '../PlacesAutoComplete';
import { setPost, selectPost } from '../../redux/slices/posting';
import { useSelector, useDispatch } from 'react-redux';

type RoomType = { [P in keyof typeof roomTypeUnchosen]: boolean };
const PostPage2: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const [roomType, setRoomType] = useState<RoomType>({
    single: false,
    double: false,
    triple: false,
    livingRoom: false,
    suite: false,
    studio: false,
  });
  const price = useSelector(selectPost).price;
  return (
    <Container>
      <Row>
        <Col>
          <span className="post-title">
            ...about the room, time & stay period
          </span>
        </Col>
      </Row>

      <Form.Row className="justify-content-center m-2 my-4">
        <Form.Label className="title">Location</Form.Label>
        <AutoComplete className="single-line-input w-100" />
      </Form.Row>

      <Row className="justify-content-center">
        {/* Room Type */}
        <Col
          md={12}
          lg={{ span: 5, offset: 1 }}
          className="justify-content-center"
        >
          <Row className="justify-content-center">
            <div className="title">Room Type</div>
          </Row>
          <Row className="justify-content-center">
            {(Object.keys(roomType) as Array<keyof typeof roomType>).map(
              (key) => {
                const RoomTypeUnchosen = roomTypeIcons[key];
                const RoomTypeChosen =
                  roomTypeIcons[`${key}Chosen` as keyof typeof roomTypeIcons];
                return (
                  <Button
                    className="btn-filter"
                    onClick={() => {
                      const changed = { ...roomType };
                      changed[key] = !roomType[key];
                      if (changed[key]) {
                        dispatch(setPost(['roomType', key]));
                      }
                      setRoomType({
                        ...changed,
                      });
                    }}
                  >
                    {roomType[key] ? <RoomTypeChosen /> : <RoomTypeUnchosen />}
                  </Button>
                );
              },
            )}
          </Row>
        </Col>

        {/* Price Range. TODO: only use one price */}
        <Col
          md={12}
          lg={{ span: 5, offset: 1 }}
          className="justify-content-center"
        >
          <Row className="justify-content-center">
            <div className="title">Price</div>
          </Row>

          <Form.Row className="justify-content-center m-2">
            <Form.Label className="word mr-3">$USD</Form.Label>
            <Col>
              <Form.Control
                className="single-line-input"
                type="number"
                min={0}
                value={price}
                onChange={(event) => {
                  dispatch(setPost(['price', parseInt(event.target.value)]));
                }}
                isValid={price !== undefined && price > 0}
                isInvalid={price === undefined || price <= 0}
                placeholder="price"
              />
            </Col>
          </Form.Row>
        </Col>
        <Col lg={1} />
      </Row>
    </Container>
  );
};

export default PostPage2;
