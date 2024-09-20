import React, { useState } from "react";
import "./taskList.css";
export default function Tasks() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="task-main-container">
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
      <div className="task-list">
        <div className="task-list-content">
          <div className="task-list-left-side">
            <input type="checkBox" className="check-icon"></input>
            <div>
              <h5>Update the documentation</h5>
              <p className="task-paragraph">
                Dwuamish Head, Seattle, WA 8:47 AM
              </p>
            </div>
          </div>
          <i class="bi bi-pencil-fill task-pencil-icon"></i>
        </div>

        <div className="task-list-content">
          <div className="task-list-left-side">
            <input type="checkBox" className="check-icon"></input>
            <div>
              <h5>GDPR Compliance</h5>
              <p className="task-paragraph">
                The GDPR is a regulation that requires businesses <br></br> to
                protect the personal data and privacy of Europe citizens for
                transactions that occur within <br></br> EU member states.
              </p>
            </div>
          </div>
          <i class="bi bi-pencil-fill task-pencil-icon"></i>
        </div>

        <div className="task-list-content">
          <div className="task-list-left-side">
            <input type="checkBox" className="check-icon"></input>
            <div>
              <h5>Solve the issues</h5>
              <p className="task-paragraph">
                Fifty percent of all respondents said they would <br></br> be
                more likely to shop at a company
              </p>
            </div>
          </div>
          <i class="bi bi-pencil-fill task-pencil-icon"></i>
        </div>

        <div className="task-list-content">
          <div className="task-list-left-side">
            <input type="checkBox" className="check-icon"></input>
            <div>
              <h5>Release v2.0.0</h5>
              <p className="task-paragraph">
                Ra Ave SW, Seattle, WA 98116, SUA 11:19 AM
              </p>
            </div>
          </div>
          <i class="bi bi-pencil-fill task-pencil-icon"></i>
        </div>

        <div className="task-list-content">
          <div className="task-list-left-side">
            <input type="checkBox" className="check-icon"></input>
            <div>
              <h5>Export the processed files</h5>
              <p className="task-paragraph">
                The report also shows that consumers will not <br></br> easily
                forgive a company once a breach <br></br> exposing their
                personal data occurs.
              </p>
            </div>
          </div>
          <i class="bi bi-pencil-fill task-pencil-icon"></i>
        </div>

        <div className="task-list-content">
          <div className="task-list-left-side">
            <input type="checkBox" className="check-icon"></input>
            <div>
              <h5>Arival at export process</h5>
              <p className="task-paragraph">
                Capitol Hill, Seattle, WA 12:34 AM
              </p>
            </div>
          </div>
          <i class="bi bi-pencil-fill task-pencil-icon"></i>
        </div>
      </div>
    </div>
  );
}
