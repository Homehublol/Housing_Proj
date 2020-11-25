import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { roomTypeIcons } from '../../assets/icons/all';
import AutoComplete from '../PlacesAutoComplete';
import { RoomType } from '../../assets/constants';
import { WizardFormStep } from '../WizardForm';

export interface PostPage2Store {
  roomType: keyof typeof RoomType;
  price: number;
}

type PathProps = {};

const PostPage2: React.FC<PathProps & WizardFormStep<PostPage2Store>> = ({
  useWizardFormStorage,
}) => {
  const [{ roomType, price }, setStore] = useWizardFormStorage<PostPage2Store>({
    roomType: 'single',
    price: 500,
  });

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
          {/* TODO update the filter to be like below */}
          <Row className="justify-content-center">
            {(Object.keys(RoomType) as Array<keyof typeof RoomType>).map(
              (key) => {
                const RoomTypeUnchosen = roomTypeIcons[key];
                const RoomTypeChosen =
                  roomTypeIcons[`${key}Chosen` as keyof typeof roomTypeIcons];
                return (
                  <Button
                    variant="no-show"
                    className="btn-filter"
                    onClick={() => {
                      setStore({ roomType: key });
                    }}
                  >
                    {roomType === key ? (
                      <RoomTypeChosen />
                    ) : (
                      <RoomTypeUnchosen />
                    )}
                  </Button>
                );
              },
            )}
          </Row>
        </Col>

        <Col
          md={12}
          lg={{ span: 5, offset: 1 }}
          className="justify-content-center"
        >
          <Row className="justify-content-center">
            <div className="title">Price</div>
          </Row>

          <Form.Row className="justify-content-center m-2">
            <Form.Label className="word mr-3">$</Form.Label>
            <Col>
              <Form.Control
                className="single-line-input"
                type="number"
                min={0}
                // value={price}
                onChange={(e) => {
                  if (e.target.value) {
                    setStore({ price: parseInt(e.target.value) });
                  } else {
                    setStore({ price: -1 }); // force it to be invalid
                  }
                }}
                isValid={price !== undefined && price > 0}
                isInvalid={!price || price <= 0}
                placeholder="Price"
              />
            </Col>
          </Form.Row>
        </Col>
        <Col lg={1} />
      </Row>
    </Container>
  );
};

export default PostPage2 as React.FC<PathProps>;
