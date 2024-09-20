import PerformanceChart from "./components/ChartComponent/PerformanceChart";
import DetailBoxes from "./components/DetailBox/DetailBoxes";
import Grouped from "./components/ThreeComponents/Grouped";
import Tasks from "./components/TasksFolder/Tasks";
import ManagedTable from "./components/ManagementTableFolder/ManagedTable";
import SalesComponent from "./components/GlobalSalesSection/SalesComponent";

const Dashboard = () => {
  return (
    <div className="components-section">
      <PerformanceChart />
      <DetailBoxes />
      <Grouped />
      <div className="task-list-table-flex">
        <Tasks />
        <ManagedTable />
      </div>
      <SalesComponent />
    </div>
  );
};

export default Dashboard;

