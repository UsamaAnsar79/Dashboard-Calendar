import React from "react";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import ProgressBar from "react-bootstrap/ProgressBar";
import tablePic from "../../images/tablePic.jpg";
import "./manageTable.css";

export default function ManagedTable() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="table-management">
      <div className="task-header-container">
        <div className="task-header">
          <h4 className="task-heading">TASKS(5)</h4>
          <h5 className="task-detail">Today</h5>
        </div>
        <div className="task-settings" onClick={toggleVisibility}>
          <i class="bi bi-gear task-setting-icon"></i>
          <i class="bi bi-caret-down-fill task-dropdown-icon"></i>
        </div>
        {isVisible && (
          <div className="task-dropdown-detail">
            <ul>
              <li>Action</li>
              <li>Another action</li>
              <li>Something else</li>
            </ul>
          </div>
        )}
        {/* // TASKS LIST ---------------*/}
      </div>
      <Table className="manage-table" variant="dark" responsive>
        <thead>
          <tr>
            <th className="tableHead-hash">#</th>
            <th>Name</th>
            <th>Job Position</th>
            <th>Milestone</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src={tablePic} className="table-image" />
            </td>
            <td>Tania Mike</td>
            <td>Develop</td>
            <td>
              <ProgressBar now={25} />
            </td>
            <td>99,225</td>
            <td className="actions-icon">
              <i class="bi bi-arrow-clockwise reload-table-data-icon"></i>
              <i class="bi bi-x-lg cross-table-icon"></i>
            </td>
          </tr>

          <tr>
            <td>
              <img src={tablePic} className="table-image" />
            </td>
            <td>John Doe</td>
            <td>CEO</td>
            <td>
              <ProgressBar now={77} />
            </td>
            <td>89,241</td>
            <td className="actions-icon">
              <i class="bi bi-arrow-clockwise reload-table-data-icon"></i>
              <i class="bi bi-x-lg cross-table-icon"></i>
            </td>
          </tr>

          <tr>
            <td>
              <img src={tablePic} className="table-image" />
            </td>
            <td>Alexa Mike</td>
            <td>Design</td>
            <td>
              <ProgressBar now={41} />
            </td>
            <td>92,144</td>
            <td className="actions-icon">
              <i class="bi bi-arrow-clockwise reload-table-data-icon"></i>
              <i class="bi bi-x-lg cross-table-icon"></i>
            </td>
          </tr>

          <tr>
            <td>
              <img src={tablePic} className="table-image" />
            </td>
            <td>Jana Monday</td>
            <td>Marketing</td>
            <td>
              <ProgressBar now={50} />
            </td>
            <td>49,290</td>
            <td className="actions-icon">
              <i class="bi bi-arrow-clockwise reload-table-data-icon"></i>
              <i class="bi bi-x-lg cross-table-icon"></i>
            </td>
          </tr>

          <tr>
            <td>
              <img src={tablePic} className="table-image" />
            </td>
            <td>Paul Dickens</td>
            <td>Develop</td>
            <td>
              {" "}
              <ProgressBar now={100} />
            </td>
            <td>69,201</td>
            <td className="actions-icon">
              <i class="bi bi-arrow-clockwise reload-table-data-icon"></i>
              <i class="bi bi-x-lg cross-table-icon"></i>
            </td>
          </tr>

          <tr>
            <td>
              <img src={tablePic} className="table-image" />
            </td>
            <td>Manuela Rico</td>
            <td>Manager</td>
            <td>
              <ProgressBar now={15} />
            </td>
            <td>99,201</td>
            <td className="actions-icon">
              <i class="bi bi-arrow-clockwise reload-table-data-icon"></i>
              <i class="bi bi-x-lg cross-table-icon"></i>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
