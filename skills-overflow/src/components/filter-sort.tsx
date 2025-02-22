import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

function FilterSort(props: any) {
  const history = useHistory();

  const handleRedirect = (e: any) => {
    const criteria = e.target.value;
    history.push({
      pathname: `/posts/1/${criteria}`,
      state: { topics: props.filterTopics }
    });
    props.handleFlag();
  };

  const buttonSubmit = (event: any) => {
    history.push({
      pathname: `/posts/1/`,
      state: { topics: props.filterTopics }
    });
    //pentru use effects, sa ruleze
    props.handleFlag();
  };

  return (
    <div className="d-flex justify-content-start">
      <Dropdown>
        <DropdownButton
          id="dropdown-basic-button"
          title="Filter questions by Tags"
          variant="warning"
          className="filter-btn"
        >
          <Form className="filter-form">
            <Form.Group id="questionTags" onChange={props.onClick}>
              <div className="row">
                <div className="column col-md-6">
                  <Form.Check
                    type="checkbox"
                    label={props.topics[0]}
                    value={props.topics[0]}
                  />
                  <Form.Check
                    type="checkbox"
                    label={props.topics[1]}
                    value={props.topics[1]}
                  />
                  <Form.Check
                    type="checkbox"
                    label={props.topics[2]}
                    value={props.topics[2]}
                  />
                  <Form.Check
                    type="checkbox"
                    label={props.topics[3]}
                    value={props.topics[3]}
                  />
                  <Form.Check
                    type="checkbox"
                    label={props.topics[4]}
                    value={props.topics[4]}
                  />
                  <Form.Check
                    type="checkbox"
                    label={props.topics[5]}
                    value={props.topics[5]}
                  />
                  <Form.Check
                    type="checkbox"
                    label={props.topics[6]}
                    value={props.topics[6]}
                  />
                  <Form.Check
                    type="checkbox"
                    label={props.topics[7]}
                    value={props.topics[7]}
                  />
                </div>
                <div className="column col-md-6 ml-auto">

                  <Form.Check
                    type="checkbox"
                    label={props.topics[8]}
                    value={props.topics[8]}
                  />
                  <Form.Check
                    type="checkbox"
                    label={props.topics[9]}
                    value={props.topics[9]}
                  />
                  <Form.Check
                    type="checkbox"
                    label={props.topics[10]}
                    value={props.topics[10]}
                  />
                  <Form.Check
                    type="checkbox"
                    label={props.topics[11]}
                    value={props.topics[11]}
                  />
                  <Form.Check
                    type="checkbox"
                    label={props.topics[12]}
                    value={props.topics[12]}
                  />
                  <Form.Check
                    type="checkbox"
                    label={props.topics[13]}
                    value={props.topics[13]}
                  />
                  <Form.Check
                    type="checkbox"
                    label={props.topics[14]}
                    value={props.topics[14]}
                  />
                  <Form.Check
                    type="checkbox"
                    label={props.topics[15]}
                    value={props.topics[15]}
                  />
                </div>
              </div>
            </Form.Group>
            <Dropdown.Item onClick={buttonSubmit} className="filter-btn-down">
              {" "}
              Filter{" "}
            </Dropdown.Item>
          </Form>
        </DropdownButton>
      </Dropdown>
      <div>
        <select
          className="sort-select"
          title=""
          onChange={(e: any) => {
            if (e.target.value != 0) handleRedirect(e);
          }}
        >
          <option value="0">Sort Questions:</option>
          <option value="date">Most recent (default)</option>
          <option value="comms">Number of comments</option>
        </select>
      </div>
    </div>
  );
}

export default FilterSort;
