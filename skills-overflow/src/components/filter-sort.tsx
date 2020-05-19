import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function FilterSort() {
  return (
    <div className="d-flex justify-content-start">
      <DropdownButton
        id="dropdown-basic-button"
        title="Filter questions by Tags"
        variant="warning"
        className="filter-btn"
      >
        <Form className="filter-form">
          <Form.Group id="questionTags">
            <div className="row">
              <div className="column col-md-6">
                <Form.Check type="checkbox" label="Java" />
                <Form.Check type="checkbox" label="Springboot" />
                <Form.Check type="checkbox" label="SQL" />
                <Form.Check type="checkbox" label="Tomcat" />
                <Form.Check type="checkbox" label="JPA" />
                <Form.Check type="checkbox" label="Google Cloud" />
                <Form.Check type="checkbox" label="Hibernate" />
              </div>
              <div className="column col-md-6 ml-auto">
                <Form.Check type="checkbox" label="HTML" />
                <Form.Check type="checkbox" label="CSS" />
                <Form.Check type="checkbox" label="Javascript" />
                <Form.Check type="checkbox" label="Bootstrap" />
                <Form.Check type="checkbox" label="React" />
                <Form.Check type="checkbox" label="Angular" />
                <Form.Check type="checkbox" label="JQuery" />
              </div>
            </div>
          </Form.Group>
          <Button type="submit"> Filter</Button>
        </Form>
      </DropdownButton>

      <div>
        <select className="sort-select" title="">
          <option value="0">Sort Questions:</option>
          <option value="1">Most recent</option>
          <option value="2">Number of comments</option>
        </select>
      </div>
    </div>
  );
}

export default FilterSort;
